// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// 生产域名（用于 sitemap / canonical / hreflang 绝对地址）
export const SITE = 'https://bagjt.com';

export default defineConfig({
  site: SITE,

  // 纯静态站点：构建时一次性预渲染 ru / en 全部页面
  output: 'static',

  // 默认语言为俄语。访问 / 时由 src/pages/index.astro 跳转到 /ru/
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: true,
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
          en: 'en-US',
        },
      },
      // 首页重定向页不入 sitemap
      filter: (page) => page !== `${SITE}/`,
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
