import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { parse } from 'css-what'
import { matches } from './matches'

describe('matches', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe('tag selector', () => {
    it('should match by tag name', () => {
      container.innerHTML = '<span></span>'
      const el = container.querySelector('span')!
      expect(matches(el, parse('span'))).toBe(true)
      expect(matches(el, parse('div'))).toBe(false)
    })

    it('should be case-insensitive', () => {
      container.innerHTML = '<div></div>'
      const el = container.querySelector('div')!
      expect(matches(el, parse('DIV'))).toBe(true)
    })
  })

  describe('class selector', () => {
    it('should match single class', () => {
      container.innerHTML = '<div class="foo"></div>'
      const el = container.querySelector('.foo')!
      expect(matches(el, parse('.foo'))).toBe(true)
      expect(matches(el, parse('.bar'))).toBe(false)
    })

    it('should match element with multiple classes', () => {
      container.innerHTML = '<div class="foo bar baz"></div>'
      const el = container.querySelector('.foo')!
      expect(matches(el, parse('.foo'))).toBe(true)
      expect(matches(el, parse('.bar'))).toBe(true)
      expect(matches(el, parse('.baz'))).toBe(true)
      expect(matches(el, parse('.qux'))).toBe(false)
    })

    it('should match compound class selector', () => {
      container.innerHTML = '<div class="foo bar"></div><div class="foo"></div>'
      const el1 = container.children[0] as HTMLElement
      const el2 = container.children[1] as HTMLElement
      expect(matches(el1, parse('.foo.bar'))).toBe(true)
      expect(matches(el2, parse('.foo.bar'))).toBe(false)
    })
  })

  describe('id selector', () => {
    it('should match by id', () => {
      container.innerHTML = '<div id="myid"></div>'
      const el = container.querySelector('#myid')!
      expect(matches(el, parse('#myid'))).toBe(true)
      expect(matches(el, parse('#other'))).toBe(false)
    })
  })

  describe('universal selector', () => {
    it('should match any element', () => {
      container.innerHTML = '<div></div><span></span>'
      expect(matches(container.children[0] as Element, parse('*'))).toBe(true)
      expect(matches(container.children[1] as Element, parse('*'))).toBe(true)
    })
  })

  describe('attribute selectors', () => {
    it('[attr] - exists', () => {
      container.innerHTML = '<div data-x></div><div></div>'
      expect(matches(container.children[0] as Element, parse('[data-x]'))).toBe(true)
      expect(matches(container.children[1] as Element, parse('[data-x]'))).toBe(false)
    })

    it('[attr=value] - equals', () => {
      container.innerHTML = '<div data-x="hello"></div>'
      const el = container.children[0] as Element
      expect(matches(el, parse('[data-x="hello"]'))).toBe(true)
      expect(matches(el, parse('[data-x="world"]'))).toBe(false)
    })

    it('[attr^=value] - starts with', () => {
      container.innerHTML = '<div data-x="hello-world"></div>'
      const el = container.children[0] as Element
      expect(matches(el, parse('[data-x^="hello"]'))).toBe(true)
      expect(matches(el, parse('[data-x^="world"]'))).toBe(false)
    })

    it('[attr$=value] - ends with', () => {
      container.innerHTML = '<div data-x="hello-world"></div>'
      const el = container.children[0] as Element
      expect(matches(el, parse('[data-x$="world"]'))).toBe(true)
      expect(matches(el, parse('[data-x$="hello"]'))).toBe(false)
    })

    it('[attr*=value] - contains', () => {
      container.innerHTML = '<div data-x="hello-world"></div>'
      const el = container.children[0] as Element
      expect(matches(el, parse('[data-x*="lo-wo"]'))).toBe(true)
      expect(matches(el, parse('[data-x*="xyz"]'))).toBe(false)
    })

    it('[attr|=value] - hyphen', () => {
      container.innerHTML = '<div lang="en-US"></div><div lang="en"></div><div lang="fr"></div>'
      expect(matches(container.children[0] as Element, parse('[lang|="en"]'))).toBe(true)
      expect(matches(container.children[1] as Element, parse('[lang|="en"]'))).toBe(true)
      expect(matches(container.children[2] as Element, parse('[lang|="en"]'))).toBe(false)
    })
  })

  describe('compound selectors', () => {
    it('tag + class', () => {
      container.innerHTML = '<div class="foo"></div><span class="foo"></span>'
      expect(matches(container.children[0] as Element, parse('div.foo'))).toBe(true)
      expect(matches(container.children[1] as Element, parse('div.foo'))).toBe(false)
    })

    it('tag + id + class', () => {
      container.innerHTML = '<div id="x" class="foo"></div>'
      const el = container.children[0] as Element
      expect(matches(el, parse('div#x.foo'))).toBe(true)
      expect(matches(el, parse('span#x.foo'))).toBe(false)
    })
  })

  describe('child combinator (>)', () => {
    it('should match direct child', () => {
      container.innerHTML = '<div id="p"><span class="c"></span></div>'
      const child = container.querySelector('.c')!
      expect(matches(child, parse('#p > .c'))).toBe(true)
    })

    it('should NOT match non-direct descendant', () => {
      container.innerHTML = '<div id="p"><div><span class="c"></span></div></div>'
      const child = container.querySelector('.c')!
      expect(matches(child, parse('#p > .c'))).toBe(false)
    })
  })

  describe('descendant combinator (space)', () => {
    it('should match any descendant', () => {
      container.innerHTML = '<div id="p"><div><span class="c"></span></div></div>'
      const child = container.querySelector('.c')!
      expect(matches(child, parse('#p .c'))).toBe(true)
    })

    it('should not match unrelated element', () => {
      container.innerHTML = '<div id="p"></div><span class="c"></span>'
      const el = container.querySelector('.c')!
      expect(matches(el, parse('#p .c'))).toBe(false)
    })
  })

  describe('adjacent sibling combinator (+)', () => {
    it('should match immediate next sibling', () => {
      container.innerHTML = '<div class="a"></div><div class="b"></div>'
      const el = container.querySelector('.b')!
      expect(matches(el, parse('.a + .b'))).toBe(true)
    })

    it('should NOT match non-adjacent sibling', () => {
      container.innerHTML = '<div class="a"></div><div></div><div class="b"></div>'
      const el = container.querySelector('.b')!
      expect(matches(el, parse('.a + .b'))).toBe(false)
    })
  })

  describe('general sibling combinator (~)', () => {
    it('should match any preceding sibling', () => {
      container.innerHTML = '<div class="a"></div><div></div><div class="b"></div>'
      const el = container.querySelector('.b')!
      expect(matches(el, parse('.a ~ .b'))).toBe(true)
    })

    it('should NOT match following sibling', () => {
      container.innerHTML = '<div class="b"></div><div class="a"></div>'
      const el = container.querySelector('.b')!
      expect(matches(el, parse('.a ~ .b'))).toBe(false)
    })
  })

  describe('comma-separated selectors', () => {
    it('should match if any selector matches', () => {
      container.innerHTML = '<span class="x"></span>'
      const el = container.querySelector('.x')!
      expect(matches(el, parse('div, span.x'))).toBe(true)
      expect(matches(el, parse('div, p'))).toBe(false)
    })
  })

  describe('pseudo-classes', () => {
    it(':not()', () => {
      container.innerHTML = '<div class="a"></div><div class="b"></div>'
      expect(matches(container.querySelector('.a')!, parse(':not(.b)'))).toBe(true)
      expect(matches(container.querySelector('.b')!, parse(':not(.b)'))).toBe(false)
    })

    it(':is()', () => {
      container.innerHTML = '<div class="a"></div><span class="b"></span>'
      expect(matches(container.querySelector('.a')!, parse(':is(.a, .b)'))).toBe(true)
      expect(matches(container.querySelector('.b')!, parse(':is(.a, .b)'))).toBe(true)
    })

    it(':first-child', () => {
      container.innerHTML = '<div></div><div></div>'
      expect(matches(container.children[0] as Element, parse(':first-child'))).toBe(true)
      expect(matches(container.children[1] as Element, parse(':first-child'))).toBe(false)
    })

    it(':last-child', () => {
      container.innerHTML = '<div></div><div></div>'
      expect(matches(container.children[0] as Element, parse(':last-child'))).toBe(false)
      expect(matches(container.children[1] as Element, parse(':last-child'))).toBe(true)
    })

    it(':has()', () => {
      container.innerHTML = '<div><span class="inner"></span></div><div></div>'
      expect(matches(container.children[0] as Element, parse(':has(.inner)'))).toBe(true)
      expect(matches(container.children[1] as Element, parse(':has(.inner)'))).toBe(false)
    })
  })

  describe('shadow DOM traversal', () => {
    it('should match across shadow boundary with descendant combinator', () => {
      container.innerHTML = '<div id="host-wrapper"></div>'
      const wrapper = container.querySelector('#host-wrapper')!
      const host = document.createElement('div')
      host.id = 'shadow-host'
      wrapper.appendChild(host)
      const shadow = host.attachShadow({ mode: 'open' })
      const inner = document.createElement('span')
      inner.className = 'deep'
      shadow.appendChild(inner)

      // "span.deep" is inside shadow, "#host-wrapper" is outside
      expect(matches(inner, parse('#host-wrapper span.deep'))).toBe(true)
    })

    it('should match across shadow boundary with child combinator', () => {
      const host = document.createElement('div')
      host.id = 'my-host'
      container.appendChild(host)
      const shadow = host.attachShadow({ mode: 'open' })
      const inner = document.createElement('div')
      inner.className = 'child'
      shadow.appendChild(inner)

      // Direct child of shadow host
      expect(matches(inner, parse('#my-host > .child'))).toBe(true)
    })

    it('should match nested shadow DOMs', () => {
      const outer = document.createElement('div')
      outer.id = 'outer'
      container.appendChild(outer)
      const shadow1 = outer.attachShadow({ mode: 'open' })
      const mid = document.createElement('div')
      mid.id = 'mid'
      shadow1.appendChild(mid)
      const shadow2 = mid.attachShadow({ mode: 'open' })
      const deep = document.createElement('span')
      deep.className = 'deep'
      shadow2.appendChild(deep)

      expect(matches(deep, parse('#outer span.deep'))).toBe(true)
      expect(matches(deep, parse('#mid > .deep'))).toBe(true)
    })
  })

  describe('complex real-world selectors', () => {
    it('#user-drawer-content faceplate-tracker:has([href$="/achievements"])', () => {
      container.innerHTML = '<div id="user-drawer-content"></div>'
      const drawer = container.querySelector('#user-drawer-content')!
      const tracker = document.createElement('faceplate-tracker')
      const link = document.createElement('a')
      link.setAttribute('href', '/user/test/achievements')
      tracker.appendChild(link)
      drawer.appendChild(tracker)

      expect(
        matches(
          tracker,
          parse('#user-drawer-content faceplate-tracker:has([href$="/achievements"])'),
        ),
      ).toBe(true)
    })

    it('#left-sidebar [selectedpagetype] + hr', () => {
      container.innerHTML = '<div id="left-sidebar"></div>'
      const sidebar = container.querySelector('#left-sidebar')!
      const item = document.createElement('div')
      item.setAttribute('selectedpagetype', 'home')
      const hr = document.createElement('hr')
      sidebar.appendChild(item)
      sidebar.appendChild(hr)

      expect(matches(hr, parse('#left-sidebar [selectedpagetype] + hr'))).toBe(true)
    })
  })
})
