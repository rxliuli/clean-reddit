import { BasePlugin } from '../type'

export function premium(): BasePlugin {
  return {
    name: 'premium',
    description: 'Premium',
    selectors: [
      // desktop
      '#user-drawer-content [href="/premium"]:upward(faceplate-tracker)',
      // mobile
      '#hui-user-drawer-bottom-sheet [href="/premium"]:upward(faceplate-tracker)',
    ],
  }
}
