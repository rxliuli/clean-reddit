import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { searchTrending } from './search-trending'
import { searchTrendingCommunities } from './search-trending-communities'
import html from './assets/search-dropdown-results-container.html?raw'

describe('search-trending', () => {
  const plugin = searchTrending()
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    container.innerHTML = html
  })

  afterEach(() => {
    container.remove()
  })

  it('should match trending title and items', () => {
    const selector = plugin.selectors!.join(',')
    const matches = container.querySelectorAll(selector)
    // should match trending title + 6 trending items
    expect(matches.length).toBe(7)
  })

  it('should not match recent search items', () => {
    const selector = plugin.selectors!.join(',')
    const matches = container.querySelectorAll(selector)
    matches.forEach((el) => {
      expect(el.closest('.recent-search-item-container')).toBeNull()
    })
  })

  it('should not match trending communities', () => {
    const selector = plugin.selectors!.join(',')
    const matches = container.querySelectorAll(selector)
    matches.forEach((el) => {
      expect(el.closest('search-telemetry-tracker')).toBeNull()
    })
  })
})

describe('search-trending-communities', () => {
  const plugin = searchTrendingCommunities()
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    container.innerHTML = html
  })

  afterEach(() => {
    container.remove()
  })

  it('should match trending communities title and items', () => {
    const selector = plugin.selectors!.join(',')
    const matches = container.querySelectorAll(selector)
    // should match trending communities title + 5 community items
    expect(matches.length).toBe(6)
  })

  it('should not match trending searches', () => {
    const selector = plugin.selectors!.join(',')
    const matches = container.querySelectorAll(selector)
    matches.forEach((el) => {
      if (el.id === 'subreddit_typeahead_section') return
      expect(el.tagName.toLowerCase()).toBe('search-telemetry-tracker')
    })
  })
})
