import { BasePlugin } from '../type'

export function communities(): BasePlugin {
  return {
    name: 'communities',
    description: 'Communities',
    selectors: [
      'faceplate-expandable-section-helper:has([noun="communities_menu"])',
      '[name^="CommunityCreationFlow"]',
      '[name^="CommunityCreationFlow"] + hr',
    ],
  }
}
