import { BasePlugin } from '../type'

export function rightSidebarContents(): BasePlugin {
  return {
    name: 'right-sidebar-contents',
    description: 'Right sidebar',
    selectors: ['#right-sidebar-contents', '.legal-links'],
  }
}
