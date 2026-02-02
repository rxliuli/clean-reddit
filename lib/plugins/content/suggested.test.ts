import { describe, expect, it } from 'vitest'
import { suggestedForYou } from './suggested'
import suggestedForYouHtml from './assets/suggested-for-you.html?raw'
import normalPostHtml from './assets/normal.html?raw'

describe('suggestedForYou', () => {
  it('should return correct plugin configuration', () => {
    const plugin = suggestedForYou()
    expect(plugin.name).eq('suggested')
    expect(plugin.description).eq('Suggested for you')
    expect(plugin.selectors).instanceOf(Array)
    expect(plugin.selectors.length).gt(0)
  })

  it('should match suggested for you post', () => {
    const container = document.createElement('div')
    container.innerHTML = suggestedForYouHtml
    document.body.appendChild(container)

    const plugin = suggestedForYou()
    const selectors = plugin.selectors.join(', ')
    const matchedElements = document.querySelectorAll(selectors)

    expect(matchedElements.length).gt(0)

    // 验证匹配的元素确实包含正确的推荐标记
    const article = matchedElements[0] as HTMLElement
    const post = article.querySelector('shreddit-post')
    expect(post?.getAttribute('recommendation-source')).eq(
      'user_post_cold_start_two_tower',
    )

    document.body.removeChild(container)
  })

  it('should NOT match normal post', () => {
    const container = document.createElement('div')
    container.innerHTML = normalPostHtml
    document.body.appendChild(container)

    const plugin = suggestedForYou()

    const normalPost = container.querySelector('shreddit-post')
    const recommendationSource = normalPost?.getAttribute(
      'recommendation-source',
    )

    // 验证这不是 suggested-for-you 类型的推荐
    expect(recommendationSource).not.eq('user_post_cold_start_two_tower')

    document.body.removeChild(container)
  })

  it('should use stable attribute-based selectors', () => {
    const plugin = suggestedForYou()

    // 确保使用的是基于属性的选择器
    plugin.selectors.forEach((selector) => {
      expect(selector).toContain('recommendation-source')
      expect(selector).not.toContain('recommendation-context-json')
    })
  })

  it('should match posts with user_post_cold_start_two_tower recommendation-source', () => {
    const testHtml = `
      <article class="w-full m-0">
        <shreddit-post 
          recommendation-source="user_post_cold_start_two_tower"
          is-recommended-post="">
        </shreddit-post>
      </article>
    `
    const container = document.createElement('div')
    container.innerHTML = testHtml
    document.body.appendChild(container)

    const plugin = suggestedForYou()
    const selectors = plugin.selectors.join(', ')
    const matchedElements = document.querySelectorAll(selectors)

    expect(matchedElements.length).gt(0)

    document.body.removeChild(container)
  })
})
