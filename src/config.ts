/**
 * 站点级配置 —— 联系方式集中在此处维护
 * -----------------------------------------------------------------------------
 * 【预留填写位置】把下面的占位内容替换为真实信息即可，
 * 全站页脚 / 联系页 / WhatsApp 按钮会同步生效。
 */

export const SITE = {
  /** 生产域名，需与 astro.config.mjs 中的 site 保持一致 */
  url: 'https://bagjt.com',

  /** 公司名（英文，用于 sitemap / 结构化数据） */
  companyEn: 'Foshan Hongyun Jiangtian Packaging Materials Co., Ltd',

  /** 公司名（俄文，用于结构化数据） */
  companyRu: 'ООО «Фошань Хунъюнь Цзянтянь Пакинг Материалс»',
} as const;

/**
 * 联系方式
 * ============================ 【预留填写位置】 ============================
 * whatsappNumber : 纯数字国际格式，不含 + 和空格，例如 '8613800000000'
 * whatsappDisplay: 页面上展示的格式，例如 '+86 138 0000 0000'
 * email          : 真实接收询盘的邮箱
 *
 * 说明：以下电话 / 邮箱来自中文官网 robotf.cn 公开信息，
 * 若用于俄罗斯业务建议另配一个国际通用邮箱（如 sales@bagjt.com）。
 * ==========================================================================
 */
export const CONTACT = {
  whatsappNumber: '', // 【预留填写位置】例如 '8613800000000'
  whatsappDisplay: '', // 【预留填写位置】例如 '+86 138 0000 0000'
  email: '16868344@qq.com', // 来源：中文官网公开邮箱；建议替换为国际邮箱
  phone: '18570518098', // 来源：中文官网服务热线
  address: 'Foshan City, Guangdong Province, China',
  addressRu: 'Город Фошань, провинция Гуандун, Китай',
  hours: 'Monday – Saturday, 09:00 – 18:00 (GMT+8)',
  /** Telegram 用户名（不含 @） */
  telegramUsername: 'bagjt518',
  /** 页面上展示的格式 */
  telegramDisplay: '@bagjt518',
} as const;

/** WhatsApp 深链（号码未填写时回退到 wa.me 首页） */
export function whatsappLink(presetText = ''): string {
  const base = CONTACT.whatsappNumber
    ? `https://wa.me/${CONTACT.whatsappNumber}`
    : 'https://wa.me/';
  return presetText ? `${base}?text=${encodeURIComponent(presetText)}` : base;
}

/** Telegram 深链（带预设文本） */
export function telegramLink(presetText = ''): string {
  const base = `https://t.me/${CONTACT.telegramUsername}`;
  return presetText ? `${base}?text=${encodeURIComponent(presetText)}` : base;
}

/** 邮件深链（邮箱未填写时回退到 mailto:） */
export function mailtoLink(subject = '', body = ''): string {
  const addr = CONTACT.email || '';
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${addr}${params.length ? `?${params.join('&')}` : ''}`;
}

/** 是否已配置真实联系方式（用于组件中显示提示） */
export const CONTACT_CONFIGURED = {
  whatsapp: CONTACT.whatsappNumber.length > 0,
  telegram: CONTACT.telegramUsername.length > 0,
  email: CONTACT.email.length > 0,
};

/** 导航（slug 与 i18n key 对应） */
export const NAV_ITEMS = [
  { slug: '', key: 'home' },
  { slug: 'products', key: 'products' },
  { slug: 'news', key: 'news' },
  { slug: 'about', key: 'about' },
  { slug: 'contact', key: 'contact' },
] as const;

