import { BasePlugin } from '../type'

export function legalLinks(): BasePlugin {
  return {
    name: 'legal-links',
    description: 'Legal links',
    selectors: ['.legal-links'],
  }
}
