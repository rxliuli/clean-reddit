import { advertise } from './top/advertise'
import { askAI } from './top/ask-ai'
import { leadingIcon } from './top/leading-icon'
import { navDot } from './top/nav-dot'
import { searchTrending } from './top/search-trending'
import { searchTrendingCommunities } from './top/search-trending-communities'
import { communities } from './left/communities'
import { feeds } from './left/feeds'
import { games } from './left/games'
import { home } from './left/home'
import { inc } from './left/inc'
import { moderation } from './left/moderation'
import { recentCommunities } from './left/recent-communities'
import { resources } from './left/resources'
import { communitySidebar } from './right/community-sidebar'
import { homeSidebar } from './right/home-sidebar'
import { legalLinks } from './right/legal-links'
import { postSidebar } from './right/post-sidebar'
import { userSidebar } from './right/user-sidebar'
import { communityRecommendations } from './content/community-recommendations'
import { promoted } from './content/promoted'
import { recommendation } from './content/recommendation'
import { relatedAnswers } from './content/related-answers'
import { searchAnswers } from './content/search-answers'
import { xpromoBottomSheet } from './content/xpromo-bottom-sheet'
import { achievements } from './avatar-menu/achievements'
import { advertiseOnReddit } from './avatar-menu/advertise-on-reddit'
import { earn } from './avatar-menu/earn'
import { premium } from './avatar-menu/premium'
import { tryRedditPro } from './avatar-menu/try-reddit-pro'

export const pluginGroups = {
  ads: [
    promoted(),
    advertise(),
    xpromoBottomSheet(),
    premium(),
    advertiseOnReddit(),
    tryRedditPro(),
  ],
  ai: [askAI(), searchAnswers(), relatedAnswers()],
  recommendations: [
    recommendation(),
    communityRecommendations(),
    searchTrending(),
    searchTrendingCommunities(),
  ],
  gamification: [games(), achievements(), earn()],
  top: [navDot(), leadingIcon()],
  left: [
    home(),
    moderation(),
    feeds(),
    recentCommunities(),
    communities(),
    resources(),
    inc(),
  ],
  right: [
    homeSidebar(),
    communitySidebar(),
    postSidebar(),
    userSidebar(),
    legalLinks(),
  ],
}

export const plugins = Object.values(pluginGroups).flat()
