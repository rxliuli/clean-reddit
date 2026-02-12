export interface BasePlugin {
  name: string
  description: string
  selectors?: string[]
  effect?: () => () => void
}
