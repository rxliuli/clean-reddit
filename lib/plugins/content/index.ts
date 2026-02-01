import { suggestedForYou } from './suggested'
import { popular } from './popular'
import { interest } from './interest'
import { visited } from './visited'

export const contentPlugins = [
  suggestedForYou(),
  popular(),
  interest(),
  visited(),
]
