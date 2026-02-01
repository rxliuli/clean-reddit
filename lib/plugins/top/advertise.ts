import { BasePlugin } from '../type'

export function advertise(): BasePlugin {
  return {
    name: 'advertise',
    description: 'Advertise button',
    selectors: ['[data-part="advertise"]'],
  }
}
