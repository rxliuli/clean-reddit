# Clean Reddit

A browser extension that removes clutter and distractions from Reddit, giving you a cleaner browsing experience.

## Features

Clean Reddit allows you to hide various UI elements across different sections of Reddit:

### Left Sidebar

- **Home button** - Hide the home navigation button
- **Games on Reddit** - Hide the games section
- **Moderation** - Hide the moderation section
- **Feeds** - Hide custom feeds
- **Recent Communities** - Hide recently visited communities
- **Communities** - Hide the communities section
- **Resources** - Hide Reddit resources links
- **Reddit Inc** - Hide Reddit Inc footer links

### Right Sidebar

- **Home sidebar** - Hide the right sidebar on the homepage (Recent Posts)
- **Community sidebar** - Hide the right sidebar on community pages
- **Post sidebar** - Hide the right sidebar on post pages
- **User sidebar** - Hide the right sidebar on user profile pages
- **Legal links** - Hide the legal links at the bottom of the sidebar

### Top Navigation

- **Notification dot** - Hide the notification badge
- **Leading icon** - Hide the leading icon
- **Ask AI** - Hide the Ask AI banner in search
- **Advertise button** - Hide the advertise button
- **Trending searches** - Hide trending searches in the search dropdown

### Content Feed

- **Recommended posts** - Hide all recommended posts (popular, suggested, interest-based, etc.)
- **Promoted posts** - Hide promoted/sponsored posts and ads
- **Related Answers** - Hide the Related Answers section
- **App promotion bottom sheet** - Hide the app promotion bottom sheet and restore scrolling
- **Search Answers** - Hide the Answers section in search results
- **Community Recommendations** - Hide related communities section in feed

### Avatar Menu

- **Achievements** - Hide achievements link
- **Earn** - Hide earn link
- **Premium** - Hide premium link
- **Advertise on Reddit** - Hide advertise link
- **Try Reddit Pro** - Hide Reddit Pro link

## Installation

### Chrome / Edge

Install from the [Chrome Web Store](https://chromewebstore.google.com/detail/clean-reddit/lchnofghcmjcpcglhklofjpfddkcenof).

### Firefox

Install from [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/clean-reddit/).

### Safari

Install from the [Mac App Store](https://apps.apple.com/app/id6758573459).

## Usage

1. Click the extension icon in your browser toolbar
2. Toggle the switches to hide/show different UI elements
3. Changes take effect immediately

## Development

### Prerequisites

- Node.js (latest LTS recommended)
- pnpm package manager

### Start Development Server

```sh
pnpm install
pnpm dev
```

After running the development server:

1. Navigate to the `.output/chrome-mv3-dev` directory
2. Open `chrome://extensions` in Chrome
3. Enable "Developer mode"
4. Click "Load unpacked" and select the output directory

### Build

```sh
# Chrome/Edge
pnpm zip

# Firefox
pnpm zip:firefox

# Safari (macOS only)
pnpm build:safari
```

## Community

Join our [Discord](https://discord.gg/Cwre8EwkNX) for support and discussions.

## License

GPL-3.0 License © 2026 rxliuli
