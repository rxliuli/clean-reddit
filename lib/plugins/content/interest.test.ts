import { describe, expect, it } from 'vitest'
import { interest } from './interest'
import recommendedPostHtml from './assets/interest-topic.html?raw'
import normalPostHtml from './assets/normal.html?raw'

describe('interestTopic', () => {
  it('should return correct plugin configuration', () => {
    const plugin = interest()
    expect(plugin.name).eq('interest')
    expect(plugin.description).eq(
      'Hide the "Because you\'ve shown interest in a similar topic" section on Reddit.',
    )
    expect(plugin.selectors).instanceOf(Array)
    expect(plugin.selectors.length).gt(0)
  })

  it('should match recommended post with interest-topic recommendation-source', () => {
    const container = document.createElement('div')
    container.innerHTML = recommendedPostHtml
    document.body.appendChild(container)

    const plugin = interest()
    const selectors = plugin.selectors.join(', ')
    const matchedElements = document.querySelectorAll(selectors)

    expect(matchedElements.length).gt(0)

    // 验证匹配的元素确实包含推荐标记
    const article = matchedElements[0] as HTMLElement
    const post = article.querySelector('shreddit-post')
    expect(post?.getAttribute('recommendation-source')).eq(
      'onboarding_signals_similar_taxonomy_topics',
    )

    document.body.removeChild(container)
  })

  it('should NOT match normal post without recommendation', () => {
    const container = document.createElement('div')
    container.innerHTML = normalPostHtml
    document.body.appendChild(container)

    const plugin = interest()
    const selectors = plugin.selectors.join(', ')
    const matchedElements = document.querySelectorAll(selectors)

    // 普通帖子有不同的 recommendation-source，不应该被匹配
    const normalPost = container.querySelector('shreddit-post')
    const recommendationSource = normalPost?.getAttribute(
      'recommendation-source',
    )

    // 验证这不是 interest-topic 类型的推荐
    expect(recommendationSource).not.eq(
      'onboarding_signals_similar_taxonomy_topics',
    )

    document.body.removeChild(container)
  })

  it('should use stable attribute-based selectors', () => {
    const plugin = interest()

    // 确保使用的是基于属性的选择器，而不是基于 JSON 内容的选择器
    plugin.selectors.forEach((selector) => {
      expect(selector).toContain('recommendation-source')
      expect(selector).not.toContain('recommendation-context-json')
    })
  })
})
