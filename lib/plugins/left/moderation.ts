import { BasePlugin } from '../type'

export function moderation(): BasePlugin {
  return {
    name: 'moderation',
    description: 'Moderation',
    selectors: [
      '[noun="moderation_menu"]:upward(faceplate-expandable-section-helper)',
      'faceplate-expandable-section-helper:has([noun="moderation_menu"]) + hr',
    ],
  }
}
