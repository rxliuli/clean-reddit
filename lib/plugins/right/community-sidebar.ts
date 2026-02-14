import { BasePlugin } from '../type'

export function communitySidebar(): BasePlugin {
  return {
    name: 'community-sidebar',
    description: 'Community sidebar',
    selectors: [
      'shreddit-subreddit-header[router-name="subreddit"]:upward(#right-sidebar-contents)',
    ],
  }
}
