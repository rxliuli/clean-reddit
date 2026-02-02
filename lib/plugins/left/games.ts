import { BasePlugin } from '../type'

// GAMES ON REDDIT
export function games(): BasePlugin {
  return {
    name: 'games',
    description: 'Games on Reddit',
    selectors: ['[noun="games_drawer"]', '[noun="games_drawer"] + hr'],
  }
}
