import { querySelectorAllDeep } from 'query-selector-shadow-dom'

export interface ObserveElementsOptions {
  selector: string
  onElements: (elements: Element[]) => void
  supportShadowDOM?: boolean
  root?: Element
}

export function observeElements(options: ObserveElementsOptions): () => void {
  const processedElements = new WeakSet<Element>()
  const root = options.root ?? document.body

  let rafId: number | null = null

  const findElements = (): Element[] => {
    if (options.supportShadowDOM) {
      return querySelectorAllDeep(
        options.selector,
        root as Document | HTMLElement,
      )
    }
    return Array.from(root.querySelectorAll(options.selector))
  }

  const processElements = (elements: Element[]) => {
    const unprocessedElements = elements.filter(
      (el) => !processedElements.has(el),
    )
    if (unprocessedElements.length === 0) {
      return
    }

    unprocessedElements.forEach((element) => {
      processedElements.add(element)
    })
    options.onElements(unprocessedElements)
  }

  const scheduleCheck = () => {
    if (rafId !== null) {
      return
    }
    rafId = requestAnimationFrame(() => {
      rafId = null
      processElements(findElements())
    })
  }

  const observer = new MutationObserver(scheduleCheck)

  // Initial full scan
  processElements(findElements())

  observer.observe(root, {
    childList: true,
    subtree: true,
  })

  const cleanup = () => {
    observer.disconnect()
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
  }

  return cleanup
}
