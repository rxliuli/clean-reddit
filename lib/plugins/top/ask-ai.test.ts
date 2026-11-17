import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { parse } from 'css-what'
import { askAI } from './ask-ai'
import { matches } from '../../filters/matches'
import composerHtml from './assets/search-expanded-composer-ask.html?raw'
import searchInputHtml from './assets/faceplate-search-input.html?raw'

describe('ask-ai', () => {
  const plugin = askAI()
  const trailingDividerSelector = plugin.selectors![0]!
  const trailingContentSelector = plugin.selectors![1]!
  const askPillSelector = plugin.selectors![2]!
  const answersLinkSelector = plugin.selectors![3]!
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('should match trailing divider in search input', () => {
    // The real markup lives inside faceplate-search-input's shadow root, so no serialized fixture can contain it.
    container.innerHTML = '<hr class="trailing-divider">'
    expect(container.querySelectorAll(trailingDividerSelector).length).toBe(1)
  })

  it('should match trailing content container in search input', () => {
    // Same shadow-root caveat as the trailing divider above.
    container.innerHTML = '<div class="trailing-content-container"></div>'
    expect(container.querySelectorAll(trailingContentSelector).length).toBe(1)
  })

  it('should match ask pill in expanded search composer', () => {
    container.innerHTML = composerHtml
    expect(container.querySelectorAll(askPillSelector).length).toBe(1)
  })

  it('should not match submit button next to ask pill', () => {
    container.innerHTML = composerHtml
    const submitButton = container.querySelector('button[disabled]')
    expect(submitButton).not.toBeNull()
    expect(submitButton!.matches(askPillSelector)).toBe(false)
  })

  it('should match answers link through faceplate-tracker', () => {
    container.innerHTML = searchInputHtml
    const answersLink = container.querySelector('a[href="/answers/"]')!
    expect(answersLink).not.toBeNull()
    // :upward() is not a native CSS selector, so this selector is exercised through the
    // project's own matcher (lib/filters/matches.ts) instead of querySelectorAll.
    const matched = matches(answersLink, parse(answersLinkSelector))
    expect(matched?.localName).toBe('faceplate-tracker')
  })

  it('should not match unrelated markup', () => {
    container.innerHTML = '<button>Submit</button><hr class="divider"><a href="/answers/">Ask</a>'
    for (const selector of plugin.selectors!) {
      const ast = parse(selector)
      const matched = Array.from(container.querySelectorAll('*')).filter((el) => matches(el, ast))
      expect(matched.length, `selector "${selector}" should not match`).toBe(0)
    }
  })
})
