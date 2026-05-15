# 定位

## position

- static 默认值 忽略偏移属性值设置
- relative  相对未定位时的位置偏移，占据空间
- absolute  元素从文档流中移除，绝对定位后的元素都生成块级框
- fixed 相对视口定位
- sticky 元素一开始留在常规文档流中，达到触发粘滞条件时，从常规文档流中移除，不过保留在常规文档流中的占据的空间。粘滞条件失效后，元素回到常规文档流的初始位置。 relative与fixed的结合

## 偏移属性 inset, top,right,bottom, left

定位元素各边相对于容纳块的偏移
百分数相对于容纳块的宽度或高度计算

## 宽度/高度 width,height

限制宽度/高度
min-width/height
max-width/height

## 内容溢出和裁剪 overflow

- visible
- hidden
- scroll
- auto

适用于块级元素和置换元素

## 元素可见性 visibility

可继承

- visible
- hidden 占据空间保留，但是点击等事件会失效，子元素可以设置恢复显示
- collapse 在渲染表格时使用，非表格元素同hidden
