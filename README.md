# html-css

---

## 仓库里有什么

| 层级 | 内容 |
|------|------|
| **HTML** | 系统笔记 + 可运行的静态示例 |
| **CSS** | 笔记、布局专题、Tailwind 小工程、参考书配套示例 |
| **JavaScript** | 浏览器 API、事件、Worker、Canvas 等 demo |
| **方法论** | 前端三层结构与学习路径总览 |

本仓库**不**是单一框架应用，而是按主题分目录沉淀资料；各子目录可独立打开 HTML 或用本地静态服务预览。

---

## 目录结构

```
html-css/
├── README.md                 # 本文件（仓库导航）
├── frontend-fundamentals.md    # 前端基础：知识体系、学习方法、JS 脉络
├── html/
│   ├── html.md               # HTML 系统笔记（含进阶：dialog、焦点、Web Components）
│   ├── xpath.md
│   ├── form/                 # 表单示例
│   ├── table/                # 表格示例
│   ├── iframe/               # iframe 嵌入
│   ├── img-map/              # 图像映射
│   └── ol-list/              # 列表示例
├── css/
│   ├── notes/                # CSS 笔记（Flex/Grid、面试、规范等）
│   ├── tailwind/             # Tailwind CSS 小项目（需安装依赖）
│   ├── examples/             # 零散 HTML/CSS 示例
│   ├── stylus/               # Stylus 笔记
│   ├── Tiny-CSS-Projects/    # 《Tiny CSS Projects》配套
│   └── csstdg4figs/          # 《CSS 权威指南》第 4 版图例
└── javascript/
    ├── defer-async/          # script defer / async
    ├── event/                # 事件
    ├── web-worker/           # Web Worker
    ├── canvas/               # Canvas
    ├── IntersectionObserver/
    ├── ResizeObserver/
    ├── websocket/
    └── test/                 # 算法、DOM 等小实验
```

---

## 文档从哪里读

| 你想了解… | 打开 |
|-----------|------|
| **HTML 语法、表单、媒体、SVG、校验、进阶组件** | [`html/html.md`](./html/html.md) |
| **前端整体知识框架与 JS 学习脉络** | [`frontend-fundamentals.md`](./frontend-fundamentals.md) |
| **CSS 基础、选择器、布局、层叠** | [`css/notes/README.md`](./css/notes/README.md) 及同目录专题 |
| **XPath** | [`html/xpath.md`](./html/xpath.md) |
| **IntersectionObserver / ResizeObserver** | 各目录下同名 `.md` |

> 根目录曾有一份长篇 HTML 草稿，已整理并入 **`html/html.md`**；请以该文件为准，避免重复维护。

---

## 快速开始

### 克隆

**作为 frontend-lab 子模块（推荐）**

```bash
git clone --recurse-submodules git@github.com:wxz6289/frontend-lab.git
cd frontend-lab/html-css
```

**仅本仓库**

```bash
git clone git@github.com:wxz6289/html-css.git
cd html-css
```

### 浏览 HTML / JS 示例

多数示例为静态页面，可直接用浏览器打开，例如：

```bash
open html/form/index.html
open javascript/event/index.html
```

需要避免 `file://` 限制时，可在仓库根目录起静态服务：

```bash
python3 -m http.server 8080
# 访问 http://localhost:8080/html/form/index.html
```

### Tailwind 小工程

```bash
cd css/tailwind
pnpm install    # 或 yarn install
pnpm run build  # 监听编译 src/input.css → dist/output.css
```

入口页：`css/tailwind/src/index.html`（引用编译后的样式）。

---

## 在子模块中开发与推送

日常修改在本仓库完成，提交到 **`wxz6289/html-css`**；父仓 **frontend-lab** 只记录子模块 **commit 指针**。

```bash
# 在 html-css 目录内
git add html/html.md README.md   # 示例
git commit -m "docs: update html notes"
git push origin master

# 回到 frontend-lab 根目录
cd ..
git add html-css
git commit -m "chore: bump html-css submodule"
git push origin main
```

---

## 学习建议（简）

1. 先读 **`frontend-fundamentals.md`** 建立 HTML → CSS → JS 三层结构。
2. 按 **`html/html.md`** 目录顺序学 HTML，并对照 **`html/*`** 示例动手改。
3. CSS 以 **`css/notes/`** 为主，需要工具链时再进 **`css/tailwind/`**。
4. JS 以 **`javascript/`** 下各主题为单元，配合 MDN 与 `frontend-fundamentals.md` 中的 JS 章节。

---

## 相关链接

- 父聚合仓：[wxz6289/frontend-lab](https://github.com/wxz6289/frontend-lab)
- [MDN Web 文档](https://developer.mozilla.org/zh-CN/)
- [MDN：Learn HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML) · [Learn CSS](https://developer.mozilla.org/zh-CN/docs/Learn/CSS) · [Learn JavaScript](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript)

---

*本 README 仅作仓库导航；技术细节以各专题 Markdown 与示例代码为准。*
