import { getConfig, onChange } from '@/lib/config'
import { observe, querySelectorAll } from '@/lib/filters'
import { plugins } from '@/lib/plugins'

export default defineContentScript({
  matches: ['https://www.reddit.com/*'],
  runAt: 'document_start',
  async main() {
    let config = await getConfig()

    const effects: (() => void)[] = []
    const hideElement = (element: HTMLElement) => {
      element.style.display = 'none'
      element.setAttribute('clean-reddit', 'true')
    }
    const collapseElement = (element: HTMLElement) => {
      element.style.visibility = 'hidden'
      element.style.height = '1px'
      element.style.overflow = 'hidden'
      element.style.margin = '0'
      element.style.padding = '0'
      element.style.pointerEvents = 'none'
      element.setAttribute('clean-reddit', 'collapse')
    }
    const restoreElement = (element: HTMLElement) => {
      const mode = element.getAttribute('clean-reddit')
      if (mode === 'collapse') {
        element.style.visibility = ''
        element.style.height = ''
        element.style.overflow = ''
        element.style.margin = ''
        element.style.padding = ''
        element.style.pointerEvents = ''
      } else {
        element.style.display = ''
      }
      element.removeAttribute('clean-reddit')
    }

    const activePlugins = () => {
      querySelectorAll(
        document.documentElement,
        '[clean-reddit]',
      ).forEach((el) => {
        if (el instanceof HTMLElement) {
          restoreElement(el)
        }
      })
      effects.forEach((it) => it())
      effects.length = 0
      let activePlugins = plugins.filter((it) => !config[it.name])
      // console.log(
      //   'Active Plugins:',
      //   activePlugins.map((it) => it.name),
      // )
      const defaultPlugins = activePlugins.filter((it) => !it.hideMode)
      const collapsePlugins = activePlugins.filter(
        (it) => it.hideMode === 'collapse',
      )

      const defaultSelectors = defaultPlugins
        .map((it) => it.selectors ?? [])
        .flat()
      if (defaultSelectors.length > 0) {
        const cleanup = observe(
          document.documentElement,
          defaultSelectors.join(','),
          {
            onMatch: (elements) => {
              elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                  hideElement(element)
                }
              })
            },
            onUnmatch: (elements) => {
              elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                  restoreElement(element)
                }
              })
            },
          },
        )
        effects.push(cleanup)
      }

      const collapseSelectors = collapsePlugins
        .map((it) => it.selectors ?? [])
        .flat()
      if (collapseSelectors.length > 0) {
        const cleanup = observe(
          document.documentElement,
          collapseSelectors.join(','),
          {
            onMatch: (elements) => {
              elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                  collapseElement(element)
                }
              })
            },
            onUnmatch: (elements) => {
              elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                  restoreElement(element)
                }
              })
            },
          },
        )
        effects.push(cleanup)
      }

      for (const plugin of activePlugins) {
        if (plugin.effect) {
          effects.push(plugin.effect())
        }
      }
    }

    activePlugins()

    onChange((newConfig) => {
      config = newConfig
      activePlugins()
    })
  },
})
