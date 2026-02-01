import { BasePlugin } from '../type'

export function premium(): BasePlugin {
  return {
    name: 'premium',
    description: 'Premium',
    selectors: [
      // desktop
      '#user-drawer-content faceplate-tracker:has([href="/premium"])',
      // mobile
      '#hui-user-drawer-bottom-sheet faceplate-tracker:has([href="/premium"])',
    ],
  }
}
