
export const blocker = {
  isBlocked(url, settings) {
    if (!settings.enabled) return false;


    if (settings.schedule.enabled && !this.isInSchedule(settings.schedule)) {
      return false;
    }

 
    const hostname = new URL(url).hostname.replace('www.', '');
    

    if (settings.whitelist.some(site => hostname.includes(site))) {
      return false;
    }

    if (hostname.includes('youtube.com') && url.includes('/channel/')) {
      const channelMatch = url.match(/\/channel\/([^/?]+)/);
      if (channelMatch && settings.whitelistedChannels.includes(channelMatch[1])) {
        return false;
      }
    }

  
    if (hostname.includes('youtube.com') && url.includes('/@')) {
      const handleMatch = url.match(/\/@([^/?]+)/);
      if (handleMatch && settings.whitelistedChannels.includes(handleMatch[1])) {
        return false;
      }
    }


    if (hostname.includes('reddit.com') && url.includes('/r/')) {
      const subredditMatch = url.match(/\/r\/([^/?]+)/);
      if (subredditMatch && settings.whitelistedSubreddits.includes(subredditMatch[1])) {
        return false;
      }
    }

  
    return settings.blockedSites.some(site => hostname.includes(site));
  },

  isInSchedule(schedule) {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

  
    if (schedule.weekdaysOnly && (day === 0 || day === 6)) {
      return false;
    }


    return hour >= schedule.startHour && hour < schedule.endHour;
  },


  getBlockReason(url, settings) {
    const hostname = new URL(url).hostname.replace('www.', '');
    
    if (!settings.enabled) {
      return 'Blocker is disabled';
    }

    if (settings.schedule.enabled && !this.isInSchedule(settings.schedule)) {
      return 'Outside scheduled blocking hours';
    }

    const blockedSite = settings.blockedSites.find(site => hostname.includes(site));
    if (blockedSite) {
      return `${blockedSite} is on your block list`;
    }

    return 'Site is blocked';
  }
};