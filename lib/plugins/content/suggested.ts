import { BasePlugin } from '../type'

export function suggestedForYou(): BasePlugin {
  return {
    name: 'suggested',
    description: 'Suggested for you',
    selectors: [
      // Suggested for you
      'article:has(shreddit-post[recommendation-source="user_post_cold_start_two_tower"])',
      'article:has(shreddit-post[recommendation-source="user_to_post"])',
      'article:has(shreddit-post[recommendation-source="dev_platform_top_games"])',
    ],
  }
}
