# HTML 学习笔记

## 目录

**概览与基础**

1. [重点速览](#1-重点速览)
2. [学习大纲](#2-学习大纲)
3. [Web 技术分工](#3-web-技术分工)
4. [核心概念](#4-核心概念)
5. [DOM 与 HTML API](#5-dom-与-html-api)
6. [文档整体结构](#6-文档整体结构)
7. [HTML 头部 `head`](#7-html-头部-head)

**标记与结构**

1. [标记文本与语义](#8-标记文本与语义)
2. [列表与描述列表](#9-列表与描述列表)
3. [字符实体](#10-字符实体)
4. [页面分区与无语义容器](#11-页面分区与无语义容器)
5. [链接 `a`](#12-链接-a)
6. [图像](#13-图像)
7. [引用、联系人与代码](#14-引用联系人与代码)
8. [时间与页面区段](#15-时间与页面区段)

**媒体与嵌入**

1. [音频与视频](#16-音频与视频)
2. [嵌入内容与 `iframe`](#17-嵌入内容与-iframe)
3. [位图、矢量图与 SVG](#18-位图矢量图与-svg)
4. [响应式图片](#19-响应式图片)

**表格、表单与脚本**

1. [表格](#20-表格)
2. [表单](#21-表单)
3. [表单安全与校验](#22-表单安全与校验)
4. [通过 JavaScript 提交表单](#23-通过-javascript-提交表单)
5. [文档加载事件](#24-文档加载事件)
6. [关于 CSS](#25-关于-css)

**进阶**（原 `html2.md` 专题）

1. [`details` / `summary`](#26-details--summary)
2. [`dialog`](#27-dialog)
3. [焦点与键盘](#28-焦点与键盘)
4. [`template`、Shadow DOM、`slot`](#29-templateshadow-domslot)

**附录**

1. [通用最佳实践清单](#30-通用最佳实践清单)
2. [延伸阅读](#31-延伸阅读)

---

## 1. 重点速览

| 原则 | 说明 |
|------|------|
| **语义优先** | 用 `nav`、`main`、`article` 等表达结构，而不是堆砌 `div` |
| **结构与表现分离** | HTML 描述含义；视觉交给 **CSS**，行为交给 **JavaScript** |
| **无障碍（a11y）** | 标题层级、`alt`、`label`、键盘可操作性与读屏软件友好 |
| **可维护** | 标题不跳级、链接文案可读、表单必做**服务端校验** |

| 进阶主题 | 核心价值 |
|----------|----------|
| **`details` / `summary`** | 无 JS 的折叠面板 |
| **`dialog`** | 原生对话框与焦点协助 |
| **焦点** | 键盘与读屏用户能否完成流程 |
| **`template` + Shadow DOM + `slot`** | Web Components 与样式隔离 |

---

## 2. 学习大纲

原 **`html.md`** 大纲 + 原 **`html2.md`** 系统笔记主题（建议学习顺序）：

- 文档结构 · 元数据 · 属性
- 标题和段落 · 列表 · 导航
- 链接和图像 · 表格 · 表单
- 音频和视频
- 模版、`slot` 和 Shadow DOM · HTML API · 焦点
- 详细信息与摘要（`details`）· 对话框（`dialog`）

---

## 3. Web 技术分工

| 技术 | 职责 |
|------|------|
| **HTML** | 网页内容的含义与结构 |
| **CSS** | 网页的表现与展示 |
| **JavaScript** | 功能与行为 |

**主要概念**：**元素**（含**空元素**）、**标签**、**属性**、**内容**。

---

## 4. 核心概念

**HTML** 是描述网页文档结构的标准标记语言，由元素与属性组成，以有意义的方式组织内容。

### 4.1 元素类型

| 类型 | 说明 | 示例 |
|------|------|------|
| **非替换元素** | 有起始/结束标记，内容由标签包裹 | `p`、`div`、`section` |
| **替换元素** | 内容由外部资源替换显示，默认样式受 UA 约束 | `img`、`video`、`iframe` |
| **空元素（void）** | 无结束标记、不能嵌套子元素 | `br`、`img`、`input`、`meta`、`link`、`source`、`track` 等 |

> **注意**：多数替换元素是 void，但 **`video`、`audio`、`picture`、`object`、`iframe`** 可有子节点（如 `source`、`track`）。**自闭合写法**（如 `<img />`）在 HTML5 中等同于 void 元素。

### 4.2 属性

- 仅出现在**起始标签**，一般为 `name="value"`；值建议用引号包裹。
- **标签名**在规范中通常不区分大小写；**`id` / `class` 等取值**常区分大小写。
- 属性定义元素的行为、关联与功能，**不在正文中展示**。

### 4.3 语义与用户代理

- **用户代理样式表（UA stylesheet）** 提供默认外观。
- 元素**语义（含隐式 role）** 对辅助技术与 **SEO** 很重要。

**最佳实践**：HTML 用于**构建内容含义**，不要用无语义标签「画版面」。

---

## 5. DOM 与 HTML API

**DOM** 是 HTML 文档结构与内容在内存中的表示。浏览器解析 HTML 时为每个元素与文本创建 **节点**（元素节点、文本节点），构成 **DOM 树**。

- **`HTMLElement`**：表示 HTML 元素及其**所有后代节点**的基类接口。
- 各元素通过专用接口实现（如 **`HTMLAnchorElement`**、**`HTMLImageElement`**），各有构造函数、方法与属性。
- 经 `HTMLElement` 可访问**全局属性**，以及 **input、pointer、transition、animation** 等事件。
- **自定义元素**：`customElements.define` + 继承 `HTMLElement` 的类。

**最佳实践**

- DOM 相关初始化放在 **`DOMContentLoaded`** 之后（见 [§24](#24-文档加载事件)）。
- 批量插入用 **`DocumentFragment`** 或克隆 **`<template>`**；事件用**委托**减少监听器。

**参考**：[MDN HTML DOM API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API)

---

## 6. 文档整体结构

```html
<!DOCTYPE html>          <!-- 文档类型：HTML5 -->
<html lang="zh-CN">      <!-- 根元素；lang 利于无障碍与 SEO -->
  <head>...</head>       <!-- 元数据 -->
  <body>...</body>       <!-- 可见内容 -->
</html>
```

**最佳实践**：`lang` 使用真实语言代码（如 `zh-CN`、`en-US`）。

---

## 7. HTML 头部 `head`

`head` 存放不直接渲染、但对文档与资源加载重要的信息。

| 元素 | 作用 |
|------|------|
| **`title`** | 文档标题（浏览器标签页） |
| **`meta`** | 编码、作者、描述、Open Graph 等 |
| **`link`** | 样式表、favicon 等 |
| **`script`** | 脚本（也可放在 `body` 末尾） |

### `meta` 常见写法

- `charset="utf-8"`（应尽早出现）
- `name="author"` / `name="description"`
- `property="og:image"` 等 Open Graph

### 示例

```html
<link rel="icon" href="/favicon.ico" type="image/png" />
<link rel="stylesheet" href="styles.css" />
<script src="app.js" defer></script>
```

**最佳实践**：favicon 用 **`rel="icon"`**（`shortcut icon` 为历史写法）；外链脚本常用 **`defer`** / **`async`**。

---

## 8. 标记文本与语义

### 8.1 标题

- **`h1`～`h6`**：进入文档大纲；对无障碍与 **SEO** 重要。
- **不要跳级**（如 `h1` 后直接 `h4`）。
- **`header`**：页头或区块头。

### 8.2 段落与分隔

- **`p`**：段落 · **`br`**：换行（少用堆砌排版）· **`hr`**：主题分隔。

### 8.3 块引用

- **`blockquote`**：块级引用。

### 8.4 短语级（行内）语义

| 元素 | 语义 | 典型样式 |
|:----:|------|----------|
| `abbr` | 缩写 | 配 `title` |
| `b` | 关键词等（无语义强调时） | 加粗 |
| `cite` | 作品名 | 常斜体 |
| `code` | 代码 | 等宽 |
| `dfn` | 术语 | 常斜体 |
| `em` | 语气强调 | 常斜体 |
| `i` | 外文、术语等 | 常斜体 |
| `kbd` | 按键 | 等宽 |
| `mark` | 高亮 | 背景高亮 |
| `samp` | 程序输出 | 等宽 |
| `small` | 附属细则 | 小号 |
| `strong` | 强烈重要 | 加粗 |
| `sub` / `sup` | 下标 / 上标 | — |
| `var` | 变量 | 常斜体 |
| `u` | 专名等 | 下划线（慎用） |

**最佳实践**：优先语义标签，而非仅用 `b`/`i` 做样式。

---

## 9. 列表与描述列表

### 有序 `ol`

`type`（`1|A|a|I|i`）、`start`、`reversed`。

### 无序 `ul`

子项为 **`li`**。

### 描述 `dl`

- **`dt`**：术语（可对应多个 **`dd`**）
- **`dd`**：说明（术语与定义、问答等）

---

## 10. 字符实体

| 显示 | 写法 |
|:----:|------|
| `"` | `&quot;` |
| `'` | `&apos;` 或 `&#39;` |
| `&` | `&amp;` |
| `<` / `>` | `&lt;` / `&gt;` |
| 不间断空格 | `&nbsp;` |

---

## 11. 页面分区与无语义容器

### 语义化分区（HTML5）

| 元素 | 用途 |
|------|------|
| `header` | 页头或区块头 |
| `nav` | 主导航 |
| `main` | **整页唯一**主内容 |
| `footer` | 页脚 |
| `aside` | 侧栏 |
| `article` | 独立成篇 |
| `section` | 主题分组（宜配标题） |

### 无语义

- **`div`**（块级）· **`span`**（行内）

**最佳实践**：无合适语义时才用 `div` / `span`。

### 典型页面组成

1. 页头 `header`（Logo、标题）
2. 导航 `nav`
3. 主内容 `main`（`article`、`section` 等）
4. 侧栏 `aside`
5. 页脚 `footer`（版权、联系）

---

## 12. 链接 `a`

| 属性 | 说明 |
|------|------|
| `href` | `https://…`、`mailto:`、`tel:`、`#id` |
| `title` | 补充说明 |
| `target` | `_blank` 时建议 `rel="noopener noreferrer"` |

### `mailto` 示例

```html
<a href="mailto:user@example.org?cc=cc@example.org&subject=Topic&body=Hello">
  发送邮件
</a>
```

### 最佳实践

1. 链接文案表意清晰。
2. 站内优先**相对 URL**。
3. 非 HTML 资源（PDF 等）明确提示。
4. 下载用 **`download`**（同源等允许场景）。

---

## 13. 图像

### 工具

GIMP、Photoshop、Photopea 等。

### `img` 属性

| 属性 | 说明 |
|------|------|
| `src` | 必填 |
| `alt` | 替代文本；装饰图用 `alt=""` |
| `title` | 补充说明（不能替代 `alt`） |
| `width` / `height` | 减少布局抖动（CLS） |

### 图片角色

1. **装饰** → CSS `background-image`
2. **内容** → `img` + 有意义 `alt`
3. **链接** → `<a><img></a>`
4. **文本载体** → `alt` 或附近说明

### 图像映射

`img usemap` + **`map`**（`name`/`id`）+ **`area`**（`href`、`shape`、`coords`、`alt`）。

### 图注

```html
<figure>
  <img src="photo.jpg" alt="描述" />
  <figcaption>图 1：说明</figcaption>
</figure>
```

---

## 14. 引用、联系人与代码

| 类型 | 元素 |
|------|------|
| 块引用 | `blockquote`（可含 `cite` URL） |
| 行内引用 | `q` |
| 作品名 | `cite` |
| 联系信息 | `address` |
| 代码 | `code`、`pre`、`var`、`kbd`、`samp` |

---

## 15. 时间与页面区段

```html
<time datetime="2026-05-15">2026 年 5 月 15 日</time>
```

`datetime` 使用机器可读格式。

---

## 16. 音频与视频

### `video` / `audio`

常见属性：`src`、`controls`、`autoplay`、`loop`、`muted`、`poster`（video）、`preload`（`none|metadata|auto`）、`width`/`height`。

### 容器格式（简记）

| 格式 | 说明 |
|------|------|
| **WebM** | VP8/VP9 + Opus/Vorbis |
| **MP4** | H.264 + AAC |
| **Ogg** | 使用面渐窄 |

### `source` 与 `track`

- **`source`**：多格式备选 + `type`
- **`track`**：字幕轨；`kind="subtitles"`、`srclang`（语言）、`label`、`src`

---

## 17. 嵌入内容与 `iframe`

### `iframe`

| 属性 | 说明 |
|------|------|
| `src` | 嵌入文档 URL |
| `width` / `height` | 尺寸 |
| `allowfullscreen` | 全屏 |
| `frameborder` | `1` 显示边框（默认），`0` 去掉边框 |
| `sandbox` | 限制嵌入页能力，降低 XSS / **点击劫持** |
| 备选内容 | 写在标签内，不支持 `iframe` 时显示 |

**最佳实践**

1. 仅在必要时嵌入。
2. 使用 **HTTPS**。
3. 不可信内容**始终考虑 `sandbox`**，并配置 **CSP**。
4. 服务端配置 **`frame-ancestors`** / **`X-Frame-Options`**。

### `embed` / `object`

历史上用于 Java Applet、Flash、PDF、SVG 等通用嵌入；**现代 Web 不推荐**作为常规方案。

```html
<embed src="whoosh.swf" quality="medium"
       bgcolor="#ffffff" width="550" height="400"
       name="whoosh" align="middle" allowScriptAccess="sameDomain"
       allowFullScreen="false" type="application/x-shockwave-flash"
       pluginspage="http://www.macromedia.com/go/getflashplayer">
```

```html
<object data="mypdf.pdf" type="application/pdf"
        width="800" height="1200" typemustmatch>
  <p>无 PDF 插件时可 <a href="mypdf.pdf">下载 PDF</a>。</p>
</object>
```

---

## 18. 位图、矢量图与 SVG

| 类型 | 特点 | 格式 |
|------|------|------|
| **位图** | 像素网格，放大会糊 | PNG、JPEG、GIF、WebP |
| **矢量** | 路径描述，缩放清晰 | **SVG**（XML） |

### SVG 入门

SVG 用 XML 描述矢量图形（形状与效果），用于**图形**而非正文段落。常见元素：`circle`、`rect`、`path`、`animate`、`mask`、`feColorMatrix`（滤镜，进阶）。

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

编辑器：Inkscape、Adobe Illustrator 等。

**优点**：可缩放；内联 SVG 中文本利于 SEO/读屏；可用 CSS/JS 控制。
**缺点**：复杂时标记冗长；制作成本高于位图；需关注老旧浏览器策略。

### 引入方式（原 `html2.md`）

**`img` + SVG**

- 优点：写法熟悉，有 `alt`；可包在 `<a>` 里做链接。
- 缺点：难用 JS 操作 SVG DOM；外部 CSS 难以控制 SVG 内部；`:focus` 等伪类受限。

**内联 `<svg>`**

- 优点：少请求；可设 `class`/`id`；**唯一**便于对 SVG 做 `:focus` 与 CSS 动画的方式之一。
- 缺点：多处复用维护成本高；增大 HTML；内联 SVG 缓存策略与 `<img>` 不同。

**CSS 背景**、**`iframe` 引用 `.svg`**：分别适合装饰与隔离场景。

```html
<img src="equilateral.png" alt="等边三角形" srcset="equilateral.svg">
```

```css
.bg {
  background: url("fallback.png") no-repeat center;
  background-image: url("image.svg");
  background-size: contain;
}
```

```html
<svg width="300" height="200">
  <rect width="100%" height="100%" fill="green" />
</svg>
```

**最佳实践**：装饰用 CSS；内容型优先内联或 `img` + 有意义 `alt`。

---

## 19. 响应式图片

### 两类需求

1. **艺术方向**：不同裁切 → **`picture` + `source`**
2. **分辨率切换**：同构图多分辨率 → **`srcset` + `sizes`**

### `srcset` + `sizes`

```html
<img
  srcset="elva-fairy-320w.jpg 320w,
          elva-fairy-480w.jpg 480w,
          elva-fairy-800w.jpg 800w"
  sizes="(max-width: 320px) 280px,
         (max-width: 480px) 440px,
         800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy" />
```

浏览器流程：视口宽度 → 匹配 `sizes` 媒体条件 → 选槽宽 → 在 `srcset` 中选最接近的资源。

### `picture` 艺术方向

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg" />
  <source media="(min-width: 800px)" srcset="elva-800w.jpg" />
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva" />
</picture>
```

**为何不只靠 CSS 换背景图？** 浏览器常在解析 CSS/JS **之前**预加载 `img` 候选，需 **`srcset`/`picture`** 参与早期选择。

---

## 20. 表格

结构化行列数据：`table` → `tr` → `th` / `td`。

- **`th scope`**：`row|col|rowgroup|colgroup`（无障碍）
- **`col` / `colgroup`** · **`colspan` / `rowspan`**

**最佳实践**：复杂表头用 `scope` 或 `headers`/`id` 关联。

---

## 21. 表单

### 通用属性

`autofocus`、`disabled`、`form`、`name`、`value`；`form` 上 **`novalidate`**（仍须服务端校验）。

### `form`

`action`、`method`（`get|post`）、`enctype`（文件上传用 **`multipart/form-data`**）。

### `label` 与 `input`

`label for` ↔ 控件 `id`。`type` 含：`text`、`email`、`password`、`search`、`tel`、`url`、`number`、`range`、`date`、`datetime-local`、`month`、`time`、`week`、`color`、`file`、`hidden`、`submit` 等。

其它：`readonly`、`placeholder`、`list`（`datalist`）、`min`/`max`/`step`、`accept`、`multiple`、`checked`。

### 其它控件

`textarea`（`rows`、`cols`、`wrap`）、`button`（`submit|reset|button`）、`fieldset`/`legend`、`select`/`optgroup`/`option`、`datalist`、`progress`、`meter`（`low`、`high`、`optimum`）。

### GET 与 POST

| 方法 | 特点 |
|------|------|
| **GET** | 参数在 URL；幂等、可缓存、可分享 |
| **POST** | 数据在请求体；适合大量或敏感数据 |

相关头：`Content-Length`、`Content-Type`（如 `application/x-www-form-urlencoded`）。

---

## 22. 表单安全与校验

### 风险

**XSS**、**CSRF**、**SQL 注入**、HTTP/邮件头注入等。

### 防范

转义与 **CSP**、限制输入、上传**沙箱**与类型校验。

### 校验层次

- **客户端**：HTML5 约束 + JS（体验）
- **服务端**：**必须**（底线）

### HTML5 约束属性

`required`、`pattern`（**`textarea` 不支持**）、`minlength` / `maxlength`、`min` / `max`（`min > max` 时无效）。

### 校验通过 / 未通过时的行为

- **通过**：可用 `:valid` 样式化；提交时一般允许发送。
- **未通过**：可用 `:invalid` 样式化；提交时浏览器展示错误并**阻止提交**。

### HTML5 约束验证 API（原 `html2.md`）

- `validationMessage`、`willValidate`
- **`validity`**：`customError`、`patternMismatch`、`rangeOverflow`、`rangeUnderflow`、`stepMismatch`、`tooLong`、`typeMismatch`、`valid`、`valueMissing`
- `checkValidity()`（触发 **`invalid` 事件**）、`setCustomValidity(message)`
- 自定义错误：结合 CSS 伪类，或根据 `validity.typeMismatch` 等调用 `setCustomValidity()`

### 相关 CSS 伪类

`:valid`、`:invalid`、`:in-range`、`:out-of-range`

### 第三方库与远程校验

validate.js、jQuery Validation、valid8 等。**远程（异步）校验**注意防抖、竞态与加载状态。

### 体验要求（最佳实践）

- 显示**明确**错误信息，并**指出位置**。
- 在合理处**放宽**输入格式。
- 客户端校验改善体验，**服务端校验不可省略**。

---

## 23. 通过 JavaScript 提交表单

### 与传统提交的区别

**AJAX** 常用 **`XMLHttpRequest`** 或 **`fetch`** 构造请求并读取响应。
表单默认 **`application/x-www-form-urlencoded`**（URL 编码键值对）；含文件时需 **`multipart/form-data`**。

### 发送表单数据的常见方式（原 `html2.md`）

1. 用 DOM 构建表单，经**隐藏 `<iframe>`** 提交（极老浏览器兜底）。
2. **`XMLHttpRequest`**：编码 URL 参数并设置正确的 `Content-Type`。
3. **`XMLHttpRequest` / `fetch` + `FormData`**：适合含文件或混合字段（**推荐**）。

**参考**：[MDN：通过 JavaScript 发送表单](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript)

---

## 24. 文档加载事件

- **`DOMContentLoaded`**：HTML 解析完成，**不必等**图片、样式、子框架 → 适合 DOM 初始化。
- **`load`**：全部资源加载完 → 适合依赖图片尺寸等场景。

---

## 25. 关于 CSS

本笔记以 **HTML 结构与语义** 为主线。系统学习 **CSS**（选择器、盒模型、Flex/Grid、响应式、层叠与优先级等）见 **[`../css/`](../css/)** 与 [MDN CSS 学习区](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)。

---

## 26. `details` / `summary`（原 `html2.md` 进阶）

- **`details`**：可展开/收起的披露控件，默认闭合。
- **`summary`**：须为 **`details` 的第一个子元素**，作为可见标题。

```html
<details>
  <summary>查看运费说明</summary>
  <p>满 99 元免运费，偏远地区除外。</p>
</details>
```

**最佳实践**

1. **`summary` 文案**应能独立说明折叠区内容。
2. 重要法律信息勿仅靠默认折叠隐藏。
3. **`open`** 仅在有产品需求时默认展开。
4. 用 CSS 统一各浏览器 **`summary` 手柄**样式。

**参考**：[MDN `<details>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/details)

---

## 27. `dialog`（原 `html2.md` 进阶）

- **`dialog`**：对话框；**`.show()`** 非模态，**`.showModal()`** 模态（`::backdrop`、焦点陷阱、ESC 等）。

```html
<dialog id="confirm">
  <p>确定要删除吗？</p>
  <form method="dialog">
    <button value="cancel">取消</button>
    <button value="ok">确定</button>
  </form>
</dialog>
```

**最佳实践**

1. 模态场景优先 **`showModal()`**。
2. **`<form method="dialog">`** 的 **`value`** 可作 `dialog.returnValue`。
3. 复杂内容自测 **Tab 顺序**与焦点是否在对话框内。
4. 可配合 **`inert`**（支持的浏览器）避免背景仍可交互。

**参考**：[MDN `<dialog>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog)

---

## 28. 焦点与键盘（原 `html2.md` 进阶）

依赖键盘、读屏或开关设备的用户需要清晰的 **Tab 顺序**与可见焦点；顺序混乱等于功能不可用。

| 机制 | 说明 |
|------|------|
| Tab 顺序 | 默认 DOM 顺序；**避免 `tabindex` ≥ 1** |
| `tabindex="0"` | 进入自然 Tab 序 |
| `tabindex="-1"` | 仅脚本 `focus()` |
| `:focus-visible` | 键盘焦点环与鼠标点击区分 |

**最佳实践**

1. 提供 **skip link**（跳到 `#main`）。
2. 自定义组件对齐 **ARIA 模式**与方向键 / **Esc**。
3. 去掉 `outline` 时，用 **`:focus-visible`** 提供替代样式。

**参考**：[MDN 可访问性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility)、[WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)

---

## 29. `template`、Shadow DOM、`slot`（原 `html2.md` 进阶）

| 技术 | 作用 |
|------|------|
| **`<template>`** | 存放**不立即渲染**的 HTML，供脚本克隆 |
| **Shadow DOM** | 宿主上的封装子树，样式默认隔离 |
| **`<slot>`** | Shadow 内投影点，按 `name` 分发宿主子节点 |

**典型用途**：设计系统 / **Custom Elements**、需样式隔离的组件封装。

**最佳实践**

1. 业务页优先语义标签或框架；Web Components 适合**可复用封装层**。
2. 调试优先 **`mode: 'open'`** 的 Shadow Root。
3. 自定义元素需补齐 **ARIA** 与键盘行为。
4. **SEO / 首屏**：关键正文勿仅放在客户端 Shadow 内拼装。

**参考**：[MDN Web Components](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)

---

## 30. 通用最佳实践清单

1. 每页一个 **`main`**。
2. 标题**不跳级**。
3. `target="_blank"` + **`rel="noopener noreferrer"`**。
4. 内容图写 **`alt`**；装饰图 `alt=""`。
5. 表单 **`label for` ↔ `id`**。
6. 不可信 **`iframe`**：`sandbox` + CSP。
7. **服务端校验**不可省略。
8. HTML 表达结构，样式交给 CSS，行为交给 JS。

---

## 31. 延伸阅读

- [MDN：Learn HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML)
- [MDN：HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
- [WHATWG HTML](https://html.spec.whatwg.org/)
- [WCAG 2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/)
- 本仓库示例：`form/`、`table/`、`img-map/`、`iframe/`、`ol-list/` 等目录
