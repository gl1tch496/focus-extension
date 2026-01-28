/**
 * FlowState Focus Manager - Blocked Page Interface
 * Copyright © 2024 Gl1tch Goat. All rights reserved.
 * 
 * Professional distraction blocking page with motivational elements
 */

import React, { useState, useEffect } from 'react';
import { Lock, Lightbulb, Shield, Clock, AlertTriangle, X, TrendingUp, Award, Target, Zap } from 'lucide-react';

const quotes = [
  "The secret of getting ahead is getting started. - Mark Twain",
  "Focus on being productive instead of busy. - Tim Ferriss",
  "You don't have to be great to start, but you have to start to be great. - Zig Ziglar",
  "Concentrate all your thoughts upon the work in hand. - Alexander Graham Bell",
  "The successful warrior is the average man, with laser-like focus. - Bruce Lee",
  "It's not always that we need to do more but rather that we need to focus on less. - Nathan W. Morris",
  "Starve your distractions, feed your focus.",
  "Your focus determines your reality. - George Lucas",
  "Productivity is never an accident. It is always the result of a commitment to excellence. - Paul J. Meyer",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Until we can manage time, we can manage nothing else. - Peter Drucker",
  "Action is the foundational key to all success. - Pablo Picasso"
];

const motivationalTips = [
  "Take a 5-minute walk to reset your focus",
  "Write down your top 3 priorities for today",
  "Practice the 2-minute rule: if it takes less than 2 minutes, do it now",
  "Use the Pomodoro technique: 25 minutes work, 5 minutes break",
  "Turn off all non-essential notifications",
  "Create a dedicated workspace free from distractions",
  "Review your goals at the start of each day",
  "Break large tasks into smaller, manageable chunks"
];

const BlockedPage = () => {
  const [settings, setSettings] = useState(null);
  const [blockedUrl, setBlockedUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [tip, setTip] = useState('');
  const [unlockPhrase, setUnlockPhrase] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadSettings();
    const params = new URLSearchParams(window.location.search);
    setBlockedUrl(params.get('url') || 'unknown-site.com');
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setTip(motivationalTips[Math.floor(Math.random() * motivationalTips.length)]);
    

    updateBlockStats();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await window.storage.get('settings');
      const data = response ? JSON.parse(response.value) : {
        nuclearPhrase: 'I need to focus on my work',
        whitelist: [],
        stats: { sitesBlocked: 0, timeSaved: 0, blockedToday: 0 }
      };
      setSettings(data);
    } catch (error) {
      setSettings({
        nuclearPhrase: 'I need to focus on my work',
        whitelist: [],
        stats: { sitesBlocked: 0, timeSaved: 0, blockedToday: 0 }
      });
    }
  };

  const updateBlockStats = async () => {
    try {
      const response = await window.storage.get('settings');
      if (response) {
        const data = JSON.parse(response.value);
        const today = new Date().toDateString();
        
    
        if (data.stats.lastBlockDate !== today) {
          data.stats.blockedToday = 0;
          data.stats.lastBlockDate = today;
        }
        
        data.stats.sitesBlocked = (data.stats.sitesBlocked || 0) + 1;
        data.stats.blockedToday = (data.stats.blockedToday || 0) + 1;
        data.stats.timeSaved = (data.stats.timeSaved || 0) + 5;
        
        await window.storage.set('settings', JSON.stringify(data));
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to update stats:', error);
    }
  };

  const handleUnlock = async () => {
    setAttemptCount(prev => prev + 1);
    
    if (unlockPhrase === settings.nuclearPhrase) {
      const url = new URL(blockedUrl.startsWith('http') ? blockedUrl : `https://${blockedUrl}`);
      const hostname = url.hostname.replace('www.', '');
      
      const newWhitelist = [...settings.whitelist, hostname];
      await window.storage.set('settings', JSON.stringify({
        ...settings,
        whitelist: newWhitelist
      }));
      
      setShowSuccess(true);
      setTimeout(() => {
        window.location.href = blockedUrl;
      }, 1500);
    } else {
      setError(attemptCount >= 2 
        ? 'Multiple failed attempts. Stay focused!' 
        : 'Incorrect access code. Try again.'
      );
      setUnlockPhrase('');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!settings) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}></div>
          <div style={styles.loadingText}>Initializing Protection...</div>
        </div>
      </div>
    );
  }

  const focusScore = Math.min(100, Math.floor((settings.stats.sitesBlocked || 0) * 2));
  const todayProgress = Math.min(100, (settings.stats.blockedToday || 0) * 10);

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.25; transform: scale(1.1); }
          }

          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes successPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }

          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px -12px rgba(139, 92, 246, 0.4);
            border-color: rgba(167, 139, 250, 0.3);
          }

          input:focus {
            border-color: rgba(167, 139, 250, 0.5) !important;
            box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1) !important;
          }

          button:active {
            transform: scale(0.97) !important;
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(124, 58, 237, 0.5);
          }

          .close-button:hover {
            background: rgba(167, 139, 250, 0.1) !important;
            border-color: rgba(167, 139, 250, 0.5) !important;
            transform: translateY(0) !important;
          }

          @media (max-width: 640px) {
            .stats-grid {
              grid-template-columns: 1fr !important;
            }
            .metrics-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      {/* Animated background orbs */}
      <div style={{
        ...styles.backgroundOrb,
        top: '-15%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)',
        animation: 'pulse 8s ease-in-out infinite'
      }}></div>
      <div style={{
        ...styles.backgroundOrb,
        bottom: '-20%',
        right: '-15%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(109, 40, 217, 0.2) 0%, rgba(109, 40, 217, 0) 70%)',
        animation: 'pulse 10s ease-in-out infinite'
      }}></div>
      <div style={{
        ...styles.backgroundOrb,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0) 70%)',
        animation: 'pulse 12s ease-in-out infinite'
      }}></div>

      {showSuccess && (
        <div style={styles.successOverlay}>
          <div style={{...styles.successCard, animation: 'scaleIn 0.5s ease-out'}}>
            <div style={styles.successIcon}>
              <Zap size={48} color="#34d399" strokeWidth={2} />
            </div>
            <h2 style={styles.successTitle}>Access Granted!</h2>
            <p style={styles.successText}>Redirecting to {blockedUrl}...</p>
          </div>
        </div>
      )}

      <div style={{
        ...styles.content,
        animation: mounted ? 'fadeInUp 0.6s ease-out' : 'none'
      }}>
        {/* Floating lock icon */}
        <div style={{
          ...styles.headerIcon,
          animation: 'float 6s ease-in-out infinite'
        }}>
          <Lock size={56} strokeWidth={1.5} color="#a78bfa" />
        </div>
        
        <h1 style={{
          ...styles.title,
          animationDelay: '0.1s',
          animation: mounted ? 'fadeInUp 0.6s ease-out 0.1s backwards' : 'none'
        }}>
          Access Restricted
        </h1>
        
        <p style={{
          ...styles.subtitle,
          animationDelay: '0.2s',
          animation: mounted ? 'fadeInUp 0.6s ease-out 0.2s backwards' : 'none'
        }}>
          This site is currently blocked to preserve your flow state
        </p>

        <div style={{
          ...styles.urlBadge,
          animationDelay: '0.3s',
          animation: mounted ? 'fadeInUp 0.6s ease-out 0.3s backwards' : 'none'
        }}>
          <code>{blockedUrl}</code>
        </div>

        {/* Performance Metrics */}
        <div className="metrics-grid" style={{
          ...styles.metricsGrid,
          animationDelay: '0.35s',
          animation: mounted ? 'fadeInUp 0.6s ease-out 0.35s backwards' : 'none'
        }}>
          <div className="card-hover" style={styles.metricCard}>
            <div style={styles.metricIcon}>
              <Award size={20} color="#a78bfa" strokeWidth={2} />
            </div>
            <div style={styles.metricValue}>{focusScore}</div>
            <div style={styles.metricLabel}>Focus Score</div>
          </div>
          <div className="card-hover" style={styles.metricCard}>
            <div style={styles.metricIcon}>
              <Target size={20} color="#f59e0b" strokeWidth={2} />
            </div>
            <div style={styles.metricValue}>{settings.stats.blockedToday || 0}</div>
            <div style={styles.metricLabel}>Today</div>
          </div>
          <div className="card-hover" style={styles.metricCard}>
            <div style={styles.metricIcon}>
              <TrendingUp size={20} color="#10b981" strokeWidth={2} />
            </div>
            <div style={styles.metricValue}>{todayProgress}%</div>
            <div style={styles.metricLabel}>Progress</div>
          </div>
        </div>

        {/* Inspirational quote card */}
        <div className="card-hover" style={{
          ...styles.quoteCard,
          animationDelay: '0.4s',
          animation: mounted ? 'fadeInUp 0.6s ease-out 0.4s backwards' : 'none'
        }}>
          <div style={styles.quoteIcon}>
            <Lightbulb size={24} color="#fbbf24" strokeWidth={2} />
          </div>
          <div style={{flex: 1}}>
            <p style={styles.quoteText}>{quote}</p>
            <div style={styles.tipBadge}>
              <Zap size={14} color="#60a5fa" strokeWidth={2} />
              <span style={styles.tipText}>Tip: {tip}</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="stats-grid" style={{
          ...styles.statsGrid,
          animationDelay: '0.5s',
          animation: mounted ? 'fadeInUp 0.6s ease-out 0.5s backwards' : 'none'
        }}>
          <div className="card-hover" style={styles.statCard}>
            <div style={styles.statIconWrapper}>
              <Shield size={28} color="#34d399" strokeWidth={2} />
            </div>
            <div style={styles.statValue}>{settings.stats.sitesBlocked || 0}</div>
            <div style={styles.statLabel}>Total Blocked</div>
            <div style={styles.statSubtext}>All-time distractions prevented</div>
          </div>
          <div className="card-hover" style={styles.statCard}>
            <div style={styles.statIconWrapper}>
              <Clock size={28} color="#60a5fa" strokeWidth={2} />
            </div>
            <div style={styles.statValue}>{settings.stats.timeSaved || 0}m</div>
            <div style={styles.statLabel}>Time Saved</div>
            <div style={styles.statSubtext}>{((settings.stats.timeSaved || 0) / 60).toFixed(1)}h of productivity</div>
          </div>
        </div>

        {/* Emergency unlock section */}
        <div style={{
          ...styles.nuclearSection,
          animationDelay: '0.6s',
          animation: mounted ? 'fadeInUp 0.6s ease-out 0.6s backwards' : 'none'
        }}>
          <div style={styles.nuclearHeader}>
            <AlertTriangle size={20} color="#f87171" strokeWidth={2} />
            <span style={styles.nuclearTitle}>Emergency Override</span>
            {attemptCount > 0 && (
              <span style={styles.attemptBadge}>{attemptCount} {attemptCount === 1 ? 'attempt' : 'attempts'}</span>
            )}
          </div>
          <p style={styles.nuclearSubtext}>
            Enter your nuclear phrase to temporarily whitelist this domain. Think carefully before proceeding.
          </p>
          
          <div style={styles.inputWrapper}>
            <input
              type="password"
              value={unlockPhrase}
              onChange={(e) => setUnlockPhrase(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Enter access code..."
              style={styles.unlockInput}
              autoFocus
            />
            <button 
              onClick={handleUnlock} 
              style={styles.unlockButton}
              disabled={!unlockPhrase.trim()}
            >
              Unlock
            </button>
          </div>
          {error && (
            <div style={{...styles.errorMessage, animation: 'slideDown 0.3s ease-out'}}>
              <X size={16} style={{ marginRight: '6px' }} />
              {error}
            </div>
          )}
          {attemptCount >= 3 && (
            <div style={{...styles.warningMessage, animation: 'slideDown 0.3s ease-out'}}>
              <AlertTriangle size={16} style={{ marginRight: '6px' }} />
              Multiple attempts detected. Remember your commitment to focus.
            </div>
          )}
        </div>

        <button 
          onClick={() => window.close()}
          className="close-button"
          style={{
            ...styles.closeButton,
            animationDelay: '0.7s',
            animation: mounted ? 'fadeInUp 0.6s ease-out 0.7s backwards' : 'none'
          }}
        >
          Close Tab & Return to Work
        </button>

        {/* Copyright Footer */}
        <div style={{
          ...styles.footer,
          animationDelay: '0.8s',
          animation: mounted ? 'fadeInUp 0.6s ease-out 0.8s backwards' : 'none'
        }}>
          <span style={styles.copyright}>© 2024 Gl1tch Goat</span>
          <span style={styles.divider}>•</span>
          <span style={styles.version}>FlowState v2.0</span>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0c29 0%, #1a1243 25%, #302b63 50%, #24243e 100%)',
    fontFamily: '"Space Grotesk", "Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundOrb: {
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  loadingContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
  },
  loadingContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid rgba(167, 139, 250, 0.1)',
    borderTopColor: '#a78bfa',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#a78bfa',
    fontSize: '16px',
    fontWeight: '500',
  },
  successOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  successCard: {
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(24px)',
    padding: '48px',
    borderRadius: '24px',
    border: '1px solid rgba(52, 211, 153, 0.3)',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(52, 211, 153, 0.3)',
  },
  successIcon: {
    display: 'inline-flex',
    padding: '20px',
    background: 'rgba(52, 211, 153, 0.1)',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#34d399',
    margin: '0 0 12px 0',
  },
  successText: {
    fontSize: '16px',
    color: '#cbd5e1',
    margin: 0,
  },
  content: {
    maxWidth: '640px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    background: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderRadius: '32px',
    border: '1px solid rgba(167, 139, 250, 0.2)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
    padding: '48px 32px 32px',
  },
  headerIcon: {
    marginBottom: '24px',
    display: 'inline-flex',
    padding: '24px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(109, 40, 217, 0.15) 100%)',
    boxShadow: '0 0 40px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(167, 139, 250, 0.2)',
  },
  title: {
    fontSize: 'clamp(32px, 5vw, 42px)',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 12px 0',
    letterSpacing: '-0.02em',
    textShadow: '0 2px 10px rgba(139, 92, 246, 0.3)',
  },
  subtitle: {
    fontSize: 'clamp(15px, 2.5vw, 18px)',
    color: '#cbd5e1',
    marginBottom: '28px',
    lineHeight: '1.6',
    fontWeight: '400',
  },
  urlBadge: {
    display: 'inline-block',
    padding: '10px 24px',
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '100px',
    color: '#fca5a5',
    fontSize: 'clamp(13px, 2vw, 15px)',
    marginBottom: '28px',
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: '500',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  metricCard: {
    padding: '16px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  metricIcon: {
    display: 'flex',
  },
  metricValue: {
    fontSize: 'clamp(18px, 3vw, 22px)',
    fontWeight: '700',
    color: '#ffffff',
  },
  metricLabel: {
    fontSize: 'clamp(10px, 1.5vw, 11px)',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '600',
  },
  quoteCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(8px)',
    borderRadius: '20px',
    marginBottom: '24px',
    textAlign: 'left',
    borderLeft: '4px solid #fbbf24',
    border: '1px solid rgba(251, 191, 36, 0.15)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  quoteIcon: {
    marginTop: '2px',
    flexShrink: 0,
    display: 'flex',
  },
  quoteText: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#e2e8f0',
    fontStyle: 'italic',
    lineHeight: '1.7',
    margin: '0 0 12px 0',
    fontWeight: '400',
  },
  tipBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    background: 'rgba(96, 165, 250, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(96, 165, 250, 0.2)',
  },
  tipText: {
    fontSize: 'clamp(12px, 2vw, 13px)',
    color: '#93c5fd',
    fontWeight: '500',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '28px',
  },
  statCard: {
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(8px)',
    borderRadius: '20px',
    border: '1px solid rgba(139, 92, 246, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  statIconWrapper: {
    marginBottom: '12px',
    display: 'flex',
    padding: '12px',
    borderRadius: '50%',
    background: 'rgba(139, 92, 246, 0.1)',
  },
  statValue: {
    fontSize: 'clamp(28px, 5vw, 36px)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: '#e2e8f0',
    fontWeight: '600',
    marginBottom: '4px',
  },
  statSubtext: {
    fontSize: 'clamp(10px, 1.5vw, 11px)',
    color: '#64748b',
    fontWeight: '400',
  },
  nuclearSection: {
    padding: '28px',
    background: 'rgba(15, 23, 42, 0.5)',
    backdropFilter: 'blur(8px)',
    borderRadius: '20px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    marginBottom: '24px',
    textAlign: 'left',
    boxShadow: '0 8px 16px rgba(239, 68, 68, 0.1)',
  },
  nuclearHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  nuclearTitle: {
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#f87171',
  },
  attemptBadge: {
    fontSize: '11px',
    padding: '4px 10px',
    background: 'rgba(239, 68, 68, 0.15)',
    borderRadius: '12px',
    color: '#fca5a5',
    fontWeight: '500',
  },
  nuclearSubtext: {
    fontSize: 'clamp(13px, 2vw, 14px)',
    color: '#94a3b8',
    marginBottom: '18px',
    lineHeight: '1.6',
  },
  inputWrapper: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  unlockInput: {
    flex: '1 1 200px',
    minWidth: '0',
    padding: '14px 18px',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: 'clamp(14px, 2vw, 15px)',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: '"JetBrains Mono", monospace',
  },
  unlockButton: {
    padding: '0 32px',
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: 'clamp(14px, 2vw, 15px)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
    whiteSpace: 'nowrap',
  },
  errorMessage: {
    color: '#f87171',
    fontSize: 'clamp(13px, 2vw, 14px)',
    marginTop: '12px',
    padding: '10px 14px',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  warningMessage: {
    color: '#fbbf24',
    fontSize: 'clamp(12px, 2vw, 13px)',
    marginTop: '12px',
    padding: '10px 14px',
    background: 'rgba(251, 191, 36, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(251, 191, 36, 0.2)',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  closeButton: {
    width: '100%',
    padding: '16px',
    background: 'transparent',
    color: '#a78bfa',
    border: '1px solid rgba(167, 139, 250, 0.3)',
    borderRadius: '16px',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '20px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  copyright: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },
  divider: {
    color: '#475569',
    fontSize: '12px',
  },
  version: {
    fontSize: '12px',
    color: '#475569',
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: '500',
  },
};

export default BlockedPage;