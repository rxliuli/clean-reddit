import { BasePlugin } from '../type'

export function advertiseOnReddit(): BasePlugin {
  return {
    name: 'advertise-on-reddit',
    description: 'Advertise on Reddit',
    selectors: [
      // desktop
      '#user-drawer-content faceplate-tracker:has([href^="https://ads.reddit.com/register"])',
      '#user-drawer-content > hr:first-of-type',
      // mobile
      '#hui-user-drawer-bottom-sheet faceplate-tracker:has([href^="https://ads.reddit.com/register"])',
      '#hui-user-drawer-bottom-sheet > rpl-modal-card > hr:first-of-type',
    ],
  }
}
