import { BasePlugin } from '../type'

export function userSidebar(): BasePlugin {
  return {
    name: 'user-sidebar',
    description: 'User sidebar',
    selectors: [
      'aside[aria-label="Profile information"]:upward(#right-sidebar-contents)',
    ],
  }
}
