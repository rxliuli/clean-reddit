import { BasePlugin } from '../type'

export function achievements(): BasePlugin {
  return {
    name: 'achievements',
    description: 'Achievements',
    selectors: [
      // desktop
      '#user-drawer-content faceplate-tracker:has([href^="/user/"][href$="/achievements"])',
      // mobile
      '#hui-user-drawer-bottom-sheet faceplate-tracker:has([href^="/user/"][href$="/achievements"])',
    ],
  }
}
