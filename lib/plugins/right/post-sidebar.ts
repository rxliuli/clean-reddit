import { BasePlugin } from '../type'

export function postSidebar(): BasePlugin {
  return {
    name: 'post-sidebar',
    description: 'Post sidebar',
    selectors: [
      'shreddit-subreddit-header[is-pdp-route]:upward(#right-sidebar-contents)',
    ],
  }
}
