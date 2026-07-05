import { BasePlugin } from '../type'

export function advertise(): BasePlugin {
  return {
    name: 'advertise',
    description: 'Advertise button (top nav)',
    selectors: ['[data-part="advertise"]'],
  }
}
