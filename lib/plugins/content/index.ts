import { recommendation } from './recommendation'
import { promoted } from './promoted'

export const contentPlugins = [
  recommendation(),
  promoted(),
]
