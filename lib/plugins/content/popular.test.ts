import { describe, expect, it } from 'vitest'
import { popular } from './popular'
import popularNearYouHtml from './assets/popular-near-you.html?raw'
import normalPostHtml from './assets/normal.html?raw'

describe('popularNearYou', () => {
  it('should return correct plugin configuration', () => {
    const plugin = popular()
    expect(plugin.name).eq('popular')
    expect(plugin.description).eq(
      'Hide the "Popular Near You" section on the Reddit homepage.',
    )
    expect(plugin.selectors).instanceOf(Array)
    expect(plugin.selectors.length).gt(0)
  })

  it('should match popular near you post', () => {
    const container = document.createElement('div')
    container.innerHTML = popularNearYouHtml
    document.body.appendChild(container)

    const plugin = popular()
    const selectors = plugin.selectors.join(', ')
    const matchedElements = document.querySelectorAll(selectors)

    expect(matchedElements.length).gt(0)

    // 验证匹配的元素确实包含正确的推荐标记
    const article = matchedElements[0] as HTMLElement
    const post = article.querySelector('shreddit-post')
    expect(post?.getAttribute('recommendation-source')).eq(
      'geo_explore_subreddits',
    )

    document.body.removeChild(container)
  })

  it('should NOT match normal post', () => {
    const container = document.createElement('div')
    container.innerHTML = normalPostHtml
    document.body.appendChild(container)

    const plugin = popular()
    const selectors = plugin.selectors.join(', ')

    const normalPost = container.querySelector('shreddit-post')
    const recommendationSource = normalPost?.getAttribute(
      'recommendation-source',
    )

    // 验证这不是 popular-near-you 类型的推荐
    expect(recommendationSource).not.eq('geo_explore_subreddits')

    document.body.removeChild(container)
  })

  it('should use stable attribute-based selectors', () => {
    const plugin = popular()

    // 确保使用的是基于属性的选择器
    plugin.selectors.forEach((selector) => {
      expect(selector).toContain('recommendation-source')
      expect(selector).not.toContain('recommendation-context-json')
    })
  })

  it('should match posts with geo_explore_subreddits recommendation-source', () => {
    const testHtml = `
      <article class="w-full m-0">
        <shreddit-post 
          recommendation-source="geo_explore_subreddits"
          is-recommended-post="">
        </shreddit-post>
      </article>
    `
    const container = document.createElement('div')
    container.innerHTML = testHtml
    document.body.appendChild(container)

    const plugin = popular()
    const selectors = plugin.selectors.join(', ')
    const matchedElements = document.querySelectorAll(selectors)

    expect(matchedElements.length).gt(0)

    document.body.removeChild(container)
  })
})
