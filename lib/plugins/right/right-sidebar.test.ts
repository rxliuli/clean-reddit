import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { querySelectorAll } from '@/lib/filters'
import { homeSidebar } from './home-sidebar'
import { communitySidebar } from './community-sidebar'
import { postSidebar } from './post-sidebar'
import { userSidebar } from './user-sidebar'
import { legalLinks } from './legal-links'
import homeHtml from './assets/right-sidebar-container-home.html?raw'
import communityHtml from './assets/right-sidebar-container-community.html?raw'
import postHtml from './assets/right-sidebar-container-post.html?raw'
import userHtml from './assets/right-sidebar-container-user.html?raw'

describe('right sidebar plugins', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  const query = (selector: string) =>
    querySelectorAll(container, selector)

  describe('home-sidebar', () => {
    const selector = homeSidebar().selectors![0]

    it('should match home page sidebar', () => {
      container.innerHTML = homeHtml
      const results = query(selector)
      expect(results.length).toBe(1)
      expect(results[0].id).toBe('right-sidebar-contents')
    })

    it('should not match community page sidebar', () => {
      container.innerHTML = communityHtml
      expect(query(selector).length).toBe(0)
    })

    it('should not match post page sidebar', () => {
      container.innerHTML = postHtml
      expect(query(selector).length).toBe(0)
    })

    it('should not match user page sidebar', () => {
      container.innerHTML = userHtml
      expect(query(selector).length).toBe(0)
    })
  })

  describe('community-sidebar', () => {
    const selector = communitySidebar().selectors![0]

    it('should match community page sidebar', () => {
      container.innerHTML = communityHtml
      const results = query(selector)
      expect(results.length).toBe(1)
      expect(results[0].id).toBe('right-sidebar-contents')
    })

    it('should not match home page sidebar', () => {
      container.innerHTML = homeHtml
      expect(query(selector).length).toBe(0)
    })

    it('should not match post page sidebar', () => {
      container.innerHTML = postHtml
      expect(query(selector).length).toBe(0)
    })

    it('should not match user page sidebar', () => {
      container.innerHTML = userHtml
      expect(query(selector).length).toBe(0)
    })
  })

  describe('post-sidebar', () => {
    const selector = postSidebar().selectors![0]

    it('should match post page sidebar', () => {
      container.innerHTML = postHtml
      const results = query(selector)
      expect(results.length).toBe(1)
      expect(results[0].id).toBe('right-sidebar-contents')
    })

    it('should not match home page sidebar', () => {
      container.innerHTML = homeHtml
      expect(query(selector).length).toBe(0)
    })

    it('should not match community page sidebar', () => {
      container.innerHTML = communityHtml
      expect(query(selector).length).toBe(0)
    })

    it('should not match user page sidebar', () => {
      container.innerHTML = userHtml
      expect(query(selector).length).toBe(0)
    })
  })

  describe('user-sidebar', () => {
    const selector = userSidebar().selectors![0]

    it('should match user page sidebar', () => {
      container.innerHTML = userHtml
      const results = query(selector)
      expect(results.length).toBe(1)
      expect(results[0].id).toBe('right-sidebar-contents')
    })

    it('should not match home page sidebar', () => {
      container.innerHTML = homeHtml
      expect(query(selector).length).toBe(0)
    })

    it('should not match community page sidebar', () => {
      container.innerHTML = communityHtml
      expect(query(selector).length).toBe(0)
    })

    it('should not match post page sidebar', () => {
      container.innerHTML = postHtml
      expect(query(selector).length).toBe(0)
    })
  })

  describe('legal-links', () => {
    const selector = legalLinks().selectors![0]

    it('should match legal links element', () => {
      container.innerHTML = '<div class="legal-links">Terms</div>'
      expect(container.querySelectorAll(selector).length).toBe(1)
    })

    it('should not match unrelated elements', () => {
      container.innerHTML = '<div class="other-links">Links</div>'
      expect(container.querySelectorAll(selector).length).toBe(0)
    })
  })
})
