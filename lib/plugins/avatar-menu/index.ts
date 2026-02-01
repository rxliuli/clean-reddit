import { achievements } from './achievements'
import { earn } from './earn'
import { premium } from './premium'
import { advertiseOnReddit } from './advertise-on-reddit'
import { tryRedditPro } from './try-reddit-pro'

export const avatarMenuPlugins = [
  achievements(),
  earn(),
  premium(),
  advertiseOnReddit(),
  tryRedditPro(),
]
