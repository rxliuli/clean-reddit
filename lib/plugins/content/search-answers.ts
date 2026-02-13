import { BasePlugin } from '../type'

export function searchAnswers(): BasePlugin {
  return {
    name: 'search-answers',
    description: 'Answers section in search results',
    selectors: [
      'search-telemetry-tracker[data-faceplate-tracking-context*="search_answers"]:has([data-testid="all-cta"][href^="/answers/"])',
      'search-telemetry-tracker[data-faceplate-tracking-context*="search_answers"]:has([data-testid="all-cta"][href^="/answers/"]) + hr',
    ],
  }
}
