import { querySelectorAllDeep } from 'query-selector-shadow-dom'

export interface ObserveElementsOptions {
  selector: string
  onElements: (elements: Element[]) => void
  supportShadowDOM?: boolean
  root?: Element
}

export function observeElements(options: ObserveElementsOptions): () => void {
  const processedElements = new WeakSet<Element>()
  const observers: MutationObserver[] = []
  const observedShadowRoots = new WeakSet<ShadowRoot>()
  const root = options.root ?? document.body

  const findElements = (): Element[] => {
    const querySelectorAll: (selector: string) => Element[] =
      options.supportShadowDOM
        ? querySelectorAllDeep
        : (selector: string) => Array.from(document.querySelectorAll(selector))
    const elements = querySelectorAll(options.selector)
    return elements
  }

  const observeShadowRoot = (shadowRoot: ShadowRoot) => {
    if (observedShadowRoots.has(shadowRoot)) {
      return
    }
    observedShadowRoots.add(shadowRoot)

    const shadowObserver = new MutationObserver(checkElement)
    shadowObserver.observe(shadowRoot, {
      childList: true,
      subtree: true,
    })
    observers.push(shadowObserver)
  }

  const findAndObserveShadowRoots = (node: Node) => {
    if (node instanceof Element && node.shadowRoot) {
      observeShadowRoot(node.shadowRoot)
    }
    // node.childNodes.forEach((child) => findAndObserveShadowRoots(child))
  }

  const checkElement = () => {
    const elements = findElements()

    if (elements.length === 0) {
      return
    }

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

  checkElement()

  if (options.supportShadowDOM) {
    findAndObserveShadowRoots(root)
  }

  const observer = new MutationObserver((mutations) => {
    checkElement()

    if (options.supportShadowDOM) {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          findAndObserveShadowRoots(node)
        })
      })
    }
  })

  observer.observe(root, {
    childList: true,
    subtree: true,
  })
  observers.push(observer)

  const cleanup = () => {
    observers.forEach((obs) => obs.disconnect())
  }

  return cleanup
}
