const DEFAULT_OPTIONS = {
  padding: 10,
  arrowSize: 5,
  gridSize: 10,
  pointSize: 2,
  yLabels: [0, '50k', '100k', '150k'],
  yDivisor: 200,
  xStep: 50,
  yearMonthGap: 10,
  colors: {
    grid: '#eee',
    axis: '#000',
    line: 'blue',
  },
};

/** @param {string} dateStr 形如 2016-01 */
function monthSlot(dateStr, baseYear, yearMonthGap) {
  const [year, month] = dateStr.split('-').map(Number);
  if (year > baseYear) {
    return (year - baseYear) * yearMonthGap + month;
  }
  return month;
}

export class LineChart {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Partial<typeof DEFAULT_OPTIONS>} options
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.opts = { ...DEFAULT_OPTIONS, ...options };

    const { padding } = this.opts;
    this.x0 = padding;
    this.y0 = canvas.height - padding;
  }

  /** @param {{ x: string, y: number }[]} data */
  render(data) {
    this.clear();
    this.drawGrid();
    this.drawAxes(data);
    this.drawSeries(data);
  }

  clear() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  drawGrid() {
    const { ctx, canvas, opts } = this;
    const { gridSize, colors } = opts;
    const { width, height } = canvas;

    ctx.strokeStyle = colors.grid;

    const rows = Math.floor(height / gridSize);
    for (let i = 0; i <= rows; i++) {
      const y = i * gridSize - 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const cols = Math.floor(width / gridSize);
    for (let i = 0; i <= cols; i++) {
      const x = i * gridSize - 0.5;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  }

  /** @param {{ x: string, y: number }[]} data */
  drawAxes(data) {
    const { ctx, canvas, opts, x0, y0 } = this;
    const { padding, yLabels, colors } = opts;
    const { width, height } = canvas;

    const yStep = height / (yLabels.length - 1);
    yLabels.forEach((label, i) => {
      const y = yStep * (yLabels.length - 1 - i) + padding;
      ctx.fillText(String(label), 0, y);
    });

    const xSlotWidth = width / data.length;
    data.forEach((item, i) => {
      const textWidth = ctx.measureText(item.x).width;
      const x = xSlotWidth * i + padding - textWidth / 2;
      ctx.fillText(item.x, x, height);
    });

    this.strokeAxis(x0, y0, width - padding, y0, colors.axis);
    this.strokeAxis(x0, y0, padding, padding, colors.axis, true);
  }

  strokeAxis(x1, y1, x2, y2, color, vertical = false) {
    const { ctx, opts } = this;
    const { arrowSize } = opts;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    if (vertical) {
      ctx.lineTo(x2 + arrowSize / 2, y2 + arrowSize);
      ctx.lineTo(x2 - arrowSize / 2, y2 + arrowSize);
      ctx.lineTo(x2, y2);
    } else {
      ctx.lineTo(x2 - arrowSize, y2 + arrowSize / 2);
      ctx.lineTo(x2 - arrowSize, y2 - arrowSize / 2);
      ctx.lineTo(x2, y2);
    }

    ctx.stroke();
    ctx.fill();
  }

  /** @param {{ x: string, y: number }[]} data */
  drawSeries(data) {
    const { ctx, opts, x0, y0 } = this;
    const { pointSize, xStep, yDivisor, yearMonthGap, colors } = opts;
    const baseYear = Number(data[0].x.split('-')[0]);

    let prevX = 0;
    let prevY = 0;

    data.forEach((item, index) => {
      const slot = monthSlot(item.x, baseYear, yearMonthGap);
      const x = x0 + slot * xStep;
      const y = y0 - item.y / yDivisor;

      this.drawPoint(x, y, pointSize);

      if (index > 0) {
        ctx.beginPath();
        ctx.strokeStyle = colors.line;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      const label = String(item.y);
      const textWidth = ctx.measureText(label).width;
      ctx.fillText(label, x - textWidth / 2, y - 10);

      prevX = x;
      prevY = y;
    });
  }

  drawPoint(x, y, size) {
    const { ctx } = this;
    const half = size / 2;

    ctx.beginPath();
    ctx.rect(x - half, y - half, size, size);
    ctx.closePath();
    ctx.fill();
  }
}
