import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { communityRecommendations } from './community-recommendations'
import html from './assets/in-feed-community-recommendations.html?raw'

describe('community-recommendations', () => {
  const plugin = communityRecommendations()
  const selector = plugin.selectors![0]
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('should match in-feed community recommendations', () => {
    container.innerHTML = html
    expect(container.querySelectorAll(selector).length).toBeGreaterThanOrEqual(1)
  })

  it('should not match normal content', () => {
    container.innerHTML = '<div><community-recommendation>Test</community-recommendation></div>'
    expect(container.querySelectorAll(selector).length).toBe(0)
  })
})
