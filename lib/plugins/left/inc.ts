import { BasePlugin } from '../type'

export function inc(): BasePlugin {
  return {
    name: 'inc',
    description: 'Reddit Inc',
    selectors: [
      // 'nav>div:has(>[href="https://redditinc.com"])' // not working in query-selector-shadow-dom
      '[aria-label="Reddit resources"] + div:has([href="https://redditinc.com"])',
    ],
  }
}
