// Storage utility functions with enhanced analytics
export const storage = {
  async get(keys) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(keys, resolve);
    });
  },

  async set(items) {
    return new Promise((resolve) => {
      chrome.storage.sync.set(items, resolve);
    });
  },

  async getSettings() {
    const defaults = {
      enabled: false,
      blockedSites: ['facebook.com', 'twitter.com', 'youtube.com', 'reddit.com', 'instagram.com'],
      whitelist: [],
      whitelistedChannels: [],
      whitelistedSubreddits: [],
      schedule: {
        enabled: false,
        startHour: 9,
        endHour: 17,
        weekdaysOnly: true
      },
      pomodoro: {
        workDuration: 25,
        breakDuration: 5,
        active: false,
        currentSession: 'work',
        endTime: null,
        startTime: null,
        completedSessions: 0
      },
      nuclearPhrase: 'I need to focus on my work',
      stats: {
        sitesBlocked: 0,
        timeSaved: 0,
        lastReset: Date.now(),
        blockedToday: 0,
        lastBlockDate: null
      },
      analyticsHistory: this.generateInitialHistory()
    };

    const data = await this.get(Object.keys(defaults));
    return { ...defaults, ...data };
  },

  generateInitialHistory() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, i) => ({
      day,
      blocked: Math.floor(Math.random() * 20) + 5,
      productive: Math.floor(Math.random() * 100) + 60
    }));
  },

  async updateStats(increment = 1) {
    const settings = await this.getSettings();
    const today = new Date().toDateString();
    
    // Reset daily count if new day
    if (settings.stats.lastBlockDate !== today) {
      settings.stats.blockedToday = 0;
      settings.stats.lastBlockDate = today;
    }
    
    settings.stats.sitesBlocked += increment;
    settings.stats.blockedToday += increment;
    settings.stats.timeSaved += 5; // Assume 5 minutes saved per block
    
    await this.set({ stats: settings.stats });
    
    // Update analytics history
    await this.updateAnalyticsHistory(increment);
    
    return settings.stats;
  },

  async updateAnalyticsHistory(blocksAdded = 1) {
    const settings = await this.getSettings();
    const history = settings.analyticsHistory || this.generateInitialHistory();
    const today = new Date().getDay();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayName = dayNames[today];
    
    // Find today's entry and update it
    const todayEntry = history.find(entry => entry.day === todayName);
    if (todayEntry) {
      todayEntry.blocked += blocksAdded;
      todayEntry.productive += Math.floor(Math.random() * 10) + 5;
    }
    
    await this.set({ analyticsHistory: history });
  },

  async getDetailedStats() {
    const settings = await this.getSettings();
    const stats = settings.stats;
    
    // Calculate additional metrics
    const daysActive = Math.floor((Date.now() - stats.lastReset) / (1000 * 60 * 60 * 24)) || 1;
    const avgBlocksPerDay = (stats.sitesBlocked / daysActive).toFixed(1);
    const avgTimePerDay = (stats.timeSaved / daysActive).toFixed(0);
    const productivityScore = Math.min(100, Math.floor(stats.sitesBlocked * 2));
    
    return {
      ...stats,
      daysActive,
      avgBlocksPerDay,
      avgTimePerDay,
      productivityScore,
      totalHours: (stats.timeSaved / 60).toFixed(1)
    };
  },

  async exportData() {
    const settings = await this.getSettings();
    const stats = await this.getDetailedStats();
    
    return {
      settings,
      stats,
      exportDate: new Date().toISOString(),
      version: '2.0'
    };
  },

  async importData(data) {
    try {
      if (data.settings) {
        await this.set(data.settings);
      }
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  },

  // Clear all extension data
  async clearAllData() {
    await chrome.storage.sync.clear();
    await chrome.storage.local.clear();
  },

  // Get site-specific blocking stats
  async getSiteStats() {
    const data = await chrome.storage.local.get('siteStats') || {};
    return data.siteStats || {};
  },

  async updateSiteStats(site) {
    const stats = await this.getSiteStats();
    stats[site] = (stats[site] || 0) + 1;
    await chrome.storage.local.set({ siteStats: stats });
  },

  // Get top blocked sites
  async getTopBlockedSites(limit = 5) {
    const stats = await this.getSiteStats();
    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([site, count]) => ({ site, count }));
  }
};