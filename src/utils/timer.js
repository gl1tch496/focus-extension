// Pomodoro timer logic with session tracking
export const timer = {
  async startPomodoro(settings) {
    const duration = settings.pomodoro.currentSession === 'work' 
      ? settings.pomodoro.workDuration 
      : settings.pomodoro.breakDuration;

    const endTime = Date.now() + (duration * 60 * 1000);

    await chrome.storage.sync.set({
      pomodoro: {
        ...settings.pomodoro,
        active: true,
        endTime,
        startTime: Date.now()
      }
    });

    // Set alarm
    chrome.alarms.create('pomodoroEnd', {
      when: endTime
    });

    // Track session start
    this.trackSession('start', settings.pomodoro.currentSession);
  },

  async stopPomodoro() {
    chrome.alarms.clear('pomodoroEnd');
    const settings = await chrome.storage.sync.get('pomodoro');
    
    await chrome.storage.sync.set({
      pomodoro: {
        ...settings.pomodoro,
        active: false,
        endTime: null,
        startTime: null
      }
    });

    // Track session stop
    this.trackSession('stop', settings.pomodoro.currentSession);
  },

  async switchSession(settings) {
    const newSession = settings.pomodoro.currentSession === 'work' ? 'break' : 'work';
    
    // Increment completed sessions
    const completedSessions = (settings.pomodoro.completedSessions || 0) + 1;
    
    await chrome.storage.sync.set({
      pomodoro: {
        ...settings.pomodoro,
        currentSession: newSession,
        active: false,
        completedSessions
      }
    });

    // Track session completion
    this.trackSession('complete', settings.pomodoro.currentSession);

    // Send notification
    if (chrome.notifications) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon128.png',
        title: newSession === 'work' ? 'Break Time!' : 'Back to Work!',
        message: newSession === 'work' 
          ? 'Take a well-deserved break. You\'ve earned it!' 
          : 'Break\'s over. Time to focus!',
        priority: 2
      });
    }
  },

  getTimeRemaining(endTime) {
    if (!endTime) return 0;
    return Math.max(0, Math.floor((endTime - Date.now()) / 1000));
  },

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },

  getProgress(startTime, endTime) {
    if (!startTime || !endTime) return 0;
    const total = endTime - startTime;
    const elapsed = Date.now() - startTime;
    return Math.min(100, Math.floor((elapsed / total) * 100));
  },

  // Track sessions for analytics
  async trackSession(action, sessionType) {
    const today = new Date().toISOString().split('T')[0];
    const data = await chrome.storage.local.get('sessionHistory') || {};
    const history = data.sessionHistory || {};

    if (!history[today]) {
      history[today] = { work: 0, break: 0 };
    }

    if (action === 'complete') {
      history[today][sessionType] = (history[today][sessionType] || 0) + 1;
    }

    await chrome.storage.local.set({ sessionHistory: history });
  },

  // Get session statistics
  async getSessionStats(days = 7) {
    const data = await chrome.storage.local.get('sessionHistory') || {};
    const history = data.sessionHistory || {};
    
    const stats = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = history[dateStr] || { work: 0, break: 0 };
      
      stats.push({
        date: dateStr,
        workSessions: dayData.work || 0,
        breakSessions: dayData.break || 0
      });
    }
    
    return stats;
  }
};