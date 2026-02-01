import { BasePlugin } from '../type'

export function popular(): BasePlugin {
  // Popular near you
  return {
    name: 'popular',
    description: 'Popular near you',
    selectors: [
      // Popular in your country
      'article:has(shreddit-post[recommendation-source="geo_explore_subreddits"])',
      'article:has(shreddit-post[recommendation-source="geo_popular"])',
      // Popular in your country
      'article:has([recommendation-source="geo_good_visits_posts"])',
      // Popular on Reddit right now
      'article:has([recommendation-source="popular"])',
    ],
  }
}
