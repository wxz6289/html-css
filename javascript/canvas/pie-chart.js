const DEFAULT_OPTIONS = {
  centerOffsetX: 100,
  radius: 120,
  hoverRadius: 130,
  outLine: 20,
  legendDotRadius: 5,
  legendPadding: 10,
  legendRowGap: 10,
  colors: [],
  fonts: {
    legend: '20px Verdana',
    legendValue: '15px Verdana',
    calloutTitle: '20px Verdana',
    calloutLabel: '15px Verdana',
    calloutValue: '18px Verdana',
    summaryTitle: '20px Verdana',
    summaryValue: '15px Verdana',
  },
};

/**
 * @typedef {{ title: string, num: number }} PieDatum
 * @typedef {PieDatum & { angle: number, percent: string, total: string }} PieSlice
 * @typedef {{ x: number, y: number }} Pointer
 */

export class PieChart {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Partial<typeof DEFAULT_OPTIONS>} options
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.opts = { ...DEFAULT_OPTIONS, ...options };

    const { width, height } = canvas;
    const { centerOffsetX } = this.opts;

    this.cx = width / 2 + centerOffsetX;
    this.cy = height / 2;
    this.width = width;
    this.height = height;
  }

  /**
   * @param {PieDatum[]} data
   * @param {Pointer | null} pointer
   */
  render(data, pointer = null) {
    const slices = this.buildSlices(data);

    this.clear();
    this.drawSummary(slices[0]?.total ?? '0');

    let startAngle = 0;
    slices.forEach((slice, index) => {
      const endAngle = startAngle + slice.angle;
      const color = this.colorAt(index);
      const hovered =
        pointer != null && this.hitTestSlice(pointer, startAngle, endAngle);

      this.drawSlice(startAngle, endAngle, color, hovered);

      if (hovered) {
        this.drawCallout(startAngle, slice, color);
      }

      this.drawLegendRow(index, slice, slices.length, color);
      startAngle = endAngle;
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /** @param {PieDatum[]} data @returns {PieSlice[]} */
  buildSlices(data) {
    const total = data.reduce((sum, item) => sum + item.num, 0);
    const totalText = total.toFixed(1);

    return data.map((item) => ({
      ...item,
      angle: (item.num / total) * Math.PI * 2,
      percent: ((item.num / total) * 100).toFixed(1),
      total: totalText,
    }));
  }

  colorAt(index) {
    const { colors } = this.opts;
    return colors[index % colors.length] ?? '#999';
  }

  /**
   * @param {Pointer} pointer
   */
  hitTestSlice(pointer, startAngle, endAngle) {
    const { ctx, cx, cy, opts } = this;
    const { radius } = opts;

    if (Math.hypot(pointer.x - cx, pointer.y - cy) < 4) {
      return false;
    }

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    return ctx.isPointInPath(pointer.x, pointer.y);
  }

  drawSlice(startAngle, endAngle, color, hovered) {
    const { ctx, cx, cy, opts } = this;
    const r = hovered ? opts.hoverRadius : opts.radius;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.fillStyle = color;

    if (hovered) {
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    } else {
      ctx.shadowBlur = 0;
    }

    ctx.fill();
    ctx.shadowBlur = 0;
  }

  /** @param {PieSlice} slice */
  drawCallout(startAngle, slice, color) {
    const { ctx, cx, cy, opts } = this;
    const { hoverRadius, outLine, legendDotRadius, fonts } = opts;

    const midAngle = startAngle + slice.angle / 2;
    const edge = hoverRadius + outLine;
    const outX = cx + Math.cos(midAngle) * edge;
    const outY = cy + Math.sin(midAngle) * edge;

    const valueText = `${slice.num}   ${slice.percent}%`;
    const valueWidth = ctx.measureText(valueText).width;
    const anchorRight = outX > cx;
    const textX = anchorRight ? outX + valueWidth : outX - valueWidth;
    const dotX = anchorRight
      ? outX + valueWidth - legendDotRadius - 10
      : outX - valueWidth - legendDotRadius - 10;
    const dotY = outY - legendDotRadius;

    ctx.beginPath();
    ctx.arc(dotX, dotY, legendDotRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.fillStyle = '#585d61';
    ctx.font = fonts.calloutTitle;
    ctx.fillText(slice.title, textX, outY);

    ctx.font = fonts.calloutLabel;
    ctx.fillText('销售金额：', textX, outY + 20);

    ctx.fillStyle = '#121212';
    ctx.font = fonts.calloutValue;
    ctx.fillText(valueText, textX, outY + 40);
  }

  /** @param {PieSlice} slice */
  drawLegendRow(index, slice, count, color) {
    const { ctx, opts, height } = this;
    const { legendPadding, legendDotRadius, legendRowGap, fonts } = opts;

    const rowStep = (legendDotRadius + legendRowGap) * 2;
    const baseY =
      height / 2 +
      legendPadding +
      index * rowStep +
      legendDotRadius -
      (count * rowStep) / 2;

    const textY = baseY + legendDotRadius;
    const dotX = legendPadding;
    const textX = legendPadding + legendDotRadius + 10;
    const valueX = legendPadding + legendDotRadius + 100;

    ctx.beginPath();
    ctx.arc(dotX, baseY, legendDotRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.fillStyle = '#9a9a9c';
    ctx.font = fonts.legend;
    ctx.fillText(slice.title, textX, textY);

    ctx.font = fonts.legendValue;
    ctx.fillText(String(slice.num), valueX, textY);
  }

  drawSummary(totalText) {
    const { ctx, width, opts } = this;
    const { fonts } = opts;
    const x = width - 190;

    ctx.fillStyle = '#9a9a9c';
    ctx.font = fonts.summaryTitle;
    ctx.fillText('总数', x, 100);

    ctx.font = fonts.summaryValue;
    ctx.fillText(`销售金额总和：${totalText}`, x, 130);
  }
}
