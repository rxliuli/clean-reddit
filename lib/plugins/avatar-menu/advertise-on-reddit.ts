import { BasePlugin } from '../type'

export function advertiseOnReddit(): BasePlugin {
  return {
    name: 'advertise-on-reddit',
    description: 'Advertise on Reddit',
    selectors: [
      // desktop
      '#user-drawer-content [href^="https://ads.reddit.com/register"]:upward(faceplate-tracker)',
      '#user-drawer-content > hr:first-of-type',
      // mobile
      '#hui-user-drawer-bottom-sheet [href^="https://ads.reddit.com/register"]:upward(faceplate-tracker)',
      '#hui-user-drawer-bottom-sheet > rpl-modal-card > hr:first-of-type',
    ],
  }
}
