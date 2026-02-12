import { observe } from '@/lib/filters'
import { BasePlugin } from '../type'

export function xpromoBottomSheet(): BasePlugin {
  return {
    name: 'xpromo-bottom-sheet',
    description: 'App promotion bottom sheet',
    selectors: ['#xpromo-bottom-sheet'],
    effect: () => {
      function cleanBody() {
        const body = document.body
        if (body.style.pointerEvents === 'none') {
          body.style.pointerEvents = ''
        }
        if (body.style.overflow === 'hidden') {
          body.style.overflow = ''
        }
      }

      // Clean body when xpromo-bottom-sheet is matched by selectors
      const cleanup = observe(
        document.documentElement,
        '#xpromo-bottom-sheet',
        {
          onMatch: () => cleanBody(),
        },
      )

      // Also observe body style changes since Reddit may re-apply them
      const bodyObserver = new MutationObserver(() => {
        if (document.getElementById('xpromo-bottom-sheet')) {
          cleanBody()
        }
      })
      bodyObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['style'],
      })

      return () => {
        cleanup()
        bodyObserver.disconnect()
      }
    },
  }
}
