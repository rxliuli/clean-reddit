import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { searchAnswers } from './search-answers'
import html from './assets/search-answers-serp.html?raw'

describe('search-answers', () => {
  const plugin = searchAnswers()
  const unitSelector = plugin.selectors![0]!
  const ctaRowSelector = plugin.selectors![1]!
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('should match the answers unit', () => {
    container.innerHTML = html
    expect(container.querySelectorAll(unitSelector).length).toBeGreaterThanOrEqual(1)
  })

  it('should match the cta row next to the answers unit', () => {
    container.innerHTML = html
    const ctaRow = document.createElement('div')
    ctaRow.className = 'cta-row'
    container.appendChild(ctaRow)

    const matches = container.querySelectorAll(ctaRowSelector)
    expect(matches.length).toBeGreaterThanOrEqual(1)
    expect(Array.from(matches)).toContain(ctaRow)
  })

  it('should not match other search telemetry trackers', () => {
    container.innerHTML = `
      <search-telemetry-tracker data-faceplate-tracking-context='{"action_info":{"type":"link"}}'>
        <a href="/r/test">Test</a>
      </search-telemetry-tracker>
      <div class="search-result">Normal result</div>
    `
    for (const selector of plugin.selectors!) {
      expect(container.querySelectorAll(selector).length, `selector "${selector}" should not match`).toBe(0)
    }
  })
})
