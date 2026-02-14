import { BasePlugin } from '../type'

export function homeSidebar(): BasePlugin {
  return {
    name: 'home-sidebar',
    description: 'Home sidebar',
    selectors: [
      'recent-posts:upward(#right-sidebar-contents)',
    ],
  }
}
