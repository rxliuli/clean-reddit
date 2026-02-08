import { BasePlugin } from '../type'

export function askAI(): BasePlugin {
  return {
    name: 'ask-ai',
    description: 'Ask AI',
    selectors: [
      // Ask AI banner on desktop search input
      'hr.trailing-divider',
      '.trailing-content-container',
      // Ask AI banner on mobile banner
      '[href="/answers/"]:upward(faceplate-tracker)',
    ],
  }
}
