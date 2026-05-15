/**
 * 在页面上演示 DOM 事件捕获 → 目标 → 冒泡 的顺序。
 * @param {object} options
 * @param {HTMLElement} options.root 最外层容器（注册捕获/冒泡）
 * @param {HTMLElement} options.target 实际点击目标（一般为 button）
 * @param {HTMLElement} options.logList 用于输出顺序的 <ol>
 * @param {HTMLInputElement} options.captureToggle 是否注册捕获监听
 * @param {HTMLInputElement} options.stopPropToggle inner 捕获时 stopPropagation
 */
export function setupEventPhaseDemo({
  root,
  target,
  logList,
  captureToggle,
  stopPropToggle,
}) {
  const layers = [
    { el: root, name: 'outer（外层 div）' },
    { el: root.querySelector('[data-layer="middle"]'), name: 'middle（中层 div）' },
    { el: target, name: 'inner（按钮）' },
  ].filter((layer) => layer.el);

  const controllers = [];

  function clearLog() {
    logList.replaceChildren();
  }

  function appendLog(phase, name) {
    const item = document.createElement('li');
    item.textContent = `${phase}：${name}`;
    logList.append(item);
    item.scrollIntoView({ block: 'nearest' });
  }

  function removeListeners() {
    controllers.forEach((c) => c.abort());
    controllers.length = 0;
  }

  function bindListeners() {
    removeListeners();

    for (const { el, name } of layers) {
      if (captureToggle.checked) {
        const captureCtrl = new AbortController();
        el.addEventListener(
          'click',
          (event) => {
            appendLog('捕获阶段', name);
            if (
              stopPropToggle.checked &&
              el === target &&
              event.eventPhase === Event.CAPTURING_PHASE
            ) {
              event.stopPropagation();
              appendLog('—', 'inner 调用了 stopPropagation()，后续捕获/冒泡被截断');
            }
          },
          { capture: true, signal: captureCtrl.signal },
        );
        controllers.push(captureCtrl);
      }

      const bubbleCtrl = new AbortController();
      el.addEventListener(
        'click',
        (event) => {
          if (el === target && event.eventPhase === Event.AT_TARGET) {
            appendLog('目标阶段', name);
          } else if (event.eventPhase === Event.BUBBLING_PHASE) {
            appendLog('冒泡阶段', name);
          }
        },
        { capture: false, signal: bubbleCtrl.signal },
      );
      controllers.push(bubbleCtrl);
    }
  }

  root.addEventListener('click', clearLog, { capture: true });

  captureToggle.addEventListener('change', bindListeners);
  stopPropToggle.addEventListener('change', () => {
    if (stopPropToggle.checked) {
      captureToggle.checked = true;
    }
    bindListeners();
  });

  bindListeners();
}
