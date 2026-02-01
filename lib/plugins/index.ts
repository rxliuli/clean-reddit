import { leftPlugins } from './left'
import { rightPlugins } from './right'
import { topPlugins } from './top'
import { contentPlugins } from './content'
import { avatarMenuPlugins } from './avatar-menu'

export const pluginGroups = {
  left: leftPlugins,
  right: rightPlugins,
  top: topPlugins,
  content: contentPlugins,
  avatarMenu: avatarMenuPlugins,
}

export const plugins = Object.values(pluginGroups).flat()
