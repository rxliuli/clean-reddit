import { BasePlugin } from '../type'

export function recommendation(): BasePlugin {
  return {
    name: 'recommendation',
    description: 'Hide recommended posts',
    selectors: [
      'article:has(shreddit-post[recommendation-source])',
      'article:has(shreddit-post[recommendation-source]) + hr',
    ],
  }
}
