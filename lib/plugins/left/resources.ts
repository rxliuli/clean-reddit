import { BasePlugin } from '../type'

export function resources(): BasePlugin {
  return {
    name: 'resources',
    description: 'Resources',
    selectors: ['nav[aria-label="Reddit resources"]'],
  }
}
