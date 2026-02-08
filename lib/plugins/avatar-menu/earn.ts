import { BasePlugin } from '../type'

export function earn(): BasePlugin {
  return {
    name: 'earn',
    description: 'Earn',
    selectors: [
      // desktop
      '#user-drawer-content [href="/earn"]:upward(faceplate-tracker)',
      // mobile
      '#hui-user-drawer-bottom-sheet [href="/earn"]:upward(faceplate-tracker)',
    ],
  }
}
