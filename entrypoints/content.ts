import { getConfig } from '@/lib/config'
import { observeElements } from '@/lib/observeElement'
import { plugins } from '@/lib/plugins'
import { querySelectorAllDeep } from 'query-selector-shadow-dom'

export default defineContentScript({
  matches: ['https://www.reddit.com/*'],
  runAt: 'document_start',
  async main() {
    let config = await getConfig()

    const effects: (() => void)[] = []
    const activePlugins = () => {
      querySelectorAllDeep('[clean-reddit="true"]').forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.display = ''
          el.removeAttribute('clean-reddit')
        }
      })
      effects.forEach((it) => it())
      effects.length = 0
      let activePlugins = plugins.filter((it) => config[it.name])
      console.log(
        'Active Plugins:',
        activePlugins.map((it) => it.name),
      )
      const selectors = activePlugins.map((it) => it.selectors ?? []).flat()
      const cleanup = observeElements({
        selector: selectors.join(','),
        supportShadowDOM: true,
        root: document.documentElement,
        onElements(elements) {
          elements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none'
              element.setAttribute('clean-reddit', 'true')
            }
          })
        },
      })
      effects.push(cleanup)
    }

    activePlugins()

    browser.storage.sync.onChanged.addListener(async (changes) => {
      if (changes.config) {
        config = changes.config.newValue as Record<string, boolean>
        activePlugins()
      }
    })
  },
})
