import { BasePlugin } from '../type'

export function earn(): BasePlugin {
  return {
    name: 'earn',
    description: 'Earn',
    selectors: [
      // desktop
      '#user-drawer-content faceplate-tracker:has([href="/earn"])',
      // mobile
      '#hui-user-drawer-bottom-sheet faceplate-tracker:has([href="/earn"])',
    ],
  }
}
