import { BasePlugin } from '../type'

export function home(): BasePlugin {
  return {
    name: 'home',
    description: 'Home button',
    selectors: ['#left-sidebar [selectedpagetype]', '#left-sidebar [selectedpagetype] + hr'],
  }
}
