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

  let rafId: number | null = null
  let pendingElements: Element[] = []

  const findElementsInRoot = (searchRoot: Element | Document): Element[] => {
    if (options.supportShadowDOM) {
      return querySelectorAllDeep(
        options.selector,
        searchRoot as Document | HTMLElement,
      )
    }
    return Array.from(searchRoot.querySelectorAll(options.selector))
  }

  const observeShadowRoot = (shadowRoot: ShadowRoot) => {
    if (observedShadowRoots.has(shadowRoot)) {
      return
    }
    observedShadowRoots.add(shadowRoot)

    const shadowObserver = new MutationObserver((mutations) => {
      collectAddedElements(mutations)
    })
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

  // Parse selector to extract ancestor context (the part before the first combinator)
  // e.g., "#parent .child" -> { ancestor: "#parent", descendant: ".child" }
  // e.g., "#parent > .child" -> { ancestor: "#parent", descendant: "> .child" }
  // e.g., "article:has(...)" -> null (no combinator at depth 0)
  const parseAncestorSelector = (
    selector: string,
  ): { ancestor: string; descendant: string } | null => {
    // Find the FIRST combinator at depth 0 (not inside :has(), [], etc.)
    let depth = 0
    let firstCombinatorStart = -1
    let firstCombinatorEnd = -1

    for (let i = 0; i < selector.length; i++) {
      const char = selector[i]
      if (char === '(' || char === '[') {
        depth++
      } else if (char === ')' || char === ']') {
        depth--
      } else if (depth === 0 && firstCombinatorStart === -1) {
        // Look for combinator: space followed by non-space, or >, +, ~
        if (char === ' ') {
          // Check if this is a meaningful space (not just before >, +, ~)
          let j = i + 1
          while (j < selector.length && selector[j] === ' ') j++
          if (j < selector.length) {
            const nextChar = selector[j]
            if (nextChar === '>' || nextChar === '+' || nextChar === '~') {
              // Space before combinator, skip to after combinator
              firstCombinatorStart = i
              // Find end of combinator sequence
              j++
              while (j < selector.length && selector[j] === ' ') j++
              firstCombinatorEnd = j
              break
            } else {
              // Regular descendant combinator (space)
              firstCombinatorStart = i
              firstCombinatorEnd = j
              break
            }
          }
        } else if (char === '>' || char === '+' || char === '~') {
          // Direct combinator without leading space
          firstCombinatorStart = i
          let j = i + 1
          while (j < selector.length && selector[j] === ' ') j++
          firstCombinatorEnd = j
          break
        }
      }
    }

    if (firstCombinatorStart > 0 && firstCombinatorEnd > firstCombinatorStart) {
      const ancestor = selector.slice(0, firstCombinatorStart).trim()
      const descendant = selector.slice(firstCombinatorStart).trim()
      if (ancestor && descendant) {
        return { ancestor, descendant }
      }
    }
    return null
  }

  // Split selectors and categorize them
  const selectors = options.selector.split(',').map((s) => s.trim())
  const parsedSelectors = selectors.map((s) => ({
    original: s,
    parsed: parseAncestorSelector(s),
  }))

  const checkPendingElements = () => {
    rafId = null
    const elementsToCheck = pendingElements
    pendingElements = []

    if (elementsToCheck.length === 0) {
      return
    }

    const matchedElements: Element[] = []

    elementsToCheck.forEach((el) => {
      // For each selector, determine the best search strategy
      parsedSelectors.forEach(({ original, parsed }) => {
        if (parsed) {
          // Selector has combinator context (e.g., "#parent .child", "[attr] + hr")
          // Determine combinator type from descendant part
          const isSiblingCombinator =
            parsed.descendant.startsWith('+') ||
            parsed.descendant.startsWith('~')

          if (isSiblingCombinator) {
            // For sibling combinators, we need to search from parent
            try {
              const searchRoot = el.parentElement || root
              const found = options.supportShadowDOM
                ? querySelectorAllDeep(original, searchRoot as HTMLElement)
                : Array.from(searchRoot.querySelectorAll(original))
              // Filter: only include elements that are related to el
              const filtered = found.filter(
                (f) =>
                  f === el ||
                  el.contains(f) ||
                  f.contains(el) ||
                  f.previousElementSibling === el ||
                  el.previousElementSibling === f,
              )
              matchedElements.push(...filtered)
            } catch {
              // Invalid selector, skip
            }
          } else {
            // For descendant/child combinators
            // Strategy 1: Check if el is inside or is the ancestor, then query descendants
            try {
              const ancestor = el.closest(parsed.ancestor)
              if (ancestor) {
                // el is inside the ancestor - query from ancestor using full selector
                // but we need to query from ancestor's parent to include ancestor in scope
                const searchRoot = ancestor.parentElement || root
                const found = options.supportShadowDOM
                  ? querySelectorAllDeep(original, searchRoot as HTMLElement)
                  : Array.from(searchRoot.querySelectorAll(original))
                // Filter: only include elements that are related to el
                const filtered = found.filter(
                  (f) => f === el || el.contains(f) || f.contains(el),
                )
                matchedElements.push(...filtered)
              }
            } catch {
              // Invalid selector, skip
            }

            // Strategy 2: Check if el itself matches the ancestor selector
            try {
              if (el.matches(parsed.ancestor)) {
                // el is the ancestor - query from el's parent with full selector
                const searchRoot = el.parentElement || root
                const found = options.supportShadowDOM
                  ? querySelectorAllDeep(original, searchRoot as HTMLElement)
                  : Array.from(searchRoot.querySelectorAll(original))
                // Filter: only include elements inside el
                const filtered = found.filter((f) => el.contains(f))
                matchedElements.push(...filtered)
              }
            } catch {
              // Invalid selector, skip
            }
          }
        } else {
          // Simple selector, check element itself and its subtree
          try {
            if (el.matches(original)) {
              matchedElements.push(el)
            }
          } catch {
            // Invalid selector for matches()
          }
          const found = options.supportShadowDOM
            ? querySelectorAllDeep(original, el as HTMLElement)
            : Array.from(el.querySelectorAll(original))
          matchedElements.push(...found)
        }
      })
    })

    // Deduplicate
    const uniqueElements = [...new Set(matchedElements)]
    processElements(uniqueElements)
  }

  const scheduleCheck = () => {
    if (rafId !== null) {
      return
    }
    rafId = requestAnimationFrame(checkPendingElements)
  }

  const collectAddedElements = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          pendingElements.push(node)
        }
      })

      if (options.supportShadowDOM) {
        mutation.addedNodes.forEach((node) => {
          findAndObserveShadowRoots(node)
        })
      }
    })

    if (pendingElements.length > 0) {
      scheduleCheck()
    }
  }

  // Initial full scan
  const initialElements = findElementsInRoot(root)
  processElements(initialElements)

  if (options.supportShadowDOM) {
    findAndObserveShadowRoots(root)
  }

  const observer = new MutationObserver(collectAddedElements)

  observer.observe(root, {
    childList: true,
    subtree: true,
  })
  observers.push(observer)

  const cleanup = () => {
    observers.forEach((obs) => obs.disconnect())
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
  }

  return cleanup
}
