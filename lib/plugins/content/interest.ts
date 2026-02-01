import { BasePlugin } from '../type'

export function interest(): BasePlugin {
  return {
    name: 'interest',
    description: 'Interest-based recommendations',
    selectors: [
      // Because you've shown interest in a similar topic
      'article:has(shreddit-post[recommendation-source="onboarding_signals_similar_taxonomy_topics"])',
      'article:has(shreddit-post[recommendation-source="dev_platform"])',
      'article:has(shreddit-post[recommendation-source="onboarding_signals_similar_subreddits"])',
      // Because you've shown interest in this community
      'article:has([recommendation-source="responsiveallfpr"])',
      // Because you've shown interest in a similar community
      'article:has([recommendation-source="responsivesimilar"])',
    ],
  }
}
