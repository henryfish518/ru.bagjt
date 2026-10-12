/**
 * i18n 工具模块
 * -----------------------------------------------------------------------------
 * 所有文案均来自 src/i18n/en.json 与 src/i18n/ru.json。
 * 修改文案 = 直接改 json 文件 → 重新打包部署。无 CMS、无后台。
 */

import en from './en.json';
import ru from './ru.json';

export const LOCALES = ['ru', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** 默认语言：俄语（访问 / 自动跳转到 /ru/） */
export const DEFAULT_LOCALE: Locale = 'ru';

/** 各语言的 html lang 与 og:locale */
export const LOCALE_META: Record<Locale, { htmlLang: string; ogLocale: string; hreflang: string }> = {
  ru: { htmlLang: 'ru', ogLocale: 'ru_RU', hreflang: 'ru-RU' },
  en: { htmlLang: 'en', ogLocale: 'en_US', hreflang: 'en-US' },
};

/** 语言切换器显示名（用该语言自身书写，符合本地化惯例） */
export const LOCALE_LABEL: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
};

export const LOCALE_SHORT: Record<Locale, string> = {
  ru: 'RU',
  en: 'EN',
};

/** 语言旗标 emoji 占位（如需 SVG 图标可替换为组件） */
export const LOCALE_FLAG: Record<Locale, string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
};

const dictionaries = { ru, en } as const;

export type Dictionary = typeof en;

/**
 * 取指定语言的完整字典。
 * 结构以 en.json 为基准，类型安全。
 */
export function useTranslations(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]) as Dictionary;
}

/**
 * 生成某语言下的 URL 路径。
 * getLocalizedPath('ru', 'products')  -> '/ru/products'
 * getLocalizedPath('en')             -> '/en/'
 */
export function getLocalizedPath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

/**
 * 生成 hreflang 备用链接组（含 x-default）。
 * 用于 <link rel="alternate" hreflang="..."> —— Yandex / Google 多语言收录关键。
 */
export function getAlternateLinks(
  site: string,
  path = '',
): Array<{ hreflang: string; href: string }> {
  const links = LOCALES.map((loc) => ({
    hreflang: LOCALE_META[loc].hreflang,
    href: new URL(getLocalizedPath(loc, path), site).href,
  }));
  links.push({
    hreflang: 'x-default',
    href: new URL(getLocalizedPath(DEFAULT_LOCALE, path), site).href,
  });
  return links;
}

/** 根据当前语言返回另一种语言（用于语言切换器） */
export function getOtherLocale(locale: Locale): Locale {
  return locale === 'ru' ? 'en' : 'ru';
}

/** 校验任意字符串是否为受支持的语言 */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export default { useTranslations, getLocalizedPath, LOCALES, DEFAULT_LOCALE };
