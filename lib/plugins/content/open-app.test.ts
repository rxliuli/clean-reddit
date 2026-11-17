import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { openApp } from './open-app'

describe('open-app', () => {
  const plugin = openApp()
  const selector = plugin.selectors![0]!
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('should match subreddit header card open app button', () => {
    container.innerHTML = `
      <subreddit-header-card>
        <div class="flex justify-between text-12">
          <span class="flex items-center">
            <a id="sticky-community-header-open-app-cta" class="button-small button-brand" href="https://reddit.onelink.me/MRHZ?deep_link_value=android" rel="nofollow">Open App</a>
          </span>
        </div>
      </subreddit-header-card>
    `
    expect(container.querySelectorAll(selector).length).toBe(1)
  })

  it('should not match unrelated links', () => {
    container.innerHTML = `
      <div>
        <a href="/r/chrome/">r/chrome</a>
        <a href="https://reddit.onelink.me/MRHZ">Install the app</a>
      </div>
    `
    expect(container.querySelectorAll(selector).length).toBe(0)
  })
})
