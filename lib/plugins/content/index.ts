import { suggestedForYou } from './suggested'
import { popular } from './popular'
import { interest } from './interest'
import { visited } from './visited'
import { promoted } from './promoted'

export const contentPlugins = [
  suggestedForYou(),
  popular(),
  interest(),
  visited(),
  promoted(),
]
