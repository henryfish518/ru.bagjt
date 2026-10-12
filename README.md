# bagjt.com — FIBC 吨袋外贸静态官网

**佛山鸿运江天包装材料有限公司**（Foshan Hongyun Jiangtian Packaging Materials Co., Ltd）
主营 FIBC 吨袋 / 集装袋，出口俄罗斯及中亚市场。

- 技术栈：**Astro v5 + Tailwind CSS v3**
- 渲染模式：**SSG 纯静态预渲染**（构建时一次性生成 ru / en 全部页面）
- 多语言：`/ru/`（默认，俄语）+ `/en/`（英语），访问 `/` 自动跳转 `/ru/`
- 无后端、无 CMS、无数据库 —— 改名换文案 = 改 JSON + 重新打包

---

## 一、快速开始

```bash
# 1. 安装依赖
npm install

# 2. 本地预览（默认 http://localhost:4321）
npm run dev

# 3. 打包静态文件 → 输出到 dist/
npm run build

# 4. 本地预览打包结果
npm run preview
```

> 环境要求：**Node.js ≥ 18.17**（推荐 20 / 22）。本机使用 `node 22.22.2`。

### 本地预览各语言版本

| 地址 | 说明 |
|---|---|
| http://localhost:4321/ | 自动跳转到 `/ru/` |
| http://localhost:4321/ru/ | 俄语首页（默认语言） |
| http://localhost:4321/en/ | 英语首页 |
| http://localhost:4321/ru/products/ | 产品页（俄） |
| http://localhost:4321/ru/about/ | 关于我们（俄） |
| http://localhost:4321/ru/contact/ | 联系我们（俄） |

---

## 二、目录结构

```
bagjt-site/
├── astro.config.mjs          # Astro 配置：site 域名、i18n、tailwind、sitemap
├── tailwind.config.mjs       # 主题：深蓝 #193b70 / 橙 #f27c22、字体、阴影
├── tsconfig.json             # TS 配置 + @/* 路径别名
├── package.json              # 依赖与脚本
├── .gitignore
│
├── public/                   # 静态资源，原样复制到 dist/
│   ├── favicon.svg
│   ├── logo.svg
│   ├── og-default.svg        # 社交分享预览图（可替换为 1200×630 的 jpg/png）
│   ├── og-products.svg
│   ├── og-about.svg
│   ├── og-contact.svg
│   └── robots.txt            # 含 Yandex / Google 抓取规则与 sitemap 地址
│
└── src/
    ├── config.ts             # ★ 联系方式集中配置（WhatsApp / 邮箱【预留填写位置】）
    │
    ├── i18n/
    │   ├── index.ts          # ★ i18n 工具：字典读取、路径生成、hreflang 生成
    │   ├── ru.json           # ★ 俄语全部文案（默认语言）
    │   └── en.json           # ★ 英语全部文案
    │
    ├── styles/
    │   └── global.css        # Tailwind 入口 + 组件类（btn/card/spec-row 等）
    │
    ├── assets/
    │   └── images/
    │       └── README.md     # ★ 图片占位说明与替换方法
    │
    ├── layouts/
    │   └── MainLayout.astro  # ★ 主布局：head/SEO/hreflang/字体/OG/JSON-LD
    │
    ├── components/
    │   ├── Header.astro      # ★ 导航 + RU/EN 语言切换器 + 移动端菜单
    │   ├── Footer.astro      # ★ 页脚：简介/产品/导航/语言/联系方式
    │   ├── Hero.astro        # ★ 首页主视觉
    │   ├── ProductCard.astro # ★ 产品卡片
    │   ├── SectionHeader.astro # 通用章节标题
    │   └── CtaBand.astro     # 通用底部行动条
    │
    └── pages/
        ├── index.astro           # / → 跳转 /ru/
        ├── 404.astro             # 404 页
        └── [lang]/
            ├── index.astro       # /ru/  /en/             首页
            ├── products.astro    # /ru/products/  /en/products/  产品页
            ├── about.astro       # /ru/about/  /en/about/        关于我们
            └── contact.astro     # /ru/contact/  /en/contact/    联系我们
```

### 关键文件（改内容只看这几个）

| 想改什么 | 改哪里 |
|---|---|
| 任何文案（标题、正文、按钮、meta） | `src/i18n/ru.json` 和 `src/i18n/en.json` |
| WhatsApp 号 / 邮箱 / 地址 | `src/config.ts` |
| 主色、辅助色、字体、圆角 | `tailwind.config.mjs` |
| 域名 | `astro.config.mjs` 的 `site` + `src/config.ts` 的 `SITE.url` |
| 图片 | `src/assets/images/`（见该目录 README） |
| 抓取规则 | `public/robots.txt` |

### 产品分类（与中文官网一致）

本站的 8 个产品分类**直接对应中文官网 robotf.cn「产品中心」的分类**，不是行业通用模板：

| # | 中文（中文官网） | 俄语（本站） | 英语（本站） | id |
|---|---|---|---|---|
| 1 | 通用吨袋 | Универсальные биг-бэги | Universal Bulk Bags | `universal` |
| 2 | 食品级吨袋 | Биг-бэги пищевого класса | Food Grade Bulk Bags | `food-grade` |
| 3 | 重型吨袋 | Биг-бэги повышенной прочности | Heavy Duty Bulk Bags | `heavy-duty` |
| 4 | 内拉筋吨袋 | Биг-бэги с внутренними рёбрами жёсткости | Bulk Bags with Inner Baffles | `inner-baffle` |
| 5 | 耐酸碱吨袋 | Биг-бэги кислото- и щёлочестойкие | Acid & Alkali Resistant Bulk Bags | `acid-alkali` |
| 6 | 耐高温集装袋 | Термостойкие контейнерные мешки | Heat Resistant Container Bags | `heat-resistant` |
| 7 | TYPE-D 导电集装袋 | Токопроводящие контейнерные мешки TYPE-D | Conductive Container Bags TYPE-D | `type-d` |
| 8 | TYPE-C 防静电集装袋 | Антистатические контейнерные мешки TYPE-C | Antistatic Container Bags TYPE-C | `type-c` |

> 俄罗斯客户搜索习惯补充：`биг-бэг`（big bag）和 `мягкий контейнер` 是俄语区最常用的两个词，
> TYPE-C / TYPE-D 在国际 FIBC 行业通用，保留英文写法便于客户精准检索。

### 公司资料（与中文官网一致）

关于我们页面使用的是中文官网的真实数据，非虚构：

| 项目 | 数据 |
|---|---|
| 成立时间 | 2008 年 8 月 8 日 |
| 生产基地 | 全国 5 个自有工厂 |
| 仓储 | 广西、湖南、陕西、湖北 5 个云仓 |
| 年产能 | 超 1000 万条 |
| 出口国家 | 30+ |
| 车间面积 | 超 8000 平方米 |
| 认证 | ISO 9001、SGS、ISO 22000（食品级）、A 级纳税人、进出口经营权 |
| 服务行业 | 化工、建材、粮食、矿业、医药、食品 |
| 代表客户 | 中石化、中石油、海螺水泥、中国建材、中粮集团、中盐集团 |
| 国际案例 | 2005 年承接美国邮政环保邮政袋订单 |

> 修改这些数据请直接编辑 `src/i18n/{ru,en}.json` 的 `about` 段。

---

## 三、路由与 i18n 约定

```
/                     → 自动跳转 /ru/（meta refresh + JS + canonical 三重保险）
/ru/                  → 俄语首页（默认语言，prefixDefaultLocale: true）
/ru/products/         → 产品页
/ru/about/            → 关于我们
/ru/contact/          → 联系我们
/en/ , /en/products/ , /en/about/ , /en/contact/   → 英语同名页面
```

所有页面由 `src/pages/[lang]/*.astro` 的 `getStaticPaths()` 一次性生成，
**构建产物为纯 HTML**，可直接扔到任意静态托管。

**语言切换器**会保持当前页面位置：在 `/ru/about/` 点 EN → `/en/about/`。

**新增语言**（例如加 `uz` 乌兹别克语）只需三步：

1. 复制 `src/i18n/ru.json` → `src/i18n/uz.json` 并翻译；
2. 在 `src/i18n/index.ts` 的 `LOCALES` / `dictionaries` / `LOCALE_META` 中加 `uz`；
3. 在 `src/pages/[lang]/*.astro` 的 `getStaticPaths()` 返回值里加 `{ params: { lang: 'uz' } }`
   （共 4 个文件），并在 `astro.config.mjs` 的 `i18n.locales` 加上 `uz`。

---

## 四、SEO 说明（Yandex / Google 友好）

已内置：

- ✅ **hreflang 多语言标签** —— 每个页面自动输出 `ru-RU`、`en-US`、`x-default` 三条
  `<link rel="alternate">`，由 `getAlternateLinks()` 统一生成，避免手工写错。
- ✅ **独立 meta** —— 每个页面每语言的 `title` / `description` / `keywords` 分别写在 JSON 里，
  俄语描述为俄语原创，非英文机翻，利于 Yandex 收录。
- ✅ **canonical** —— 每页输出自身绝对地址，防止多语言互判重复内容。
- ✅ **sitemap.xml** —— `@astrojs/sitemap` 自动生成 `sitemap-index.xml`，
  内置 i18n 分组，提交到 Yandex Webmaster / Google Search Console 即可。
- ✅ **robots.txt** —— 含 `Clean-param`（Yandex 去 utm 参数）与 `Host` 指令、sitemap 地址。
- ✅ **结构化数据** —— `Organization` JSON-LD，含公司名（中/俄双名）、地址、服务地区
  （RU/KZ/UZ/KG/TJ/TM）、可用语言，帮助搜索引擎识别企业主体。
- ✅ **Open Graph / Twitter Card** —— 分享到社交媒体有预览图。
- ✅ **语义化标签 + 面包屑** —— `nav` / `article` / `h1`→`h2`→`h3` 层级规范，
  面包屑带 `aria-label="Breadcrumb"`。

### 上线后必做

1. **Yandex Webmaster**（webmaster.yandex.ru）添加 `bagjt.com` 并验证；
   在「索引 → 站点地图」提交 `https://bagjt.com/sitemap-index.xml`。
2. **Google Search Console** 同样添加并提交 sitemap。
3. 在 Yandex Webmaster 的「地区」中设定目标地区（俄罗斯）。
4. 若你希望 `https://bagjt.com/` 走 **HTTP 301**（比 meta refresh 更利于 SEO），
   在托管平台加一条重定向规则：`/` → `/ru/`，状态码 301。

---

## 五、联系方式配置（重要）

打开 `src/config.ts`，把两个占位填上：

```ts
export const CONTACT = {
  whatsappNumber: '8613800000000',    // 【预留填写位置】纯数字国际格式，无 + 无空格
  whatsappDisplay: '+86 138 0000 0000', // 【预留填写位置】页面上展示的格式
  email: '16868344@qq.com',            // 来源：中文官网公开邮箱；建议替换为国际邮箱
  phone: '18570518098',                // 来源：中文官网服务热线
  address: 'Foshan City, Guangdong Province, China',
  addressRu: 'Город Фошань, провинция Гуандун, Китай',
  hours: 'Monday – Saturday, 09:00 – 18:00 (GMT+8)',
};
```

**强烈建议**：俄罗斯客户对 QQ 邮箱信任度较低，建议另注册一个国际邮箱（如 `sales@bagjt.com`
或 Gmail / Yandex 邮箱）替换 `email` 字段，对成交转化有明显帮助。

填写后，全站的 WhatsApp 按钮、邮箱链接、页脚信息会**自动同步生效**，
无需再逐个页面去改。未填写时页面会显示「预留位置」提示（带橙色斜体标记），方便你核对。

---

## 六、联系表单说明（仅 UI，无后端）

`/ru/contact/` 和 `/en/contact/` 的询盘表单：

- ❌ **无 `action`**、**无 `method`**、**无 fetch 提交**、按钮全部 `type="button"`
- ✅ 还额外拦截了 `submit` 事件，避免回车键触发表单提交
- ✅ 填写后有三个出口：
  1. **发送到 WhatsApp** —— 自动把填写内容拼成文本，打开 `wa.me` 链接
  2. **发送邮件** —— 拼成 `mailto:` 链接，带主题和正文
  3. **复制文本** —— 一键复制到剪贴板，用户自行粘贴到任何聊天工具

**为什么这样设计**：静态站 + 无后端 = 零服务器成本、无邮件服务依赖、无垃圾询盘注入风险。
客户填完直接跳 WhatsApp，沟通效率反而比等邮件快。

如果日后确实需要邮箱收信，可以接第三方表单服务（Formspree / Getform 等），
只需给 `<form>` 加上 `action` 属性即可，本项目结构不需要改动。

---

## 七、打包部署

```bash
npm run build     # 产物在 dist/
```

`dist/` 是纯静态文件（HTML + CSS + JS + 图片），部署到任意静态托管：

| 平台 | 部署方式 |
|---|---|
| **Cloudflare Pages** | 构建命令 `npm run build`，输出目录 `dist` |
| **Vercel** | 框架自动识别 Astro，直接导入仓库 |
| **Netlify** | 构建 `npm run build`，发布目录 `dist` |
| **对象存储（COS/OSS）+ CDN** | 上传 `dist/` 全部内容，配置静态网站托管 |
| **Nginx / Apache** | 把 `dist/` 内容放到站点根目录 |

### 服务器配置建议

**重定向 `/` → `/ru/`**（Nginx）：

```nginx
location = / {
  return 301 /ru/;
}
```

**404 处理**（Nginx）：

```nginx
error_page 404 /404.html;
```

### 缓存策略建议

| 路径 | 缓存 |
|---|---|
| `/_astro/*` | 1 年（文件名带 hash，可长期缓存） |
| `*.html` | 不缓存或短缓存（5 分钟） |
| `*.svg` / `favicon` | 1 周 |

---

## 八、技术要点

- **字体**：`Inter`（拉丁字母）+ `Noto Sans`（西里尔字母，俄语必需）。
  通过 Google Fonts 引入并预连接；Tailwind 的 `font-sans` 已配置好回退链，
  即使 Google Fonts 被墙，系统字体也能正常显示俄语。
- **配色**：`brand-600 = #193b70`（深蓝工业主色）、`accent-500 = #f27c22`（辅助橙）。
  完整 50→900 色阶定义在 `tailwind.config.mjs`。
- **图片**：使用 Astro `<Image />` 组件，构建时自动转 WebP 并压缩。
  当前为占位图，替换方法见 `src/assets/images/README.md`。
- **JS 体积**：全站仅两个内联小脚本（移动端菜单、表单复制），
  其余零 JS —— 页面加载极快，利于 SEO 与移动端体验。
- **响应式**：移动优先，断点 `sm 640 / lg 1024`，移动端汉堡菜单。

---

## 九、常见问题

**Q: 改完 JSON 文案没生效？**
重启 `npm run dev`。JSON 由 `import` 引入，HMR 对 JSON 支持有限。

**Q: 想改主色？**
改 `tailwind.config.mjs` 里的 `brand` 色阶。别只改 `brand-600`，
把 50/100/500/700 一起调，否则 hover、背景、边框会不协调。

**Q: 产品要增加一项？**
在 `ru.json` 和 `en.json` 的 `products.items` 数组里各加一条（`id` 必须一致，
且需要带 `specs` 数组），再在 `ProductCard.astro` 的 `ORDER` 数组和 `ICONS` 映射里补上 id 即可。

**Q: 构建报 `site` 未配置？**
`astro.config.mjs` 的 `site` 必须是完整 URL（含 `https://`），
否则 sitemap 与绝对地址无法生成。

**Q: 部署后俄语显示成乱码 / 方块？**
检查服务器是否返回了正确的 `Content-Type: text/html; charset=utf-8`。
本项目所有 HTML 均为 UTF-8，乱码通常是服务器未声明编码。

---

© Foshan Hongyun Jiangtian Packaging Materials Co., Ltd · bagjt.com
