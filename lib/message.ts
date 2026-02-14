import { defineExtensionMessaging } from '@webext-core/messaging'

export const messager = defineExtensionMessaging<{
  // background => content script
  show(): void
  // popup => content script
  configChanged(config: Record<string, boolean>): void
}>()
