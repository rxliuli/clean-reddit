import { BasePlugin } from '../type'

export function visited(): BasePlugin {
  return {
    name: 'visited',
    description: 'Visited community posts',
    selectors: [
      // Because you've visited this community before
      'article:has(shreddit-post[recommendation-source="good_visits_on_subreddit"])',
    ],
  }
}
