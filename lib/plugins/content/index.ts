import { recommendation } from './recommendation'
import { promoted } from './promoted'
import { relatedAnswers } from './related-answers'
import { xpromoBottomSheet } from './xpromo-bottom-sheet'
import { searchAnswers } from './search-answers'
import { communityRecommendations } from './community-recommendations'

export const contentPlugins = [
  recommendation(),
  promoted(),
  relatedAnswers(),
  xpromoBottomSheet(),
  searchAnswers(),
  communityRecommendations(),
]
