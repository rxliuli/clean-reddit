import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { searchTrending } from './search-trending'
import html from './assets/search-dropdown-results-container.html?raw'

describe('search-trending', () => {
  const plugin = searchTrending()
  const selector = plugin.selectors![0]
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('should match trending title and items', () => {
    container.innerHTML = html
    const matches = container.querySelectorAll(selector)
    // should match trending title + 6 trending items
    expect(matches.length).toBeGreaterThanOrEqual(7)
  })

  it('should not match recent search items', () => {
    container.innerHTML = html
    const matches = container.querySelectorAll(selector)
    matches.forEach((el) => {
      // each match is either the trending title or a trending tracker, not a recent-search-item-container
      expect(el.closest('.recent-search-item-container')).toBeNull()
    })
  })
})
