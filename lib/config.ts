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

export async function getConfig() {
  const stored =
    (
      await browser.storage.sync.get<{
        config: Record<string, boolean>
      }>('config')
    ).config ?? {}
  return {
    ...DEFAULT_CONFIG,
    ...stored,
  }
}

export async function setConfig(config: Partial<Record<string, boolean>>) {
  await browser.storage.sync.set({ config })
}
