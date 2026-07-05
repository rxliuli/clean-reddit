import { BasePlugin } from '../type'

export function searchTrendingCommunities(): BasePlugin {
  return {
    name: 'search-trending-communities',
    description: 'Trending communities in search dropdown',
    selectors: [
      '#search-dropdown-results-container #subreddit_typeahead_section',
      '#search-dropdown-results-container #subreddit_typeahead_section ~ search-telemetry-tracker',
    ],
  }
}
