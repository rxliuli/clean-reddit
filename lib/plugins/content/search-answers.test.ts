import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { searchAnswers } from './search-answers'
import streamingHtml from './assets/search-answers.html?raw'
import cachedHtml from './assets/search-answers-2.html?raw'

describe('search-answers', () => {
  const plugin = searchAnswers()
  const mainSelector = plugin.selectors![0]
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('should match streaming variant', () => {
    container.innerHTML = streamingHtml
    expect(container.querySelectorAll(mainSelector).length).toBeGreaterThanOrEqual(1)
  })

  it('should match cached variant', () => {
    container.innerHTML = cachedHtml
    expect(container.querySelectorAll(mainSelector).length).toBeGreaterThanOrEqual(1)
  })

  it('should match hr after answers block', () => {
    container.innerHTML = streamingHtml + '<hr>'
    const hrSelector = plugin.selectors![1]
    expect(container.querySelectorAll(hrSelector).length).toBe(1)
  })

  it('should not match normal content', () => {
    container.innerHTML = '<div><search-telemetry-tracker><a href="/r/test">Test</a></search-telemetry-tracker></div>'
    for (const selector of plugin.selectors!) {
      expect(container.querySelectorAll(selector).length, `selector "${selector}" should not match`).toBe(0)
    }
  })
})
