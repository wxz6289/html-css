/**
 * IntersectionObserver 懒加载演示：进入视口后设置 src，并输出交叉状态日志。
 */
function loadImage(img) {
  const src = img.dataset.src;
  if (!src || img.classList.contains('is-loaded')) return;
  img.src = src;
  img.classList.add('is-loaded');
}

export function setupLazyLoadDemo({
  gallery,
  logList,
  thresholdInput,
  thresholdValue,
  rootMarginSelect,
  resetBtn,
}) {
  let observer = null;

  function log(message) {
    const item = document.createElement('li');
    item.textContent = message;
    logList.append(item);
    item.scrollIntoView({ block: 'nearest' });
  }

  function readOptions() {
    return {
      root: null,
      rootMargin: rootMarginSelect.value,
      threshold: Number(thresholdInput.value),
    };
  }

  function bindObserver() {
    observer?.disconnect();
    const options = readOptions();
    thresholdValue.textContent = String(options.threshold);

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const label = entry.target.dataset.label ?? entry.target.alt;
        const ratio = entry.intersectionRatio.toFixed(2);

        if (entry.isIntersecting) {
          log(`进入视口 · ${label} · ratio ${ratio}`);
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    gallery.querySelectorAll('img[data-src]:not(.is-loaded)').forEach((img) => {
      observer.observe(img);
    });
  }

  function reset() {
    observer?.disconnect();
    logList.replaceChildren();
    gallery.querySelectorAll('img[data-src]').forEach((img) => {
      img.removeAttribute('src');
      img.classList.remove('is-loaded');
    });
    bindObserver();
    log('已重置，请向下滚动触发观察');
  }

  thresholdInput.addEventListener('input', () => {
    thresholdValue.textContent = thresholdInput.value;
  });

  thresholdInput.addEventListener('change', bindObserver);
  rootMarginSelect.addEventListener('change', bindObserver);
  resetBtn.addEventListener('click', reset);

  bindObserver();
  log('观察已启动（修改 threshold / rootMargin 会重建 Observer）');
}
