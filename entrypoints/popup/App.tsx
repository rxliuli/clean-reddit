import { useEffect, useState } from 'react'
import { FaDiscord } from 'react-icons/fa'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { pluginGroups } from '@/lib/plugins'
import { getConfig, setConfig } from '@/lib/config'
import { BasePlugin } from '@/lib/plugins/type'

const groupLabels: Record<keyof typeof pluginGroups, string> = {
  left: 'Left Sidebar',
  right: 'Right Sidebar',
  top: 'Top Navigation',
  content: 'Content Feed',
  avatarMenu: 'Avatar Menu',
}

function PluginSwitch({
  plugin,
  enabled,
  onToggle,
}: {
  plugin: BasePlugin
  enabled: boolean
  onToggle: (enabled: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-1.5 gap-4">
      <Label htmlFor={plugin.name} className="cursor-pointer text-sm">
        {plugin.description}
      </Label>
      <Switch id={plugin.name} checked={enabled} onCheckedChange={onToggle} />
    </div>
  )
}

export function App() {
  const [config, setConfigState] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getConfig().then((cfg) => {
      setConfigState(cfg)
      setLoading(false)
    })
  }, [])

  const handleToggle = async (pluginName: string, enabled: boolean) => {
    const newConfig = { ...config, [pluginName]: enabled }
    setConfigState(newConfig)
    await setConfig(newConfig)
  }

  if (loading) {
    return (
      <div className="w-80 p-4 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    )
  }

  return (
    <div className="w-full min-w-80 p-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold">Clean Reddit</h1>
        <a
          href="https://discord.gg/Cwre8EwkNX"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Join our Discord"
        >
          <FaDiscord size={20} />
        </a>
      </div>
      <Accordion type="single" collapsible defaultValue="left">
        {(Object.keys(pluginGroups) as (keyof typeof pluginGroups)[]).map(
          (groupKey) => (
            <AccordionItem key={groupKey} value={groupKey}>
              <AccordionTrigger>{groupLabels[groupKey]}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {pluginGroups[groupKey].map((plugin) => (
                    <PluginSwitch
                      key={plugin.name}
                      plugin={plugin}
                      enabled={config[plugin.name] ?? false}
                      onToggle={(enabled) => handleToggle(plugin.name, enabled)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ),
        )}
      </Accordion>
    </div>
  )
}
