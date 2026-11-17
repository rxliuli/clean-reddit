import type { BasePlugin } from '../type'

export function openApp(): BasePlugin {
  return {
    name: 'openApp',
    description: 'Open App button',
    selectors: [
      // Open App CTA lives in the subreddit header card on community post pages (id is unique per page)
      '#sticky-community-header-open-app-cta',
    ],
  }
}
