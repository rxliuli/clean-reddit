import { BasePlugin } from '../type'

export function searchTrending(): BasePlugin {
  return {
    name: 'search-trending',
    description: 'Trending searches in search dropdown',
    selectors: [
      '#search-dropdown-results-container [id$="trending_query"]',
      '#search-dropdown-results-container [id$="trending_query"] ~ li',
    ],
  }
}
