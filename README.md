# Clean Reddit

A browser extension that removes clutter and distractions from Reddit, giving you a cleaner browsing experience.

## Features

Clean Reddit allows you to hide various UI elements across different sections of Reddit:

### Left Sidebar

- **Home button** - Hide the home navigation button
- **Games on Reddit** - Hide the games section
- **Feeds** - Hide custom feeds
- **Recent Communities** - Hide recently visited communities
- **Communities** - Hide the communities section
- **Resources** - Hide Reddit resources links
- **Reddit Inc** - Hide Reddit Inc footer links

### Right Sidebar

- **Right sidebar** - Hide the entire right sidebar and legal links

### Top Navigation

- **Notification dot** - Hide the notification badge
- **Leading icon** - Hide the leading icon
- **Ask AI** - Hide the Ask AI banner in search
- **Advertise button** - Hide the advertise button

### Content Feed

- **recommended posts** - Hide all recommended posts (popular, suggested, interest-based, etc.)
- **promoted posts** - Hide promoted/sponsored posts and ads
- **related answers** - Hide the Related Answers section

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
