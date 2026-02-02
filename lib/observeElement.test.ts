import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { observeElements } from './observeElement'

describe('observeElements', () => {
  let container: HTMLElement
  let cleanup: (() => void) | null = null

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    cleanup?.()
    cleanup = null
    container.remove()
  })

  // Wait for MutationObserver + requestAnimationFrame to process
  const waitForObserver = () =>
    new Promise<void>((resolve) => {
      // First wait for microtask (MutationObserver)
      queueMicrotask(() => {
        // Then wait for RAF
        requestAnimationFrame(() => {
          // One more RAF to be safe
          requestAnimationFrame(() => resolve())
        })
      })
    })

  describe('simple selectors', () => {
    it('should match elements on initial scan', () => {
      container.innerHTML = '<div class="target">content</div>'

      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '.target',
        onElements,
        root: container,
      })

      expect(onElements).toHaveBeenCalledTimes(1)
      expect(onElements).toHaveBeenCalledWith([
        container.querySelector('.target'),
      ])
    })

    it('should match dynamically added elements', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '.target',
        onElements,
        root: container,
      })

      const newEl = document.createElement('div')
      newEl.className = 'target'
      container.appendChild(newEl)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([newEl])
    })

    it('should not process the same element twice', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '.target',
        onElements,
        root: container,
      })

      const newEl = document.createElement('div')
      newEl.className = 'target'
      container.appendChild(newEl)

      await waitForObserver()

      // Remove and re-add the same element
      container.removeChild(newEl)
      container.appendChild(newEl)

      await waitForObserver()

      // Should only be called once for this element
      expect(onElements).toHaveBeenCalledTimes(1)
    })
  })

  describe('ancestor context selectors (descendant combinator)', () => {
    it('should match "#parent .child" when child is added', async () => {
      container.innerHTML = '<div id="parent"></div>'
      const parent = container.querySelector('#parent')!

      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '#parent .child',
        onElements,
        root: container,
      })

      const child = document.createElement('span')
      child.className = 'child'
      parent.appendChild(child)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([child])
    })

    it('should match "#parent .child" when parent with child is added', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '#parent .child',
        onElements,
        root: container,
      })

      const parent = document.createElement('div')
      parent.id = 'parent'
      parent.innerHTML = '<span class="child">content</span>'
      container.appendChild(parent)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([parent.querySelector('.child')])
    })

    it('should match "#left-sidebar [selectedpagetype]" (real plugin case)', async () => {
      container.innerHTML = '<div id="left-sidebar"></div>'
      const sidebar = container.querySelector('#left-sidebar')!

      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '#left-sidebar [selectedpagetype]',
        onElements,
        root: container,
      })

      const item = document.createElement('div')
      item.setAttribute('selectedpagetype', 'home')
      sidebar.appendChild(item)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([item])
    })
  })

  describe('child combinator (>)', () => {
    it('should match "#parent > .child" for direct children only', async () => {
      container.innerHTML = '<div id="parent"></div>'
      const parent = container.querySelector('#parent')!

      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '#parent > .child',
        onElements,
        root: container,
      })

      // Add direct child
      const directChild = document.createElement('div')
      directChild.className = 'child'
      parent.appendChild(directChild)

      // Add nested child (should NOT match)
      const wrapper = document.createElement('div')
      const nestedChild = document.createElement('div')
      nestedChild.className = 'child'
      wrapper.appendChild(nestedChild)
      parent.appendChild(wrapper)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([directChild])
    })

    it('should match "#user-drawer-content > hr:first-of-type"', async () => {
      container.innerHTML = '<div id="user-drawer-content"></div>'
      const drawer = container.querySelector('#user-drawer-content')!

      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '#user-drawer-content > hr:first-of-type',
        onElements,
        root: container,
      })

      const hr1 = document.createElement('hr')
      const hr2 = document.createElement('hr')
      drawer.appendChild(hr1)
      drawer.appendChild(hr2)

      await waitForObserver()

      // Only first hr should match
      expect(onElements).toHaveBeenCalledWith([hr1])
    })
  })

  describe('sibling combinators', () => {
    it('should match "#parent [attr] + hr" (adjacent sibling with ancestor)', async () => {
      container.innerHTML = '<div id="left-sidebar"></div>'
      const sidebar = container.querySelector('#left-sidebar')!

      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '#left-sidebar [selectedpagetype] + hr',
        onElements,
        root: container,
      })

      const item = document.createElement('div')
      item.setAttribute('selectedpagetype', 'home')
      const hr = document.createElement('hr')

      sidebar.appendChild(item)
      sidebar.appendChild(hr)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([hr])
    })

    it('should match "[attr] + hr" (adjacent sibling without ancestor - games case)', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '[noun="games_drawer"] + hr',
        onElements,
        root: container,
      })

      const tracker = document.createElement('faceplate-tracker')
      tracker.setAttribute('noun', 'games_drawer')
      const hr = document.createElement('hr')

      container.appendChild(tracker)
      container.appendChild(hr)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([hr])
    })

    it('should match "[attr] ~ hr" (general sibling)', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '[noun="test"] ~ hr',
        onElements,
        root: container,
      })

      const item = document.createElement('div')
      item.setAttribute('noun', 'test')
      const spacer = document.createElement('div')
      const hr = document.createElement('hr')

      container.appendChild(item)
      container.appendChild(spacer)
      container.appendChild(hr)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([hr])
    })
  })

  describe(':has() pseudo-class', () => {
    it('should match selector with :has() - avatar menu case', async () => {
      container.innerHTML = '<div id="user-drawer-content"></div>'
      const drawer = container.querySelector('#user-drawer-content')!

      const onElements = vi.fn()
      cleanup = observeElements({
        selector:
          '#user-drawer-content faceplate-tracker:has([href^="/user/"][href$="/achievements"])',
        onElements,
        root: container,
      })

      const tracker = document.createElement('faceplate-tracker')
      const link = document.createElement('a')
      link.href = '/user/testuser/achievements'
      tracker.appendChild(link)
      drawer.appendChild(tracker)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([tracker])
    })

    it('should NOT match :has() selector when condition is not met', async () => {
      container.innerHTML = '<div id="user-drawer-content"></div>'
      const drawer = container.querySelector('#user-drawer-content')!

      const onElements = vi.fn()
      cleanup = observeElements({
        selector:
          '#user-drawer-content faceplate-tracker:has([href$="/achievements"])',
        onElements,
        root: container,
      })

      const tracker = document.createElement('faceplate-tracker')
      const link = document.createElement('a')
      link.href = '/user/testuser/settings' // Not achievements
      tracker.appendChild(link)
      drawer.appendChild(tracker)

      await waitForObserver()

      // Should not be called because :has() condition is not met
      expect(onElements).not.toHaveBeenCalled()
    })
  })

  describe('multiple selectors (comma-separated)', () => {
    it('should match multiple selectors', async () => {
      container.innerHTML = '<div id="left-sidebar"></div>'
      const sidebar = container.querySelector('#left-sidebar')!

      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '#left-sidebar [selectedpagetype], #left-sidebar .other',
        onElements,
        root: container,
      })

      const item1 = document.createElement('div')
      item1.setAttribute('selectedpagetype', 'home')
      const item2 = document.createElement('div')
      item2.className = 'other'

      sidebar.appendChild(item1)
      sidebar.appendChild(item2)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith(
        expect.arrayContaining([item1, item2]),
      )
    })
  })

  describe('simple selectors without ancestor context', () => {
    it('should match "article:has(...)" - no ancestor context', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: 'article:has(.sponsored)',
        onElements,
        root: container,
      })

      const article = document.createElement('article')
      const sponsored = document.createElement('div')
      sponsored.className = 'sponsored'
      article.appendChild(sponsored)
      container.appendChild(article)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith([article])
    })

    it('should match elements within added subtree', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '.target',
        onElements,
        root: container,
      })

      const wrapper = document.createElement('div')
      wrapper.innerHTML =
        '<div class="target">1</div><div class="target">2</div>'
      container.appendChild(wrapper)

      await waitForObserver()

      expect(onElements).toHaveBeenCalledWith(
        expect.arrayContaining([
          wrapper.querySelector('.target:first-child'),
          wrapper.querySelector('.target:last-child'),
        ]),
      )
    })
  })

  describe('batching with requestAnimationFrame', () => {
    it('should batch multiple mutations into single callback', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '.target',
        onElements,
        root: container,
      })

      // Add multiple elements synchronously
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div')
        el.className = 'target'
        container.appendChild(el)
      }

      await waitForObserver()

      // Should be batched into single call (plus initial empty call)
      expect(onElements).toHaveBeenCalledTimes(1)
      expect(onElements.mock.calls[0][0]).toHaveLength(5)
    })
  })

  describe('cleanup', () => {
    it('should stop observing after cleanup', async () => {
      const onElements = vi.fn()
      cleanup = observeElements({
        selector: '.target',
        onElements,
        root: container,
      })

      cleanup()
      cleanup = null

      const newEl = document.createElement('div')
      newEl.className = 'target'
      container.appendChild(newEl)

      await waitForObserver()

      // Should not have been called for the new element
      expect(onElements).not.toHaveBeenCalled()
    })
  })
})
