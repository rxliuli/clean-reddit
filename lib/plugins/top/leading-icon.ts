import { BasePlugin } from '../type'

export function leadingIcon(): BasePlugin {
  return {
    name: 'leading-icon',
    description: 'Leading icon',
    selectors: ['.leadingIcon'],
  }
}
