import { storage } from '../utils/storage.js';
import { blocker } from '../utils/blocker.js';
import { timer } from '../utils/timer.js';


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    const settings = await storage.getSettings();
    
    if (blocker.isBlocked(tab.url, settings)) {
     
      const blockedUrl = chrome.runtime.getURL('blocked.html') + '?url=' + encodeURIComponent(tab.url);
      chrome.tabs.update(tabId, { url: blockedUrl });
      

      await storage.updateStats();
    }
  }
});


chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'pomodoroEnd') {
    const settings = await storage.getSettings();
    

    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Pomodoro Complete!',
      message: settings.pomodoro.currentSession === 'work' 
        ? 'Time for a break!' 
        : 'Break over! Ready to focus?'
    });


    await timer.switchSession(settings);
  }
});


chrome.runtime.onInstalled.addListener(async () => {
  const settings = await storage.getSettings();
  await storage.set(settings);
});

console.log('Focus Mode background script loaded');