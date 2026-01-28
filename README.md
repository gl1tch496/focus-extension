# 🎯 FlowState Focus Extension

<div align="center">

![FlowState Banner](https://img.shields.io/badge/FlowState-Focus%20Manager-8b5cf6?style=for-the-badge&logo=react&logoColor=white)

**A professional Chrome extension for elite productivity and distraction management**

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](https://github.com/gl1tch496/focus-extension)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0-purple?style=flat-square)](https://github.com/gl1tch496/focus-extension/releases)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**FlowState** is a next-generation Chrome extension designed to help you achieve peak productivity by intelligently blocking distracting websites and managing your focus sessions. Built with React and modern web technologies, it features a stunning UI, comprehensive analytics, and powerful customization options.

### 🎨 Design Philosophy

- **Elite aesthetics** with deep cosmos theme
- **Professional animations** powered by GSAP
- **Data visualization** with Recharts
- **Responsive design** that adapts to your workflow

---

## ✨ Features

### 🛡️ **Intelligent Blocking**
- **Smart site blocking** with customizable blocklist
- **Granular whitelisting** for essential sites
- **YouTube channel whitelist** - Allow specific educational channels
- **Reddit subreddit whitelist** - Access productive communities only
- **Schedule-based blocking** - Active hours configuration
- **Weekday-only mode** - Weekend flexibility

### ⏱️ **Pomodoro Timer**
- **Customizable work/break durations**
- **Session tracking** with completion counter
- **Circular progress visualization**
- **Browser notifications** for session transitions
- **Automatic session switching**

### 📊 **Advanced Analytics**
- **Multiple chart views** (Overview/Detailed/Trends)
- **Real-time KPI dashboard** with focus score
- **Weekly activity tracking**
- **Distraction distribution analysis**
- **Time saved calculations**
- **Daily streak monitoring**

### 🚨 **Emergency Override**
- **Nuclear phrase protection** - Complex passphrase system
- **Attempt tracking** - Monitor override attempts
- **Temporary whitelisting** - Quick access when needed
- **Progressive warnings** - Deterrent messaging

### 🎯 **Professional UI**
- **Beautiful blocked page** with motivational quotes
- **Animated popup interface** with real-time stats
- **Comprehensive options panel** with GSAP animations
- **Dark theme** with ambient gradients
- **Responsive design** for all screen sizes

---

## 🚀 Installation

### From Source (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/gl1tch496/focus-extension.git
   cd focus-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `build` directory from the project

### From Chrome Web Store
*(Coming soon)*

---

## 📱 Usage

### Getting Started

1. **Initial Setup**
   - Click the FlowState icon in your toolbar
   - Configure your blocked sites in Options
   - Set your nuclear phrase for emergency override
   - Customize your schedule and Pomodoro settings

2. **Basic Operations**
   - Toggle focus mode on/off from the popup
   - Start Pomodoro sessions with one click
   - View real-time statistics and analytics
   - Access settings via the gear icon

### Configuration Options

#### **Distraction Blocking**
```
Options > Distraction Blocking
- Add sites to block (e.g., facebook.com)
- Remove sites with trash icon
- Blocks take effect immediately
```

#### **Whitelist Management**
```
Options > Essential Whitelist
- Add always-accessible sites
- Whitelist persists even in Nuclear mode
- Perfect for work-related sites
```

#### **YouTube Channel Whitelist**
```
Options > YouTube Channel Whitelist
- Add channel IDs (e.g., UCX6OQ3DkcsbYNE6H8uQQuVA)
- Access educational content while blocking YouTube
- Supports both /channel/ and /@handle formats
```

#### **Reddit Subreddit Whitelist**
```
Options > Reddit Subreddit Whitelist
- Add subreddit names (e.g., programming)
- Block Reddit except productive communities
- Great for professional development
```

#### **Schedule Configuration**
```
Options > Active Hours
- Set start/end hours (24-hour format)
- Enable weekdays-only mode
- Automatic activation/deactivation
```

#### **Pomodoro Settings**
```
Options > Pomodoro Configuration
- Set work duration (1-60 minutes)
- Set break duration (1-30 minutes)
- Customize to your workflow
```

---

## 📸 Screenshots

### Popup Interface
<img src="docs/screenshots/popup.png" alt="Popup Interface" width="600"/>

*Real-time stats, focus toggle, and Pomodoro timer*

### Options Dashboard
<img src="docs/screenshots/options.png" alt="Options Dashboard" width="800"/>

*Comprehensive settings with professional charts*

### Blocked Page
<img src="docs/screenshots/blocked.png" alt="Blocked Page" width="800"/>

*Motivational blocking page with statistics*

### Analytics View
<img src="docs/screenshots/analytics.png" alt="Analytics" width="800"/>

*Detailed productivity insights and trends*

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.x
- **Animation Library**: GSAP 3.x
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: Chrome Storage API
- **Manifest**: Chrome Extension Manifest V3

---

## 📂 Project Structure

```
focus-extension/
├── src/
│   ├── components/
│   │   ├── Options.jsx          # Main options page
│   │   ├── Popup.jsx            # Extension popup
│   │   └── BlockedPage.jsx      # Site blocking page
│   ├── utils/
│   │   ├── storage.js           # Storage utilities
│   │   ├── blocker.js           # Blocking logic
│   │   └── timer.js             # Pomodoro timer
│   ├── background/
│   │   └── service-worker.js    # Background processes
│   └── manifest.json            # Extension manifest
├── public/
│   ├── icons/                   # Extension icons
│   └── blocked.html             # Blocked page HTML
├── docs/
│   └── screenshots/             # Documentation images
└── README.md
```

---

## 🔧 Development

### Prerequisites
- Node.js 16+ and npm
- Chrome browser
- Basic knowledge of React and Chrome Extensions

### Setup Development Environment

```bash
# Install dependencies
npm install

# Run development build with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Building From Source

```bash
# Clone repository
git clone https://github.com/gl1tch496/focus-extension.git
cd focus-extension

# Install dependencies
npm install

# Create production build
npm run build

# The extension will be in the 'build' directory
```

---

## 🎯 Roadmap

### Version 2.1 (Planned)
- [ ] Browser sync across devices
- [ ] Custom blocking schedules per site
- [ ] Focus session templates
- [ ] Export/import settings
- [ ] Advanced statistics filters

### Version 2.2 (Planned)
- [ ] AI-powered distraction detection
- [ ] Team/family sharing features
- [ ] Mobile companion app
- [ ] Slack/Discord integrations
- [ ] Focus leaderboards

### Future Ideas
- [ ] Browser extension for Firefox/Edge
- [ ] Desktop application (Electron)
- [ ] Machine learning for habit prediction
- [ ] Gamification with achievements
- [ ] Social accountability features

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Gl1tch Goat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Design Inspiration**: Modern productivity tools and focus apps
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Font**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)

---

## 📧 Contact & Support

- **GitHub**: [@gl1tch496](https://github.com/gl1tch496)
- **Repository**: [focus-extension](https://github.com/gl1tch496/focus-extension)
- **Issues**: [Report a bug](https://github.com/gl1tch496/focus-extension/issues)
- **Discussions**: [Community forum](https://github.com/gl1tch496/focus-extension/discussions)

---

## ⭐ Star History

If you find FlowState useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=gl1tch496/focus-extension&type=Date)](https://star-history.com/#gl1tch496/focus-extension&Date)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/gl1tch496/focus-extension?style=social)
![GitHub forks](https://img.shields.io/github/forks/gl1tch496/focus-extension?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/gl1tch496/focus-extension?style=social)

![GitHub issues](https://img.shields.io/github/issues/gl1tch496/focus-extension)
![GitHub pull requests](https://img.shields.io/github/issues-pr/gl1tch496/focus-extension)
![GitHub last commit](https://img.shields.io/github/last-commit/gl1tch496/focus-extension)

---

<div align="center">

**Made with 💜 by Gl1tch Goat**

© 2024 Gl1tch Goat. All rights reserved.

[⬆ Back to Top](#-flowstate-focus-extension)

</div>