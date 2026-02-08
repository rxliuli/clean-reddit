import { BasePlugin } from '../type'

export function recommendation(): BasePlugin {
  return {
    name: 'recommendation',
    description: 'Hide recommended posts',
    selectors: [
      'shreddit-post[recommendation-source]:upward(article)',
      'article:has(shreddit-post[recommendation-source]) + hr',
    ],
  }
}
