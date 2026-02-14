import { messager } from './message'
import { plugins } from './plugins'
import { communities } from './plugins/left/communities'
import { BasePlugin } from './plugins/type'

const enabledByDefault: BasePlugin[] = [communities()]

export const DEFAULT_CONFIG: Record<string, boolean> = plugins.reduce(
  (config, plugin) => {
    config[plugin.name] = enabledByDefault.some((d) => d.name === plugin.name)
    return config
  },
  {} as Record<string, boolean>,
)

const configKey = 'config-v2'

export async function getConfig() {
  const stored =
    (
      await browser.storage.sync.get<{
        [configKey]: Record<string, boolean>
      }>(configKey)
    )[configKey] ?? {}
  return {
    ...DEFAULT_CONFIG,
    ...stored,
  }
}

export async function setConfig(config: Partial<Record<string, boolean>>) {
  await browser.storage.sync.set({ [configKey]: config })
  await browser.storage.sync.remove('config') // Remove old config if it exists
}

export function onChange(callback: (config: Record<string, boolean>) => void) {
  messager.onMessage('configChanged', (ev) => {
    callback(ev.data)
  })
}
