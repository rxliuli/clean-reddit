import { defineConfig, UserManifest } from 'wxt'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  modules: ['@wxt-dev/module-react', 'wxt-module-safari-xcode'],
  safariXcode: {
    appCategory: 'public.app-category.productivity',
    bundleIdentifier: 'com.rxliuli.clean-reddit',
    developmentTeam: 'N2X78TUUFG',
  },
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': __dirname,
      },
    },
  }),
  manifestVersion: 3,
  manifest: (env) => {
    const manifest: UserManifest = {
      name: 'Clean for Reddit',
      description: 'Remove clutter and distractions from Reddit',
      permissions: ['storage'],
      author: {
        email: 'rxliuli@gmail.com',
      },
      action: {
        default_icon: {
          '16': 'icon/16.png',
          '32': 'icon/32.png',
          '48': 'icon/48.png',
          '96': 'icon/96.png',
          '128': 'icon/128.png',
        },
      },
      homepage_url: 'https://rxliuli.com/project/clean-reddit',
    }
    if (env.browser === 'firefox') {
      manifest.browser_specific_settings = {
        gecko: {
          id: 'clean-reddit@rxliuli.com',
          // @ts-expect-error https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings#data_collection_permissions
          data_collection_permissions: {
            required: ['none'],
          },
        },
      }
      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/author
      // @ts-expect-error
      manifest.author = 'rxliuli'
    } else if (env.browser === 'safari') {
      manifest.name = 'Clean for Reddit'
      manifest.description = 'Remove clutter and distractions from your feed'
      manifest.icons = {
        '16': 'icon/safari/16.png',
        '32': 'icon/safari/32.png',
        '48': 'icon/safari/48.png',
        '96': 'icon/safari/96.png',
        '128': 'icon/safari/128.png',
      }
      manifest.action!.default_icon = manifest.icons
    }
    return manifest
  },
  webExt: {
    disabled: true,
  },
})
