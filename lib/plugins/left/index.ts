import { home } from './home'
import { games } from './games'
import { feeds } from './feeds'
import { recentCommunities } from './recent-communities'
import { communities } from './communities'
import { resources } from './resources'
import { inc } from './inc'
import { moderation } from './moderation'

export const leftPlugins = [
  home(),
  games(),
  moderation(),
  feeds(),
  recentCommunities(),
  communities(),
  resources(),
  inc(),
]
