import { plugins } from './plugins'
import { communities } from './plugins/left/communities'
import { BasePlugin } from './plugins/type'

const enabledPlugins: BasePlugin[] = plugins.filter(
  (it) => it.name !== communities().name,
)

export const DEFAULT_CONFIG: Record<string, boolean> = enabledPlugins.reduce(
  (config, plugin) => {
    config[plugin.name] = true
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
