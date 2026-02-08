import { BasePlugin } from '../type'

export function communities(): BasePlugin {
  return {
    name: 'communities',
    description: 'Communities',
    selectors: [
      '[noun="communities_menu"]:upward(faceplate-expandable-section-helper)',
      '[name^="CommunityCreationFlow"]',
      '[name^="CommunityCreationFlow"] + hr',
    ],
  }
}
