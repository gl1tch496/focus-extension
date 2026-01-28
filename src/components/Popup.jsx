/**
 * FlowState Focus Manager - Popup Interface
 * Copyright © 2024 Gl1tch Goat. All rights reserved.
 * 
 * Professional productivity extension with advanced focus management
 */

import React, { useState, useEffect, useRef } from 'react';
import { storage } from '../utils/storage.js';
import { timer } from '../utils/timer.js';
import gsap from 'gsap';


const Icons = {
  Target: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  ),
  Pause: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  ),
  Stop: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  Trend: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  ),
  Coffee: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
  ),
  Briefcase: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  Fire: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
  ),
  Award: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  )
};

const Popup = () => {
  const [settings, setSettings] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [todayBlocked, setTodayBlocked] = useState(0);


  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    loadSettings();
    calculateStreak();
    const interval = setInterval(updateTimer, 1000);
    
  
    if (containerRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }

    return () => clearInterval(interval);
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const loadSettings = async () => {
    const data = await storage.getSettings();
    setSettings(data);
    setTodayBlocked(data.stats.blockedToday || 0);
    
    if (data.pomodoro.active) {
      const remaining = timer.getTimeRemaining(data.pomodoro.endTime);
      setTimeRemaining(remaining);
      
      const prog = timer.getProgress(data.pomodoro.startTime, data.pomodoro.endTime);
      setProgress(prog);
    }
  };

  const updateTimer = async () => {
    const data = await storage.getSettings();
    if (data.pomodoro.active) {
      const remaining = timer.getTimeRemaining(data.pomodoro.endTime);
      setTimeRemaining(remaining);
      
      const prog = timer.getProgress(data.pomodoro.startTime, data.pomodoro.endTime);
      setProgress(prog);
      
      if (remaining === 0) {
       
        if (timerRef.current) {
          gsap.to(timerRef.current, {
            scale: 1.1,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        }
        loadSettings();
      }
    }
  };

  const calculateStreak = async () => {
    const data = await storage.getSettings();
    const lastReset = data.stats.lastReset;
    const daysSinceReset = Math.floor((Date.now() - lastReset) / (1000 * 60 * 60 * 24));
    setStreak(Math.min(daysSinceReset, 99)); 
  };

  const toggleFocusMode = async () => {
    const newState = !settings.enabled;
    await storage.set({ enabled: newState });
    
    gsap.to(cardsRef.current[0], {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
    
    loadSettings();
  };

  const startPomodoro = async () => {
    await timer.startPomodoro(settings);
    

    if (timerRef.current) {
      gsap.fromTo(timerRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
    
    loadSettings();
  };

  const stopPomodoro = async () => {
    await timer.stopPomodoro();
    
  
    if (timerRef.current) {
      gsap.to(timerRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
    
    loadSettings();
  };

  if (!settings) return (
    <div style={styles.loading}>
      <div style={styles.loadingSpinner}></div>
      <div style={styles.loadingText}>Initializing FlowState...</div>
    </div>
  );

  const focusScore = Math.min(100, Math.floor((settings.stats.sitesBlocked || 0) * 2));
  const productivityLevel = focusScore >= 80 ? 'Elite' : focusScore >= 50 ? 'Strong' : focusScore >= 20 ? 'Building' : 'Starting';

  return (
    <div style={styles.container} ref={containerRef}>
      {/* Ambient Background Glows */}
      <div style={styles.glowTop}></div>
      <div style={styles.glowBottom}></div>
      
      {/* Header */}
      <div style={styles.header} ref={addToRefs}>
        <div style={styles.brand}>
          <Icons.Target />
          <div>
            <h1 style={styles.title}>FlowState</h1>
            <div style={styles.subtitle}>Focus Manager</div>
          </div>
        </div>
        <button 
          onClick={() => chrome.runtime.openOptionsPage()}
          style={styles.iconButton}
          title="Open Settings"
        >
          <Icons.Settings />
        </button>
      </div>

      {/* Focus Status Banner */}
      <div style={{
        ...styles.statusBanner,
        backgroundColor: settings.enabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
        borderColor: settings.enabled ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'
      }} ref={addToRefs}>
        <div style={styles.statusIcon}>
          {settings.enabled ? <Icons.Shield /> : <Icons.Zap />}
        </div>
        <div style={styles.statusContent}>
          <div style={styles.statusLabel}>
            {settings.enabled ? 'Protection Active' : 'Protection Disabled'}
          </div>
          <div style={styles.statusText}>
            {settings.enabled 
              ? `${settings.blockedSites.length} sites blocked`
              : 'All sites accessible'
            }
          </div>
        </div>
        <button 
          onClick={toggleFocusMode}
          style={{
            ...styles.toggleContainer,
            backgroundColor: settings.enabled ? '#10b981' : 'rgba(255,255,255,0.1)'
          }}
        >
          <div style={{
            ...styles.toggleHandle,
            transform: settings.enabled ? 'translateX(20px)' : 'translateX(0)'
          }} />
        </button>
      </div>

      {/* Performance Metrics */}
      <div style={styles.metricsGrid} ref={addToRefs}>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}><Icons.Fire /></div>
          <div style={styles.metricValue}>{streak}</div>
          <div style={styles.metricLabel}>Day Streak</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}><Icons.Shield /></div>
          <div style={styles.metricValue}>{todayBlocked}</div>
          <div style={styles.metricLabel}>Today</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}><Icons.Award /></div>
          <div style={styles.metricValue}>{focusScore}</div>
          <div style={styles.metricLabel}>Score</div>
        </div>
      </div>

      {/* Productivity Level Badge */}
      <div style={styles.levelBadge} ref={addToRefs}>
        <Icons.Trend />
        <span style={styles.levelText}>
          Productivity: <strong style={styles.levelValue}>{productivityLevel}</strong>
        </span>
      </div>

      {/* Pomodoro Timer Section */}
      <div style={styles.card} ref={addToRefs}>
        <div style={styles.cardHeader}>
          <h2 style={styles.sectionTitle}>
            <Icons.Clock /> Pomodoro Timer
          </h2>
          {settings.pomodoro.completedSessions > 0 && (
            <div style={styles.sessionBadge}>
              {settings.pomodoro.completedSessions} sessions
            </div>
          )}
        </div>
        
        {settings.pomodoro.active ? (
          <div style={styles.timerContainer} ref={timerRef}>
            <div style={styles.sessionTypeBadge}>
              {settings.pomodoro.currentSession === 'work' ? <Icons.Briefcase /> : <Icons.Coffee />}
              <span>{settings.pomodoro.currentSession === 'work' ? 'Deep Focus' : 'Recharge'}</span>
            </div>
            
            {/* Circular Progress */}
            <div style={styles.timerCircle}>
              <svg width="140" height="140" style={styles.progressRing}>
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  stroke={settings.pomodoro.currentSession === 'work' ? '#60a5fa' : '#fbbf24'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 62}`}
                  strokeDashoffset={`${2 * Math.PI * 62 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  style={styles.progressCircle}
                />
              </svg>
              <div style={styles.timerDisplay}>{timer.formatTime(timeRemaining)}</div>
            </div>
            
            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: `${progress}%`,
                backgroundColor: settings.pomodoro.currentSession === 'work' ? '#60a5fa' : '#fbbf24'
              }} />
            </div>
            
            <button 
              onClick={stopPomodoro} 
              style={styles.stopButton}
              onMouseEnter={() => setHoveredButton('stop')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Icons.Stop /> End Session
            </button>
          </div>
        ) : (
          <div style={styles.timerInactive}>
            <div style={styles.nextSessionInfo}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Next Session:</span>
                <span style={styles.infoValue}>
                  {settings.pomodoro.currentSession === 'work' ? (
                    <><Icons.Briefcase /> Work</>
                  ) : (
                    <><Icons.Coffee /> Break</>
                  )}
                </span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Duration:</span>
                <span style={styles.infoValue}>
                  {settings.pomodoro.currentSession === 'work' 
                    ? settings.pomodoro.workDuration 
                    : settings.pomodoro.breakDuration} minutes
                </span>
              </div>
            </div>
            <button 
              onClick={startPomodoro} 
              style={{
                ...styles.startButton,
                ...(hoveredButton === 'start' ? styles.startButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('start')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Icons.Play /> Start Focus Session
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div style={styles.statsCard} ref={addToRefs}>
        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <div style={styles.statItemLabel}>Total Blocked</div>
            <div style={styles.statItemValue}>{settings.stats.sitesBlocked}</div>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <div style={styles.statItemLabel}>Time Saved</div>
            <div style={{...styles.statItemValue, color: '#34d399'}}>
              {settings.stats.timeSaved}m
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div style={styles.footer}>
        <div style={styles.copyright}>© 2024 Gl1tch Goat</div>
        <div style={styles.version}>v2.0</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '360px',
    minHeight: '520px',
    fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#0f0c29',
    backgroundImage: 'linear-gradient(315deg, #0f0c29 0%, #302b63 74%, #24243e 100%)',
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden'
  },
  glowTop: {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0
  },
  glowBottom: {
    position: 'absolute',
    bottom: '-50px',
    left: '-50px',
    width: '180px',
    height: '180px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0
  },
  loading: {
    width: '360px',
    height: '520px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    backgroundColor: '#0f0c29',
    backgroundImage: 'linear-gradient(315deg, #0f0c29 0%, #302b63 74%, #24243e 100%)'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(167, 139, 250, 0.2)',
    borderTop: '3px solid #a78bfa',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    color: '#a78bfa',
    fontSize: '14px',
    fontWeight: '500'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    position: 'relative',
    zIndex: 2
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    color: '#fff',
    letterSpacing: '-0.5px',
    lineHeight: 1
  },
  subtitle: {
    fontSize: '11px',
    color: '#94a3b8',
    marginTop: '2px',
    fontWeight: '400'
  },
  iconButton: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  statusBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    borderRadius: '14px',
    border: '1px solid',
    marginBottom: '16px',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1
  },
  statusIcon: {
    display: 'flex',
    padding: '8px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '10px'
  },
  statusContent: {
    flex: 1
  },
  statusLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '2px'
  },
  statusText: {
    fontSize: '11px',
    color: '#94a3b8'
  },
  toggleContainer: {
    width: '44px',
    height: '24px',
    borderRadius: '24px',
    border: 'none',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    padding: '2px',
    flexShrink: 0
  },
  toggleHandle: {
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '12px',
    position: 'relative',
    zIndex: 1
  },
  metricCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '12px 8px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  metricIcon: {
    display: 'flex',
    marginBottom: '2px'
  },
  metricValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
    lineHeight: 1
  },
  metricLabel: {
    fontSize: '10px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  levelBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '10px',
    marginBottom: '16px',
    position: 'relative',
    zIndex: 1
  },
  levelText: {
    fontSize: '12px',
    color: '#e2e8f0',
    fontWeight: '400'
  },
  levelValue: {
    color: '#34d399',
    fontWeight: '600'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '18px',
    marginBottom: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    position: 'relative',
    zIndex: 1
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px'
  },
  sectionTitle: {
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#94a3b8',
    margin: 0,
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  sessionBadge: {
    fontSize: '10px',
    padding: '4px 8px',
    backgroundColor: 'rgba(167, 139, 250, 0.2)',
    color: '#c4b5fd',
    borderRadius: '6px',
    fontWeight: '500'
  },
  timerContainer: {
    textAlign: 'center'
  },
  sessionTypeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#e2e8f0',
    marginBottom: '12px',
    fontWeight: '500'
  },
  timerCircle: {
    position: 'relative',
    width: '140px',
    height: '140px',
    margin: '0 auto 12px'
  },
  progressRing: {
    transform: 'rotate(-90deg)',
    position: 'absolute',
    top: 0,
    left: 0
  },
  progressCircle: {
    transition: 'stroke-dashoffset 0.5s ease'
  },
  timerDisplay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '32px',
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#fff',
    textShadow: '0 0 20px rgba(167, 139, 250, 0.5)'
  },
  progressBar: {
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
    marginBottom: '12px'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.5s ease',
    borderRadius: '2px'
  },
  stopButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#fca5a5',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  timerInactive: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  nextSessionInfo: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: '12px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px'
  },
  infoLabel: {
    color: '#94a3b8'
  },
  infoValue: {
    color: '#e2e8f0',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  startButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6d28d9',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(109, 40, 217, 0.3)'
  },
  startButtonHover: {
    backgroundColor: '#7c3aed',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(109, 40, 217, 0.4)'
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '14px',
    marginBottom: '12px',
    position: 'relative',
    zIndex: 1
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  statItem: {
    flex: 1,
    textAlign: 'center'
  },
  statDivider: {
    width: '1px',
    height: '32px',
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  statItemLabel: {
    fontSize: '10px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: '4px',
    letterSpacing: '0.5px'
  },
  statItemValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    position: 'relative',
    zIndex: 1
  },
  copyright: {
    fontSize: '10px',
    color: '#64748b',
    fontWeight: '500'
  },
  version: {
    fontSize: '10px',
    color: '#475569',
    fontFamily: 'monospace'
  }
};


const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Popup;