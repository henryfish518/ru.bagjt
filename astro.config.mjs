// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// 生产域名（用于 sitemap / canonical / hreflang 绝对地址）
export const SITE = 'https://ru.bagjt.com';

export default defineConfig({
  site: SITE,

  // 纯静态站点：构建时一次性预渲染 ru / en 全部页面
  output: 'static',

  // 单语站：俄语根路径直出，无 /ru/ 前缀
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: {
          ru: 'ru-RU',
        },
      },
    }),
  ],

  build: {
    inlineStylesheets: 'auto',
  },

  image: {
    // sharp 用于静态构建时压缩图片
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
