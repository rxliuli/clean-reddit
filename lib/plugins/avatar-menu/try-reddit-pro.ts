import { BasePlugin } from '../type'

export function tryRedditPro(): BasePlugin {
  return {
    name: 'try-reddit-pro',
    description: 'Try Reddit Pro',
    selectors: [
      // desktop
      '#user-drawer-content faceplate-tracker:has([href^="/reddit-pro"])',
      '#user-drawer-content > hr:first-of-type',
      // mobile
      '#hui-user-drawer-bottom-sheet faceplate-tracker:has([href^="/reddit-pro"])',
      '#hui-user-drawer-bottom-sheet > rpl-modal-card > hr:first-of-type',
    ],
  }
}
