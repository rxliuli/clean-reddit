import type { BasePlugin } from '../type'

export function searchAnswers(): BasePlugin {
  return {
    name: 'search-answers',
    description: 'Answers section in search results',
    selectors: [
      // The answers unit is the search-telemetry-tracker whose tracking context carries
      // search_answers; the old `data-testid="all-cta"` marker no longer exists on the SERP.
      'search-telemetry-tracker[data-faceplate-tracking-context*="search_answers"]',
      // The unit's CTA row is a plain sibling div immediately after that tracker
      'search-telemetry-tracker[data-faceplate-tracking-context*="search_answers"] + div',
    ],
  }
}
