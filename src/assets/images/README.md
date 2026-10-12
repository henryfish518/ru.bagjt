# 图片资源占位说明

本目录用于存放**真实图片**。当前项目使用内置的占位图（SVG 图标 + 说明文字），
不包含任何真实图片，方便你先跑通项目再逐步替换。

## 需要放入的图片

> 产品分类来源：中文官网 robotf.cn「产品中心」的 8 个真实分类。

| 文件名 | 用途 | 建议尺寸 | 引用位置 |
|---|---|---|---|
| `hero-fibc.jpg` | 首页主视觉 | 1200×900 | `src/components/Hero.astro` |
| `factory.jpg` | 厂区 / 车间图 | 1200×900 | `src/pages/[lang]/about.astro` |
| `products/universal.jpg` | 通用吨袋 | 800×500 | `src/components/ProductCard.astro` |
| `products/food-grade.jpg` | 食品级吨袋 | 800×500 | 同上 |
| `products/heavy-duty.jpg` | 重型吨袋 | 800×500 | 同上 |
| `products/inner-baffle.jpg` | 内拉筋吨袋 | 800×500 | 同上 |
| `products/acid-alkali.jpg` | 耐酸碱吨袋 | 800×500 | 同上 |
| `products/heat-resistant.jpg` | 耐高温集装袋 | 800×500 | 同上 |
| `products/type-d.jpg` | TYPE-D 导电集装袋 | 800×500 | 同上 |
| `products/type-c.jpg` | TYPE-C 防静电集装袋 | 800×500 | 同上 |

## 替换方法（示例）

以首页 Hero 为例，打开 `src/components/Hero.astro`：

```diff
- ---
- import { Image } from 'astro:assets';
+ ---
+ import { Image } from 'astro:assets';
+ import heroImg from '@/assets/images/hero-fibc.jpg';
```

然后把占位块：

```astro
<div class="img-placeholder">...</div>
```

替换为：

```astro
<Image
  src={heroImg}
  alt={imageAlt}
  widths={[480, 768, 1024]}
  sizes="(max-width: 1024px) 100vw, 520px"
  format="webp"
  quality={80}
  loading="eager"
  class="h-full w-full object-cover"
/>
```

产品卡片（`ProductCard.astro`）同理，按 `id` 静态 import 对应图片：

```astro
import imgUniversal from '@/assets/images/products/universal.jpg';
import imgFoodGrade from '@/assets/images/products/food-grade.jpg';
import imgHeavyDuty from '@/assets/images/products/heavy-duty.jpg';
import imgInnerBaffle from '@/assets/images/products/inner-baffle.jpg';
import imgAcidAlkali from '@/assets/images/products/acid-alkali.jpg';
import imgHeatResistant from '@/assets/images/products/heat-resistant.jpg';
import imgTypeD from '@/assets/images/products/type-d.jpg';
import imgTypeC from '@/assets/images/products/type-c.jpg';

const IMAGES: Record<string, ImageMetadata> = {
  'universal': imgUniversal,
  'food-grade': imgFoodGrade,
  'heavy-duty': imgHeavyDuty,
  'inner-baffle': imgInnerBaffle,
  'acid-alkali': imgAcidAlkali,
  'heat-resistant': imgHeatResistant,
  'type-d': imgTypeD,
  'type-c': imgTypeC,
};

// 然后把卡片顶部的「深蓝渐变 + 图标」占位块替换为：
<Image src={IMAGES[id]} alt={imageAlt} widths={[320, 480, 640]} format="webp" quality={78} loading="lazy"
       class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
```

> 说明：Astro 的 `Image` 组件要求**静态 import**（构建时可分析），
> 因此不能直接用模板字符串拼接路径，需要如上显式声明映射表。
> 所有图片在构建时由 sharp 压缩并转为 webp，输出到 `dist/_astro/`。

## 图片建议

- **格式**：源文件用 JPG / PNG 即可，构建时自动转 WebP。
- **压缩**：单张控制在 300 KB 以内，长边不超过 1600 px。
- **命名**：全部小写，单词用连字符分隔（利于 SEO 与 CDN 缓存）。
- **alt 文本**：已在各语言包的 `imageAlt` 字段中按 RU/EN 分别写好，替换图片时保留即可。
