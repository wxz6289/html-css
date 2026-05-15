# 前端基础

## 一、参考资源

| 资源 | 说明 |
|------|------|
| 《JavaScript高级程序设计》 | JS 核心参考书（红宝书） |
| 《精通CSS》 | CSS 进阶，布局与架构 |
| MDN Web Docs | 前端最权威的参考文档 |

## 二、学习方法论

1. **建立知识结构** — 先搭骨架再填血肉。把零散的知识点归入体系中的位置，才能形成长期记忆。
2. **追本溯源** — 遇到问题不要只查"怎么做"，要理解"为什么"。读规范、看源码、写 demo 验证。

## 三、前端知识体系

前端三层结构：

```
        HTML（结构层）
           ↓
        CSS（表现层）
           ↓
     JavaScript（行为层）
```

### 3.1 HTML — 结构层

定义文档的**内容和语义**。核心关注点：

- **文档结构**：`<!DOCTYPE>`、`<html>`、`<head>`、`<body>`
- **语义化标签**：`<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<footer>`
- **元数据**：`<meta>`、`<title>`、`<link>`
- **内容元素**：标题 h1~h6、段落 p、列表 ol/ul/dl、表格 table、表单 form
- **嵌入元素**：图片 img/picture、音视频 video/audio、iframe、SVG

核心原则：**用正确的标签表达正确的含义**（语义化 > 样式）。

### 3.2 CSS — 表现层

控制文档的**视觉呈现和布局**。核心关注点：

- **选择器**：类型、类、ID、属性、伪类、伪元素、关系选择器
- **盒模型**：content → padding → border → margin
- **布局机制**：流式布局 → 浮动 → 定位 → Flex → Grid
- **响应式设计**：媒体查询、相对单位、弹性布局
- **层叠与继承**：特异性（specificity）、`!important`、`@layer`

核心原则：**理解"流"是 CSS 布局的基石，一切布局都是对流的管理。**

### 3.3 JavaScript — 行为层

实现文档的**交互和动态功能**。核心关注点见下文第四章。

### 3.4 三者协作

- HTML 提供结构和语义，是 CSS 和 JS 的 DOM 锚点
- CSS 通过选择器匹配 HTML 元素施加样式
- JS 通过 DOM API 操作 HTML 结构和 CSS 样式
- 关注点分离：结构(HTML) / 表现(CSS) / 行为(JS) 各司其职

## 四、JavaScript 深度

### 4.1 文法

文法定义了一门语言的**书写规则**，分为词法和语法两个层面。

#### 词法

定义语言的基本构成单元：

- **Token**：关键字、标识符、字面量、运算符、分隔符
- **标识符**：变量名、函数名，区分大小写
- **关键字**：`if`、`for`、`function`、`class`、`const`、`let`、`var` 等
- **字面量**：`42`、`"hello"`、`true`、`null`、`{ }`、`[ ]`
- **空白与注释**：空格、制表符、换行在词法分析时被忽略
- **自动分号插入（ASI）**：JS 会在换行处自动插入分号，但不应依赖此机制

#### 语法（Syntax）

定义 Token 如何组合成合法的语句和表达式：

- **表达式**：产生值的代码片段（`1 + 2`、`fn()`、`a ? b : c`）
- **语句**：执行动作的完整指令（`if`、`for`、`return`、`try/catch`）
- **声明**：`var`、`let`、`const`、`function`、`class`
- **作用域规则**：全局作用域、函数作用域、块级作用域（let/const）
- **严格模式**：`"use strict"` 消除 JS 早期的一些不合理设计

### 4.2 语义（Semantics）

语义定义了代码的**实际含义**——同样的语法在不同上下文中会有不同的语义：

- **this 绑定规则**：默认绑定、隐式绑定、显式绑定（call/apply/bind）、new 绑定、箭头函数（词法 this）
- **闭包**：函数 + 其引用的外部变量形成闭包，是 JS 模块化和数据隐私的基础
- **原型链**：`obj.__proto__` → `Constructor.prototype` → ... → `Object.prototype` → null
- **事件循环**：同步代码 → 微任务队列（Promise、MutationObserver）→ 宏任务队列（setTimeout、I/O）
- **异步模型**：回调 → Promise → async/await，本质都是对事件循环的利用

### 4.3 运行时（Runtime）

运行时描述了代码**实际执行的环境和过程**。

#### 类型系统

JS 是**动态类型 + 弱类型**语言，有 7 种原始类型和 1 种对象类型，详见第五章。

#### 执行过程

一段 JS 代码的执行分为两个阶段：

1. **编译阶段**（Creation Phase）
   - 词法分析 → 语法分析 → 生成 AST → 生成可执行代码
   - **变量提升（Hoisting）**：`var` 声明提升并初始化为 `undefined`；`let/const` 提升但不初始化（暂时性死区 TDZ）；函数声明整体提升

2. **执行阶段**（Execution Phase）
   - 创建**执行上下文（Execution Context）**：变量环境、词法环境、this 绑定
   - 执行上下文栈（调用栈）：全局上下文 → 函数上下文 → 函数返回后弹出
   - **作用域链**：当前作用域 → 外层作用域 → ... → 全局作用域

关键概念：

- **执行上下文** 包含：变量环境（var 声明）、词法环境（let/const 声明）、this 值
- **作用域** 决定了变量的**可访问性**，分为词法作用域（静态）和动态作用域
- **闭包**的产生：内部函数引用外部函数的变量，导致外部函数执行完毕后其变量环境仍被保留

## 五、JS 类型系统详解

| 类型 | 分类 | 说明 |
|------|------|------|
| Undefined | 原始类型 | 未定义，默认值 |
| Null | 原始类型 | 空值，`typeof null === "object"` 是历史 bug |
| Boolean | 原始类型 | `true` / `false` |
| Number | 原始类型 | IEEE 754 双精度浮点数，`0.1 + 0.2 !== 0.3` |
| String | 原始类型 | UTF-16 编码，不可变 |
| Symbol | 原始类型 | ES6 新增，创建唯一标识 |
| BigInt | 原始类型 | ES2020 新增，表示任意大整数 |
| Object | 引用类型 | 所有对象的基类 |

### 5.1 Undefined

- 变量声明但未赋值时为 `undefined`
- 函数无 `return` 语句时返回 `undefined`
- 访问对象不存在的属性返回 `undefined`

### 5.2 Null

- 表示"空"或"不存在"
- 原型链的终点：`Object.getPrototypeOf(Object.prototype) === null`
- `typeof null === "object"` — JS 诞生时的实现错误，沿用至今无法修复

### 5.3 Boolean

- 假值（falsy）：`false`、`0`、`""`、`null`、`undefined`、`NaN`
- 其余皆为真值（truthy），包括 `[]`、`{}`、`"0"`、`"false"`

### 5.4 Number

- 基于 IEEE 754 双精度浮点数（64 位）
- 安全整数范围：`Number.MIN_SAFE_INTEGER` ~ `Number.MAX_SAFE_INTEGER`（±2⁵³-1）
- 特殊值：`NaN`（Not a Number）、`Infinity`、`-Infinity`
- `0.1 + 0.2 !== 0.3` 是浮点数精度问题的经典案例
- `NaN !== NaN` 为 true，用 `Number.isNaN()` 检测

### 5.5 String

- 不可变（immutable）：任何字符串操作都返回新字符串
- 模板字面量（Template Literals）：`` `hello ${name}` ``
- Unicode 注意：`"😀".length === 2`（代理对）

### 5.6 Symbol

- 创建唯一标识：`Symbol("desc")`
- 用作对象属性键，防止属性名冲突
- 内置 Symbol：`Symbol.iterator`、`Symbol.toPrimitive`、`Symbol.hasInstance`
- 不可被 `for...in` 或 `Object.keys()` 遍历

### 5.7 Object

- 键值对的集合，键可以是字符串或 Symbol
- 属性描述符：`value`、`writable`、`enumerable`、`configurable`
- 访问器属性：`get`、`set`
- 常用方法：`Object.create()`、`Object.assign()`、`Object.defineProperty()`、`Object.freeze()`

### 5.8 类型转换

```
原始值转换 ToPrimitive：
  1. 优先调用 Symbol.toPrimitive
  2. 其次 valueOf()
  3. 最后 toString()

强制类型转换规则：
  - 字符串转换：String(x)、x + ""
  - 数字转换：Number(x)、+x、x - 0
  - 布尔转换：Boolean(x)、!!x
  - == 比较：允许类型转换；=== 比较：不允许类型转换
```

### 5.9 常见问题：为什么用 void 0 代替 undefined？

> `undefined` 不是 JS 的保留关键字，在旧版 JS 中可能被重新赋值（如 `var undefined = 1`）。虽然 ES5+ 在全局作用域中将其设为只读，但在函数作用域内仍可被遮蔽。`void` 运算符对任何操作数都返回纯正的 `undefined`，因此 `void 0` 是获取 `undefined` 值最安全且最简短的方式。

## 六、工程实践

### 6.1 性能优化

核心指标：**首屏时间（FCP/LCP）**、**交互时间（TTI）**、**累积布局偏移（CLS）**

加载阶段：

- 资源压缩（gzip/brotli）、Tree Shaking、Code Splitting
- 图片优化：WebP/AVIF 格式、懒加载、响应式图片（srcset/picture）
- 关键 CSS 内联、非关键 CSS 异步加载
- 合理使用缓存策略（强缓存/协商缓存）

运行时阶段：

- 避免强制同步布局（Forced Synchronous Layout）
- 使用 `requestAnimationFrame` 做动画，`requestIdleCallback` 做低优先级任务
- 虚拟列表处理长列表渲染
- Web Worker 处理 CPU 密集型任务
- 合理使用防抖（debounce）和节流（throttle）

### 6.2 工具链

| 环节 | 常用工具 |
|------|----------|
| 包管理 | npm、yarn、pnpm |
| 构建打包 | Webpack、Vite、esbuild、Rollup |
| 代码转译 | Babel、SWC、TypeScript |
| 代码质量 | ESLint、Prettier、Stylelint |
| 测试 | Vitest、Jest、Playwright、Cypress |
| 版本控制 | Git、Husky（commit hooks） |

### 6.3 持续集成（CI/CD）

- 代码提交 → 自动构建 → 自动测试 → 自动部署
- 常用平台：GitHub Actions、GitLab CI、Jenkins
- 关键实践：分支保护、PR Review、自动化回归测试

### 6.4 搭建系统

- 脚手架（Scaffold）：快速生成项目模板
- 组件库：封装可复用的 UI 组件，配合 Storybook 做文档
- 开发规范：统一的目录结构、命名规范、代码风格
- Monorepo 管理：pnpm workspace、Turborepo、Nx

### 6.5 架构与基础库

分层架构示意：

```
应用层（业务页面和组件）
    ↓
框架层（React / Vue / Angular）
    ↓
基础设施层
  ├── 网络请求（axios / fetch 封装）
  ├── 状态管理（Redux / Zustand / Pinia）
  ├── 路由（React Router / Vue Router）
  ├── 权限控制（RBAC）
  ├── 国际化（i18n）
  └── 埋点与监控（Sentry / 自研）
    ↓
构建与部署层（CI/CD）
```

设计原则：**高内聚低耦合**、**依赖倒置**、**关注点分离**。
