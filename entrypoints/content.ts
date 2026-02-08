import { getConfig } from '@/lib/config'
import { observe, querySelectorAll } from '@/lib/filters'
import { plugins } from '@/lib/plugins'

export default defineContentScript({
  matches: ['https://www.reddit.com/*'],
  runAt: 'document_start',
  async main() {
    let config = await getConfig()

    const effects: (() => void)[] = []
    const activePlugins = () => {
      querySelectorAll(
        document.documentElement,
        '[clean-reddit="true"]',
      ).forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.display = ''
          el.removeAttribute('clean-reddit')
        }
      })
      effects.forEach((it) => it())
      effects.length = 0
      let activePlugins = plugins.filter((it) => config[it.name])
      // console.log(
      //   'Active Plugins:',
      //   activePlugins.map((it) => it.name),
      // )
      const selectors = activePlugins.map((it) => it.selectors ?? []).flat()
      const cleanup = observe(
        document.documentElement,
        selectors.join(','),
        {
          onMatch: (elements) => {
            elements.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.style.display = 'none'
                element.setAttribute('clean-reddit', 'true')
              }
            })
          },
          onUnmatch: (elements) => {
            elements.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.style.display = ''
                element.removeAttribute('clean-reddit')
              }
            })
          },
        },
      )
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
