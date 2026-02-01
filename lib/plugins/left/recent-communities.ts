import { BasePlugin } from '../type'

export function recentCommunities(): BasePlugin {
  return {
    name: 'recent-communities',
    description: 'Recent Communities',
    selectors: ['reddit-recent-pages'],
  }
}
