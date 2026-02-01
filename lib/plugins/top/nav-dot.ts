import { BasePlugin } from '../type'

export function navDot(): BasePlugin {
  return {
    name: 'nav-dot',
    description: 'Notification dot',
    selectors: ['[data-feature="devvit-left-nav-badge"]'],
  }
}
