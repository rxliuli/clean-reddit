import { BasePlugin } from '../type'

export function achievements(): BasePlugin {
  return {
    name: 'achievements',
    description: 'Achievements',
    selectors: [
      // desktop
      '#user-drawer-content [href^="/user/"][href$="/achievements"]:upward(faceplate-tracker)',
      // mobile
      '#hui-user-drawer-bottom-sheet [href^="/user/"][href$="/achievements"]:upward(faceplate-tracker)',
    ],
  }
}
