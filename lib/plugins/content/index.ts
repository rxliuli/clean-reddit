import { recommendation } from './recommendation'
import { promoted } from './promoted'
import { relatedAnswers } from './related-answers'

export const contentPlugins = [
  recommendation(),
  promoted(),
  relatedAnswers(),
]
