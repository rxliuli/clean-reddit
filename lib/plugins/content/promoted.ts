import { BasePlugin } from '../type'

export function promoted(): BasePlugin {
  return {
    name: 'promoted',
    description: 'Hide promoted/sponsored posts',
    selectors: [
      // Promoted posts use the dedicated shreddit-ad-post tag (vs shreddit-post for normal posts)
      'shreddit-ad-post',
      // Promoted comments use the shreddit-comments-page-ad tag
      'shreddit-comments-page-ad',
    ],
  }
}
