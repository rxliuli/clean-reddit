import { recommendation } from './recommendation'
import { promoted } from './promoted'
import { relatedAnswers } from './related-answers'
import { xpromoBottomSheet } from './xpromo-bottom-sheet'

export const contentPlugins = [
  recommendation(),
  promoted(),
  relatedAnswers(),
  xpromoBottomSheet(),
]
