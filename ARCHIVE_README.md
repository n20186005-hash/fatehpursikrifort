# Fatehpur Sikri Heritage Guide — Complete Archive

本归档包含网站的完整可编辑源代码、生产构建产物、依赖锁定文件、站点图标与所有在本项目中整理或生成的图片资源。为便于迁移，图片副本集中放在 `assets/` 目录；原项目使用的托管资源 URL 与图片文件名映射如下。

| 页面资源 | 归档内文件 |
| --- | --- |
| 布兰德门真实照片 | `assets/buland-darwaza-wikimedia.jpg` |
| 法泰赫普尔西克里庭院真实照片 | `assets/fatehpur-courtyard-unsplash.jpg` |
| 法泰赫普尔西克里 Diwan 建筑真实照片 | `assets/fatehpur-diwan-unsplash.jpg` |
| 品牌尖拱标志（网页压缩版） | `assets/fatehpur-brand-mark.png` |
| 品牌尖拱标志（原始版） | `assets/fatehpur-brand-mark_original.png` |
| 主视觉尖拱纹样 | `assets/fatehpur-hero-arch-pattern.png` |
| Jali 几何纹样 | `assets/fatehpur-jali-pattern.png` |
| 砂岩纹理装饰图 | `assets/fatehpur-stone-detail.png` |

## 目录说明

| 路径 | 内容 |
| --- | --- |
| `client/` | React 前端源码、页面、样式、图标与公开文件。 |
| `server/`、`shared/` | 模板兼容层源文件。 |
| `dist/` | 已通过构建的生产输出。 |
| `assets/` | 全部原始图片资源副本。 |
| `package.json`、`pnpm-lock.yaml` | 可复现依赖与脚本定义。 |

## 迁移提示

当前项目在托管预览中以 `/manus-storage/` 地址引用图片。若迁移至其他托管环境，请先将 `assets/` 中图片上传到目标静态资产位置，再在 `client/src/pages/Home.tsx` 与 `client/index.html` 中按文件名替换相应的图片 URL。`pnpm install --frozen-lockfile`、`pnpm check` 与 `pnpm build` 是推荐的本地校验流程。
