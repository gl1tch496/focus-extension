import React, { useState, useEffect, useRef } from 'react';
import { storage } from '../utils/storage.js';
import gsap from 'gsap';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Icons = {
  Block: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Calendar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Timer: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Nuclear: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Save: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>,
  TrendUp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
  Target: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
  Brain: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>,
  Youtube: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>,
  Reddit: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="9" cy="10" r="1"></circle><circle cx="15" cy="10" r="1"></circle><path d="M16 15s-1.5 1-4 1-4-1-4-1"></path></svg>
};

const Options = () => {
  const [settings, setSettings] = useState(null);
  const [newSite, setNewSite] = useState('');
  const [newWhitelistSite, setNewWhitelistSite] = useState('');
  const [newYoutubeChannel, setNewYoutubeChannel] = useState('');
  const [newSubreddit, setNewSubreddit] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [analyticsView, setAnalyticsView] = useState('overview'); 


  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const saveButtonRef = useRef(null);

  useEffect(() => {
    loadSettings();
  }, []);


  useEffect(() => {
    if (settings && sectionsRef.current.length > 0) {
      gsap.fromTo(headerRef.current, 
        { y: -30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(sectionsRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
  }, [settings]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const loadSettings = async () => {
    const data = await storage.getSettings();
  
    if (!data.analyticsHistory) {
      data.analyticsHistory = generateMockHistoricalData();
    }
    setSettings(data);
  };

  const generateMockHistoricalData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, i) => ({
      day,
      blocked: Math.floor(Math.random() * 25) + 5,
      productive: Math.floor(Math.random() * 120) + 60
    }));
  };

  const saveSettings = async () => {
    setSaveStatus('saving');
    gsap.to(saveButtonRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    await storage.set(settings);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const addBlockedSite = () => {
    if (newSite.trim()) {
      setSettings({
        ...settings,
        blockedSites: [...settings.blockedSites, newSite.trim()]
      });
      setNewSite('');
    }
  };

  const removeBlockedSite = (site) => {
    setSettings({
      ...settings,
      blockedSites: settings.blockedSites.filter(s => s !== site)
    });
  };

  const addWhitelistSite = () => {
    if (newWhitelistSite.trim()) {
      setSettings({
        ...settings,
        whitelist: [...settings.whitelist, newWhitelistSite.trim()]
      });
      setNewWhitelistSite('');
    }
  };

  const removeWhitelistSite = (site) => {
    setSettings({
      ...settings,
      whitelist: settings.whitelist.filter(s => s !== site)
    });
  };

  const addYoutubeChannel = () => {
    if (newYoutubeChannel.trim()) {
      setSettings({
        ...settings,
        whitelistedChannels: [...settings.whitelistedChannels, newYoutubeChannel.trim()]
      });
      setNewYoutubeChannel('');
    }
  };

  const removeYoutubeChannel = (channel) => {
    setSettings({
      ...settings,
      whitelistedChannels: settings.whitelistedChannels.filter(c => c !== channel)
    });
  };

  const addSubreddit = () => {
    if (newSubreddit.trim()) {
      setSettings({
        ...settings,
        whitelistedSubreddits: [...settings.whitelistedSubreddits, newSubreddit.trim()]
      });
      setNewSubreddit('');
    }
  };

  const removeSubreddit = (subreddit) => {
    setSettings({
      ...settings,
      whitelistedSubreddits: settings.whitelistedSubreddits.filter(s => s !== subreddit)
    });
  };

  const resetStats = async () => {
    const newStats = { sitesBlocked: 0, timeSaved: 0, lastReset: Date.now() };
    setSettings({ ...settings, stats: newStats });
    await storage.set({ stats: newStats });
  };

  if (!settings) return <div style={styles.loading}>Initializing Focus Engine...</div>;


  const weeklyData = settings.analyticsHistory || [];
  const productivityScore = Math.round((settings.stats.timeSaved / 60) * 100) / 100;
  const avgBlocksPerDay = (settings.stats.sitesBlocked / 7).toFixed(1);

  const siteDistribution = [
    { name: 'Social Media', value: 45, color: '#ef4444' },
    { name: 'Video Streaming', value: 30, color: '#f59e0b' },
    { name: 'News', value: 15, color: '#8b5cf6' },
    { name: 'Shopping', value: 10, color: '#06b6d4' }
  ];

  return (
    <div style={styles.pageBackground}>
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      <div style={styles.container} ref={containerRef}>
        <div style={styles.header} ref={headerRef}>
          <h1 style={styles.title}>Focus Control Center</h1>
          <p style={styles.subtitle}>Elite productivity engineering for peak performance.</p>
        </div>

        {/* Advanced Analytics Dashboard */}
        <div style={styles.section} ref={addToRefs}>
          <div style={styles.sectionHeader}>
            <div style={styles.iconWrapper}><Icons.Chart /></div>
            <h2 style={styles.sectionTitle}>Performance Analytics</h2>
          </div>

          {/* View Toggle */}
          <div style={styles.viewToggle}>
            <button 
              style={{...styles.viewButton, ...(analyticsView === 'overview' ? styles.viewButtonActive : {})}}
              onClick={() => setAnalyticsView('overview')}
            >
              Overview
            </button>
            <button 
              style={{...styles.viewButton, ...(analyticsView === 'detailed' ? styles.viewButtonActive : {})}}
              onClick={() => setAnalyticsView('detailed')}
            >
              Detailed
            </button>
            <button 
              style={{...styles.viewButton, ...(analyticsView === 'trends' ? styles.viewButtonActive : {})}}
              onClick={() => setAnalyticsView('trends')}
            >
              Trends
            </button>
          </div>

          {/* KPI Cards */}
          <div style={styles.kpiGrid}>
            <div style={styles.kpiCard}>
              <div style={styles.kpiHeader}>
                <Icons.Target />
                <span style={styles.kpiLabel}>Total Blocks</span>
              </div>
              <div style={styles.kpiValue}>{settings.stats.sitesBlocked}</div>
              <div style={styles.kpiSubtext}>+{Math.floor(settings.stats.sitesBlocked * 0.12)} this week</div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiHeader}>
                <Icons.Timer />
                <span style={styles.kpiLabel}>Time Reclaimed</span>
              </div>
              <div style={{...styles.kpiValue, color: '#34d399'}}>{settings.stats.timeSaved}m</div>
              <div style={styles.kpiSubtext}>{productivityScore} hrs total</div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiHeader}>
                <Icons.TrendUp />
                <span style={styles.kpiLabel}>Daily Average</span>
              </div>
              <div style={{...styles.kpiValue, color: '#60a5fa'}}>{avgBlocksPerDay}</div>
              <div style={styles.kpiSubtext}>blocks per day</div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiHeader}>
                <Icons.Brain />
                <span style={styles.kpiLabel}>Focus Score</span>
              </div>
              <div style={{...styles.kpiValue, color: '#a78bfa'}}>
                {Math.min(100, Math.floor(settings.stats.sitesBlocked * 2))}
              </div>
              <div style={styles.kpiSubtext}>out of 100</div>
            </div>
          </div>

          {/* Charts */}
          {analyticsView === 'overview' && (
            <div style={styles.chartsContainer}>
              <div style={styles.chartBox}>
                <h3 style={styles.chartTitle}>Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="#94a3b8" style={{fontSize: '12px'}} />
                    <YAxis stroke="#94a3b8" style={{fontSize: '12px'}} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(15, 12, 41, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Area type="monotone" dataKey="blocked" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorBlocked)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.chartBox}>
                <h3 style={styles.chartTitle}>Distraction Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={siteDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {siteDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(15, 12, 41, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={styles.legend}>
                  {siteDistribution.map(item => (
                    <div key={item.name} style={styles.legendItem}>
                      <div style={{...styles.legendDot, backgroundColor: item.color}}></div>
                      <span style={styles.legendText}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {analyticsView === 'detailed' && (
            <div style={styles.chartsContainer}>
              <div style={styles.chartBox}>
                <h3 style={styles.chartTitle}>Productivity Hours by Day</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="#94a3b8" style={{fontSize: '12px'}} />
                    <YAxis stroke="#94a3b8" style={{fontSize: '12px'}} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(15, 12, 41, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="productive" fill="#34d399" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {analyticsView === 'trends' && (
            <div style={styles.chartsContainer}>
              <div style={styles.chartBox}>
                <h3 style={styles.chartTitle}>7-Day Trend Analysis</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="#94a3b8" style={{fontSize: '12px'}} />
                    <YAxis stroke="#94a3b8" style={{fontSize: '12px'}} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(15, 12, 41, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend wrapperStyle={{color: '#94a3b8', fontSize: '12px'}} />
                    <Line type="monotone" dataKey="blocked" stroke="#ef4444" strokeWidth={2} dot={{r: 4}} />
                    <Line type="monotone" dataKey="productive" stroke="#34d399" strokeWidth={2} dot={{r: 4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <button onClick={resetStats} style={styles.resetButton}>
            Reset Analytics Data
          </button>
        </div>

        {/* Blocked Sites */}
        <div style={styles.section} ref={addToRefs}>
          <div style={styles.sectionHeader}>
            <div style={styles.iconWrapper}><Icons.Block /></div>
            <h2 style={styles.sectionTitle}>Distraction Blocking</h2>
          </div>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addBlockedSite()}
              placeholder="e.g. facebook.com"
              style={styles.input}
            />
            <button onClick={addBlockedSite} style={styles.addButton}><Icons.Plus /> Add</button>
          </div>
          
          <div style={styles.list}>
            {settings.blockedSites.map(site => (
              <div key={site} style={styles.listItem}>
                <span style={styles.siteName}>{site}</span>
                <button onClick={() => removeBlockedSite(site)} style={styles.removeButton}>
                  <Icons.Trash />
                </button>
              </div>
            ))}
            {settings.blockedSites.length === 0 && <div style={styles.emptyState}>No sites blocked yet.</div>}
          </div>
        </div>

        {/* YouTube Channel Whitelist */}
        <div style={styles.section} ref={addToRefs}>
          <div style={styles.sectionHeader}>
            <div style={styles.iconWrapper}><Icons.Youtube /></div>
            <h2 style={styles.sectionTitle}>YouTube Channel Whitelist</h2>
          </div>
          <p style={styles.description}>Allow specific educational or productive YouTube channels even when youtube.com is blocked.</p>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newYoutubeChannel}
              onChange={(e) => setNewYoutubeChannel(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addYoutubeChannel()}
              placeholder="Channel ID (e.g. UCX6OQ3DkcsbYNE6H8uQQuVA)"
              style={styles.input}
            />
            <button onClick={addYoutubeChannel} style={styles.addButton}><Icons.Plus /> Add</button>
          </div>
          
          <div style={styles.list}>
            {settings.whitelistedChannels.map(channel => (
              <div key={channel} style={styles.listItem}>
                <span style={styles.siteName}>{channel}</span>
                <button onClick={() => removeYoutubeChannel(channel)} style={styles.removeButton}>
                  <Icons.Trash />
                </button>
              </div>
            ))}
            {settings.whitelistedChannels.length === 0 && <div style={styles.emptyState}>No channels whitelisted.</div>}
          </div>
        </div>

        {/* Reddit Subreddit Whitelist */}
        <div style={styles.section} ref={addToRefs}>
          <div style={styles.sectionHeader}>
            <div style={styles.iconWrapper}><Icons.Reddit /></div>
            <h2 style={styles.sectionTitle}>Reddit Subreddit Whitelist</h2>
          </div>
          <p style={styles.description}>Allow specific productive subreddits while blocking the rest of Reddit.</p>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newSubreddit}
              onChange={(e) => setNewSubreddit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSubreddit()}
              placeholder="Subreddit name (e.g. programming)"
              style={styles.input}
            />
            <button onClick={addSubreddit} style={styles.addButton}><Icons.Plus /> Add</button>
          </div>
          
          <div style={styles.list}>
            {settings.whitelistedSubreddits.map(subreddit => (
              <div key={subreddit} style={styles.listItem}>
                <span style={styles.siteName}>r/{subreddit}</span>
                <button onClick={() => removeSubreddit(subreddit)} style={styles.removeButton}>
                  <Icons.Trash />
                </button>
              </div>
            ))}
            {settings.whitelistedSubreddits.length === 0 && <div style={styles.emptyState}>No subreddits whitelisted.</div>}
          </div>
        </div>

        {/* Essential Whitelist */}
        <div style={styles.section} ref={addToRefs}>
          <div style={styles.sectionHeader}>
            <div style={styles.iconWrapper}><Icons.Check /></div>
            <h2 style={styles.sectionTitle}>Essential Whitelist</h2>
          </div>
          <p style={styles.description}>These sites are always accessible, even during "Nuclear" mode.</p>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newWhitelistSite}
              onChange={(e) => setNewWhitelistSite(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addWhitelistSite()}
              placeholder="e.g. stackoverflow.com"
              style={styles.input}
            />
            <button onClick={addWhitelistSite} style={styles.addButton}><Icons.Plus /> Add</button>
          </div>
          
          <div style={styles.list}>
            {settings.whitelist.map(site => (
              <div key={site} style={styles.listItem}>
                <span style={styles.siteName}>{site}</span>
                <button onClick={() => removeWhitelistSite(site)} style={styles.removeButton}>
                  <Icons.Trash />
                </button>
              </div>
            ))}
            {settings.whitelist.length === 0 && <div style={styles.emptyState}>No sites in whitelist.</div>}
          </div>
        </div>

        {/* Schedule */}
        <div style={styles.section} ref={addToRefs}>
          <div style={styles.sectionHeader}>
            <div style={styles.iconWrapper}><Icons.Calendar /></div>
            <h2 style={styles.sectionTitle}>Active Hours</h2>
          </div>

          <label style={styles.toggleRow}>
            <span>Enable Scheduled Blocking</span>
            <div style={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={settings.schedule.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  schedule: { ...settings.schedule, enabled: e.target.checked }
                })}
                style={styles.checkboxHidden}
              />
              <span style={{
                ...styles.slider,
                backgroundColor: settings.schedule.enabled ? '#7c3aed' : '#4b5563'
              }}></span>
            </div>
          </label>
          
          <div style={styles.scheduleGrid}>
            <div style={styles.timeInputWrapper}>
              <label style={styles.inputLabel}>Start Hour (0-23)</label>
              <input
                type="number" min="0" max="23"
                value={settings.schedule.startHour}
                onChange={(e) => setSettings({
                  ...settings,
                  schedule: { ...settings.schedule, startHour: parseInt(e.target.value) }
                })}
                style={styles.numberInput}
              />
            </div>
            <div style={styles.timeInputWrapper}>
              <label style={styles.inputLabel}>End Hour (0-23)</label>
              <input
                type="number" min="0" max="23"
                value={settings.schedule.endHour}
                onChange={(e) => setSettings({
                  ...settings,
                  schedule: { ...settings.schedule, endHour: parseInt(e.target.value) }
                })}
                style={styles.numberInput}
              />
            </div>
          </div>

          <label style={styles.checkboxSimple}>
            <input
              type="checkbox"
              checked={settings.schedule.weekdaysOnly}
              onChange={(e) => setSettings({
                ...settings,
                schedule: { ...settings.schedule, weekdaysOnly: e.target.checked }
              })}
            />
            <span>Active on weekdays only</span>
          </label>
        </div>

        {/* Pomodoro */}
        <div style={styles.section} ref={addToRefs}>
          <div style={styles.sectionHeader}>
            <div style={styles.iconWrapper}><Icons.Timer /></div>
            <h2 style={styles.sectionTitle}>Pomodoro Configuration</h2>
          </div>
          <div style={styles.scheduleGrid}>
            <div style={styles.timeInputWrapper}>
              <label style={styles.inputLabel}>Focus Duration (min)</label>
              <input
                type="number" min="1" max="60"
                value={settings.pomodoro.workDuration}
                onChange={(e) => setSettings({
                  ...settings,
                  pomodoro: { ...settings.pomodoro, workDuration: parseInt(e.target.value) }
                })}
                style={styles.numberInput}
              />
            </div>
            <div style={styles.timeInputWrapper}>
              <label style={styles.inputLabel}>Break Duration (min)</label>
              <input
                type="number" min="1" max="30"
                value={settings.pomodoro.breakDuration}
                onChange={(e) => setSettings({
                  ...settings,
                  pomodoro: { ...settings.pomodoro, breakDuration: parseInt(e.target.value) }
                })}
                style={styles.numberInput}
              />
            </div>
          </div>
        </div>

        {/* Nuclear Option */}
        <div style={styles.section} ref={addToRefs}>
          <div style={styles.sectionHeader}>
            <div style={styles.iconWrapper}><Icons.Nuclear /></div>
            <h2 style={styles.sectionTitle}>Emergency Protocol</h2>
          </div>
          <p style={styles.description}>
            Define a complex phrase required to override a block temporarily.
          </p>
          <input
            type="text"
            value={settings.nuclearPhrase}
            onChange={(e) => setSettings({
              ...settings,
              nuclearPhrase: e.target.value
            })}
            style={styles.input}
            placeholder="e.g. I promise to be productive"
          />
        </div>

        <div style={styles.spacer}></div>
      </div>

      {/* Floating Save Bar */}
      <div style={styles.saveBar}>
        <div style={styles.saveContainer}>
           <button 
             onClick={saveSettings} 
             style={{
               ...styles.saveButton,
               backgroundColor: saveStatus === 'saved' ? '#059669' : '#6d28d9'
             }}
             ref={saveButtonRef}
             disabled={saveStatus === 'saving'}
           >
             <Icons.Save /> 
             {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Changes Saved' : 'Save Changes'}
           </button>
        </div>
      </div>
    </div>
  );
};


const styles = {
  pageBackground: {
    minHeight: '100vh',
    backgroundColor: '#0f0c29',
    backgroundImage: 'linear-gradient(315deg, #0f0c29 0%, #302b63 74%, #24243e 100%)',
    fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif',
    color: '#e2e8f0',
    position: 'relative',
    overflowX: 'hidden'
  },
  orb1: {
    position: 'fixed', top: '-10%', right: '-10%', width: '600px', height: '600px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
  },
  orb2: {
    position: 'fixed', bottom: '-10%', left: '-10%', width: '500px', height: '500px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '60px 20px 100px 20px',
    position: 'relative',
    zIndex: 1
  },
  loading: {
    height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#0f0c29', color: '#a78bfa', fontSize: '18px'
  },
  header: {
    textAlign: 'center', marginBottom: '50px'
  },
  title: {
    fontSize: '42px', fontWeight: '800', margin: '0 0 10px 0',
    background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #60a5fa 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    fontSize: '16px', color: '#94a3b8', fontWeight: '300', letterSpacing: '0.5px'
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  sectionHeader: {
    display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'
  },
  iconWrapper: {
    padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px'
  },
  sectionTitle: {
    fontSize: '20px', fontWeight: '600', margin: 0, color: '#fff'
  },
  description: {
    fontSize: '14px', color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6'
  },
  viewToggle: {
    display: 'flex', gap: '8px', marginBottom: '24px', backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '4px', borderRadius: '12px'
  },
  viewButton: {
    flex: 1, padding: '10px 16px', backgroundColor: 'transparent', border: 'none',
    borderRadius: '8px', color: '#94a3b8', fontSize: '14px', fontWeight: '500',
    cursor: 'pointer', transition: 'all 0.2s'
  },
  viewButtonActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)', color: '#fff'
  },
  kpiGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px', marginBottom: '30px'
  },
  kpiCard: {
    padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  kpiHeader: {
    display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'
  },
  kpiLabel: {
    fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600'
  },
  kpiValue: {
    fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '4px'
  },
  kpiSubtext: {
    fontSize: '11px', color: '#64748b'
  },
  chartsContainer: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px', marginBottom: '20px'
  },
  chartBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '20px', borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  chartTitle: {
    fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '16px',
    textTransform: 'uppercase', letterSpacing: '0.5px'
  },
  legend: {
    display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', justifyContent: 'center'
  },
  legendItem: {
    display: 'flex', alignItems: 'center', gap: '6px'
  },
  legendDot: {
    width: '10px', height: '10px', borderRadius: '50%'
  },
  legendText: {
    fontSize: '12px', color: '#94a3b8'
  },
  inputGroup: {
    display: 'flex', gap: '12px', marginBottom: '20px'
  },
  input: {
    flex: 1, padding: '12px 16px', backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px',
    color: '#fff', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s'
  },
  addButton: {
    padding: '0 24px', backgroundColor: '#6d28d9', color: 'white', border: 'none',
    borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s'
  },
  list: {
    display: 'flex', flexDirection: 'column', gap: '8px'
  },
  listItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 16px', backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  siteName: {
    fontSize: '14px', fontFamily: 'monospace', color: '#e2e8f0'
  },
  removeButton: {
    background: 'transparent', border: 'none', color: '#ef4444',
    cursor: 'pointer', padding: '4px', display: 'flex', opacity: 0.8, transition: 'opacity 0.2s'
  },
  emptyState: {
    textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '14px', fontStyle: 'italic'
  },
  toggleRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '20px', cursor: 'pointer'
  },
  toggleSwitch: {
    position: 'relative', width: '48px', height: '26px'
  },
  checkboxHidden: {
    opacity: 0, width: 0, height: 0
  },
  slider: {
    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: '26px', transition: '.3s',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
  },
  scheduleGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'
  },
  timeInputWrapper: {
    display: 'flex', flexDirection: 'column', gap: '8px'
  },
  inputLabel: {
    fontSize: '12px', color: '#94a3b8', fontWeight: '500', textTransform: 'uppercase'
  },
  numberInput: {
    width: '100%', padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px',
    color: '#fff', fontSize: '15px', boxSizing: 'border-box'
  },
  checkboxSimple: {
    display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px',
    color: '#cbd5e1', cursor: 'pointer'
  },
  resetButton: {
    width: '100%', padding: '12px', backgroundColor: 'transparent',
    border: '1px solid rgba(249, 115, 22, 0.5)', borderRadius: '10px',
    color: '#fdba74', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
    transition: 'all 0.2s'
  },
  saveBar: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(15, 12, 41, 0.95)', backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px',
    zIndex: 10, display: 'flex', justifyContent: 'center'
  },
  saveContainer: {
    width: '100%', maxWidth: '900px'
  },
  saveButton: {
    width: '100%', padding: '16px', color: 'white', border: 'none',
    borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer',
    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)', transition: 'background 0.3s'
  },
  spacer: {
    height: '60px'
  }
};

export default Options;