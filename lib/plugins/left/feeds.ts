import { BasePlugin } from '../type'

export function feeds(): BasePlugin {
  return {
    name: 'feeds',
    description: 'Feeds',
    selectors: [
      '[name^="CustomFeedCreateModal"]',
      '[name^="CustomFeedCreateModal"] + faceplate-expandable-section-helper',
      '[name^="CustomFeedCreateModal"] + faceplate-expandable-section-helper + hr',
    ],
  }
}
