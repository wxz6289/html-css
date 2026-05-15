# IntersectionObserver

浏览器原生 API，用于**异步**监测目标元素与「根元素」可视区域的**交叉状态**（是否可见、可见比例等）。适合懒加载、曝光统计、无限滚动、进入视口动画等，无需在 `scroll` 里反复调用 `getBoundingClientRect()`。

本目录可运行示例：[index.html](./index.html)（`lazy-observe.js`）。

---

## 与 scroll 方案对比

| 方案 | 是否需手动节流 | 是否依赖 scroll | 浏览器优化 |
|------|----------------|-----------------|------------|
| `scroll` + `getBoundingClientRect()` | 通常需要 | 重度依赖 | 中等 |
| `IntersectionObserver` | 不需要 | 不依赖 | 高（异步批处理） |

---

## 构造函数与选项

```js
const observer = new IntersectionObserver(callback, options);
observer.observe(targetElement);
// observer.unobserve(targetElement);
// observer.disconnect();
```

| 选项 | 含义 | 常见取值 |
|------|------|----------|
| `root` | 作为视口的滚动容器；`null` 为浏览器视口 | `null`、某个可滚动 `div` |
| `rootMargin` | 相对 root 的边距，**扩大或缩小**检测区域（CSS margin 语法） | `'0px'`、`'200px 0px'`（提前加载） |
| `threshold` | 目标可见比例达到多少时触发回调 | `0`（刚碰到）、`0.5`、`1` 或数组 `[0, 0.25, 1]` |

回调中的 **`IntersectionObserverEntry`** 常用字段：

| 字段 | 说明 |
|------|------|
| `isIntersecting` | 是否与 root 相交（多数场景用这个判断「进入」） |
| `intersectionRatio` | 相交面积占目标面积比例，0～1 |
| `target` | 被观察的 DOM 节点 |
| `boundingClientRect` | 目标相对视口的位置与尺寸 |
| `intersectionRect` | 实际相交区域 |

---

## 场景一：图片懒加载

**思路**：HTML 只写 `data-src`，不写 `src`；进入视口后再赋值，并 `unobserve` 避免重复触发。

```html
<img class="lazy" data-src="photo.jpg" alt="示例" width="640" height="360">
```

```js
function loadImage(img) {
  const src = img.dataset.src;
  if (!src || img.classList.contains('is-loaded')) return;
  img.src = src;
  img.classList.add('is-loaded');
}

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    loadImage(entry.target);
    observer.unobserve(entry.target); // 加载一次即可
  });
}, {
  root: null,
  rootMargin: '120px 0px', // 距视口还有 120px 时就开始加载
  threshold: 0.01,
});

document.querySelectorAll('img[data-src]').forEach((img) => io.observe(img));
```

**要点**

- `rootMargin: '120px 0px'` 可实现「还没滚到就预加载」。
- 加载完成后务必 `unobserve`，否则滚动来回可能重复回调。
- 现代浏览器也可配合 `<img loading="lazy">`，IO 适合更细的控制（预加载距离、统一埋点等）。

---

## 场景二：曝光埋点（广告 / 模块统计）

**思路**：元素在视口内停留且可见比例达标时上报一次；离开视口可重置，便于「再次进入再次曝光」统计。

```js
const reported = new WeakSet();

const exposureObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      if (reported.has(el)) return;
      reported.add(el);
      track('module_exposure', { id: el.dataset.trackId });
    }
  });
}, { threshold: [0, 0.5, 1] });

document.querySelectorAll('[data-track-id]').forEach((el) => {
  exposureObserver.observe(el);
});
```

**要点**

- `threshold` 用数组可在多个可见比例档位触发，便于区分「刚露头」与「过半可见」。
- 若只需「终身一次」曝光，上报后 `unobserve`；若需多次曝光，在 `!isIntersecting` 时从 `WeakSet` 逻辑中清除对应标记。

---

## 场景三：无限滚动（加载更多）

**思路**：在列表底部放一个**哨兵元素**（sentinel），进入视口时请求下一页，请求期间可暂时 `unobserve` 防止重复触发。

```html
<ul id="list"></ul>
<div id="sentinel" aria-hidden="true"></div>
```

```js
let loading = false;
let page = 1;

const sentinel = document.getElementById('sentinel');

const scrollObserver = new IntersectionObserver(async (entries) => {
  const entry = entries[0];
  if (!entry.isIntersecting || loading) return;

  loading = true;
  scrollObserver.unobserve(sentinel);

  const items = await fetchPage(++page);
  appendToList(items);

  loading = false;
  scrollObserver.observe(sentinel); // 新内容渲染后再观察
}, { rootMargin: '200px' });

scrollObserver.observe(sentinel);
```

**要点**

- 只观察底部哨兵，比观察列表里每一项更省。
- 加载中加锁 + 临时 `unobserve`，避免快速滚动时并发多次请求。

---

## 场景四：进入视口触发动画 / 样式

**思路**：相交时加 class，用 CSS 做过渡或动画；只需播放一次则 `unobserve`。

```html
<div class="reveal">内容</div>
```

```css
.reveal { opacity: 0; transform: translateY(24px); transition: 0.5s ease; }
.reveal.is-visible { opacity: 1; transform: none; }
```

```js
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
```

**要点**

- 动画逻辑放在 CSS，JS 只负责「何时加 class」，性能更好。
- 需要「滚出再滚入再播」时，不要 `unobserve`，在 `!isIntersecting` 时移除 class。

---

## 场景五：在指定滚动容器内观察

列表放在内部可滚动 `div` 里时，把该容器设为 `root`：

```html
<div id="scroll-root" style="height: 300px; overflow: auto;">
  <div class="item">…</div>
</div>
```

```js
const root = document.getElementById('scroll-root');

const innerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry.isIntersecting, entry.target);
  });
}, { root, threshold: 0.1 });

root.querySelectorAll('.item').forEach((el) => innerObserver.observe(el));
```

**要点**

- `root` 必须是目标元素的**祖先**且为可滚动容器；否则观察结果不符合预期。

---

## 实践建议

1. **能停就停**：一次性逻辑（懒加载、单次动画）在完成后 `unobserve`。
2. **组件卸载**：SPA 路由切换或节点移除时调用 `disconnect()`，防止泄漏。
3. **预加载**：用 `rootMargin` 正值扩大检测区，比把 `threshold` 调得很小更直观。
4. **回调保持轻量**：耗时操作（请求、复杂计算）放到微任务或队列，避免阻塞同一帧内多条 entry 的处理。
5. **兼容性**：现代浏览器均已支持；极老环境需 polyfill 或降级为 `scroll` + 节流。

---

## 本仓库示例

| 文件 | 说明 |
|------|------|
| [index.html](./index.html) | 可交互懒加载：调节 `threshold` / `rootMargin`、页面日志、三张图 |
| [lazy-observe.js](./lazy-observe.js) | 懒加载核心逻辑（ESM） |

本地用静态服务打开 `index.html`，向下滚动即可看到 `data-src` → `src` 与日志输出。
