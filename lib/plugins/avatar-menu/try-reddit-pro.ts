import { BasePlugin } from '../type'

export function tryRedditPro(): BasePlugin {
  return {
    name: 'try-reddit-pro',
    description: 'Try Reddit Pro',
    selectors: [
      // desktop
      '#user-drawer-content [href^="/reddit-pro"]:upward(faceplate-tracker)',
      '#user-drawer-content > hr:first-of-type',
      // mobile
      '#hui-user-drawer-bottom-sheet [href^="/reddit-pro"]:upward(faceplate-tracker)',
      '#hui-user-drawer-bottom-sheet > rpl-modal-card > hr:first-of-type',
    ],
  }
}
