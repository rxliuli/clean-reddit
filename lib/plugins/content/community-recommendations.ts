import { BasePlugin } from '../type'

export function communityRecommendations(): BasePlugin {
  return {
    name: 'community-recommendations',
    description: 'Related communities section in feed',
    selectors: ['in-feed-community-recommendations'],
  }
}
