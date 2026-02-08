import { BasePlugin } from '../type'

export function inc(): BasePlugin {
  return {
    name: 'inc',
    description: 'Reddit Inc',
    selectors: [
      '[href="https://redditinc.com"]:upward([aria-label="Reddit resources"] + div)',
    ],
  }
}
