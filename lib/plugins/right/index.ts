import { communitySidebar } from './community-sidebar'
import { homeSidebar } from './home-sidebar'
import { legalLinks } from './legal-links'
import { postSidebar } from './post-sidebar'
import { userSidebar } from './user-sidebar'

export const rightPlugins = [
  homeSidebar(),
  communitySidebar(),
  postSidebar(),
  userSidebar(),
  legalLinks(),
]
