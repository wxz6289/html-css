HTML 网页内容的含义和结构
CSS 网页的表现和展示效果
JavaScript 功能和行为

## 主要概念

+ 元素  空元素
+ 标签
+ 属性
+ 内容

页面结构
<!DOCTYPE html> 文档类型
<html lang="en-US"></html> 网页根元素
<head></head>
<body></body>

## HTML头部

head 页面元数据信息

+ title 页面标题 页签名字
+ meta
  + charset="utf-8" 文档字符编码
  + name="author" content="xxx" 作者和描述信息
  + name="description" content="xxx"
  + property="og:image" content="sss"
+ <link rel="shortcut" size="72x72" href="favivon.icon|gif|png" type="image/x-icon"/> 站点图标
+ <link rel="stylesheet" href="ccc.css">
+ <script src="ss.js">

## 标记文本

1. 标题
h1~h6 块级元素 列入内容大纲
标题对于`无障碍访问`和`搜索引擎优化`等问题非常有意义,保持页面结构清晰，标题整洁，不要发生标题级别跳跃。

header 页头

2. 段落
p 组织句子或文本

3. 换行
br

4. 水平分割线 主题分隔或变化
hr

5. 块引用元素
blockquote 左右都有缩进

6. 短语元素   表象元素

| 元素 | 语义 | 默认样式 |
|:----:|:----|:----|
| abbr | 缩写| 配置`title`属性 |
| b | 关键字、产品名称、引导句等 | 加粗 |
| cite | 引用文本 | 标识引文或参考，斜体 |
| code | 代码 | 标识代码区域，等宽字体 |
| dfn | 定义文本 | 标识词汇或术语，斜体 |
| em | 强调文本 | 重点强调 斜体 |
| i | 外国文字、分类名称、技术术语等 | 斜体 |
| kbd | 输入文本 | 标识用户输入的文本，等宽字体 |
| mark | 标记文本 | 文本高亮显示以便参考 |
| samp | 样例文本 | 标识程序样例输出，等宽字体 |
| small | 小文本 | 小字号显示如免责声明 |
| strong | 非常重要 | 粗体 |
| sub | 下标 | 显示基线以下的文本 |
| sup | 上标 | 显示基线以上的文本 |
| var | 变量 | 标识并显示变量，斜体 |
| u | 专有名词、拼写错误等 | 下划线 |

7. 有序列表
ol li

+ type=1|A|a|I|i 序号类型
+ start 序号起始值
+ reversed 指定为降序

8. 无序列表
ul li

9. 描述列表 用来标记一组项目及其相关描述，如术语和定义、问答等

+ dl
+ dt(decription terms) 可以于多个描述<dd>
+ dd

10. 常用实体

| 符号 | 名称 | 代码 |
|:----:|:-----:|:-----:|
| " | 引号 | `&quot;` |

11. 结构元素
div 常规结构性区域
span
header 文档区域标题
nav  menu 导航
main 文档主要内容区域 整个页面只有一个
footer 文档页脚区域

12. 链接
a
属性

+ title 支持信息
+ href="url" 引用 mailto:link 电邮 #id 文档片段标识
+ target="_blank" 目标

电邮链接
<a href="mailto:nowhere@mozilla.org?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email">
  Send mail with cc, bcc, subject and body
</a>

绝对URL 相对URL
使用链接的最佳实践

1. 链接措辞清晰
2. 尽可能使用相对链接
3. 链接到非页面资源要有清晰的提示
4. 下载链接要使用下载属性

图像编辑
Gimp
Pixlr

13. 图片元素
img

+ alt 描述信息(备选文本)
+ title 图片标题(支持信息)
+ src 必须
+ height
+ width
+ title 图片信息
图片链接

图片的作用

1. 装饰 应该放到background-image中
2. 内容
3. 链接
4. 文本载体

图片映射
img

+ usemap map的id
map
+ name 图片name
+ id 与name相同

area

+ herf 热区链接
+ alt
+ title
+ shape 热区形状
+ coords 可点击区域坐标

解说
figure
figcaption

# 引用

+ blockquote  块引用
  + cite 引用资源地址
+ q 行内引用
+ cite 引文 表示应用资源的名称

联系方式
address

上标／下标 化学方程式、数学符号
sup
sub

计算机代码
code 通用代码
pre 代码块保留原格式
var 变量名
kbd 输入
samp 输出

时间日期
time

+ datetime

文档的基本组成区段

1. 标题栏 header 标题 Logo
2. 导航栏 nav 菜单、按钮、链接
3. 主内容 main article section div
4. 侧边栏 aside 链接、引用、广告等
5. 页脚 footer 联系信息 版权信息等

无语义元素
div
span

音频／视频
video

+ src
+ controls
+ autoplay
+ loop
+ muted
+ poster
+ preload: none|auto|metadata
+ width/height

audio

+ src
+ controls
+ autoplay
+ loop
+ muted
+ preload: none|auto|metadata

音频／视频容器格式

+ WebM Ogg Vorbis音频和VP8/VP9视频 FF和Chrome
+ MP4  ACC以及MP3音频和H.264视频 IE和Safari
+ Ogg Ogg Vorbis音频和Ogg Theora视频 WebM取代

source

+ src
+ type video|audio/mp4|webm|ogg|mp3

 track

+ src
+ link
+ type
+ kind="subtitle" 告诉浏览器用什么语言来编写subtitle
+ scrlang="en"

iframe 在当前页面嵌入其他文档

+ allowfullscreen 设置全屏模式
+ frameborder 如果设置为1，则会告诉浏览器在此框架和其他框架之间绘制边框，这是默认行为。0删除边框。
+ src 嵌入文档的路径
+ width/height
+ 备选内容
+ sandbox 安全性设置  单击劫持

1. 只有在必要时嵌入
2. 使用HTTPS
3. 始终使用sandbox属性
4. 配置CSP指令

embed/object  嵌入外部内容的通用嵌入工具如JavaAplet、Flash、PDF、SVG等(不建议使用)

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
  <p>You don't have a PDF plugin, but you can <a href="myfile.pdf">download the PDF file.</a></p>
</object>
```

位图 使用像素网格定义 像素的位置和它的色彩信息 bitmap(.bmp) PNG(.png) JPEG(.jpg) GIF(.gif) 文件大，容易失真
矢量图 使用算法定义 图形和路径的定义 SVG 文件小，不失真

SVG是用于描述矢量图像的XML语言。 它有许多不同的元素来定义要显示在图像中的形状，以及要应用于这些形状的效果。 SVG用于标记图形，而不是内容。
主要标记有：

+ circle
+ rect
+ feColorMatrix 变换矩阵转换颜色
+ animate 矢量图动画
+ mask 应用模版

```xml
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

矢量图编辑器

+ Lnkspace
+ IIIustrator

svg优缺点
优点：

+ 矢量图中的文本仍然可以访问(有利于SEO)
+ SVG可以很好地适应样式和脚本，可以通过CSS或JS编写样式
缺点：
+ SVG容易变得复杂
+ SVG比栅格图像更难创建
+ 老版浏览器不支持

SVG引入方式

+ img
  优点
  + 快速，熟悉的图像语法与alt属性中提供的内置文本等效。
  + 可以通过在<a>元素嵌套<img>，使图像轻松地成为超链接。
  缺点
  + 无法使用JavaScript操作图像。
  + 如果要使用CSS控制SVG内容，则必须在SVG代码中包含内联CSS样式。 （从SVG文件调用的外部样式表不起作用）
  + 不能用CSS伪类来重设图像样式（如:focus）
+ svg
  优点
  + 将SVG内联减少HTTP请求，可以减少加载时间。
  + 可以为SVG元素分配class和id，并使用CSS修改样式。
  + 内联SVG是唯一可以在SVG图像上使用CSS交互（如:focus）和CSS动画的方法（即使在常规样式表中）。
  + 可以通过将SVG标记包在<a>元素中，使其成为超链接。
  缺点
  + 这种方法只适用于在一个地方使用的SVG。多次使用会导致资源密集型维护。
  + 额外的 SVG 代码会增加HTML文件的大小。
  + 浏览器不能像缓存普通图片一样缓存内联SVG。
  + 在<foreignObject> 元素中包含回退，但支持SVG的浏览器仍然会下载任何后备图像。

```html
<img src="equilateral.png" alt="triangle with equal sides" srcset="equilateral.svg">
```

```css
.bg{
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

```html
<iframe src="triangle.svg" width="500" height="500" sandbox>
    <img src="triangle.png" alt="Triangle with three unequal sides" />
</iframe>
```

picture
响应式图片
一种可以在不同的屏幕尺寸和分辨率的设备上都能良好工作以及其他特性的图片的技术。

美术设计问题 使用不同的图片以适应不同的空间分配
分辨率切换问题 包含多个不同分辨率的相同效果图片

+ 分辨率切换：不同尺寸
  + srcset
  + sizes

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">

```

浏览器操作流程

1. 查看设备宽度
2. 检查sizes列表中哪个媒体条件是第一个为真
3. 查看给予该媒体查询的槽大小
4. 加载srcset列表中引用的最接近所选的槽大小的图像

+ 美术设计

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg">
  <source media="(min-width: 800px)" srcset="elva-800w.jpg">
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva">
</picture>
```

为什么我们不能使用 CSS 或 JavaScript 来做到这一效果?
当浏览器开始加载一个页面, 它会在主解析器开始加载和解析页面的CSS和JavaScript之前先下载 (预加载)任意的图片。这是一个非常有用的技巧，平均下来减少了页面加载时间的20%。但是, 这对响应式图片一点帮助都没有, 所以需要类似 srcset的实现方法。

表格
表格是由行和列组成的结构化数据集(表格数据)，它能够使你简捷迅速地查找某个表示不同类型数据之间的某种关系的值。

table
tr
th
  scope="row|col|colgroup|rowgroup" 标题与单元格之间的联系
td
col / colgroup 列分组

属性

+ colspan
+ rowspan

表单
表单部件通用属性

+ autofocus
+ disabled
+ form
+ name
+ value
+ novalidate 关闭浏览器自动验证

form

+ action 提交数据的URL
+ method get|post
+ enctype="multipart/form-data" 文件传输数据分片
label
  + for="id"
input
  + id="for"
  + type="text|email|date|password|search|tel|url|submit|number|range"
  + value
  + name 收集表单数据时用到
  + readonly 其值不被发送
  + placeholder
  + list 与datalist关联
  + size
  + multiple
  + checked 单选按钮和复选框

数值输入框(number)/滑块(range)

+ type
+ min
+ max
+ step

日期事件选择器
本地时间(datetime-local|moth|time|week|date)

+ max
+ min

拾色器(color)
文件选择器(file)

+ accept 接受文件类型约束
+ muitiple 支持多文件
隐藏内容(hidden)
图像按钮(image) 构建热图
+ src
+ width
+ height

textarea

+ cols
+ rows
+ wrap="soft|hard"
+ name
button
+ type="submit|reset|button"
fieldset 创建表单项集合
legend 为fieldset添加标签

select

+ multiple
optgroup
  + label
option
  + selected
datalist 自动补全输入框

进度条
progress

+ max
+ value

仪表
meter

+ low
+ hight
+ optinum
+ min
+ max
+ value

GET与POST的区别
GET 浏览器请求服务器返回给定的资源，请求体是空的，请求数据是追加在URL上
POST 数据追加到请求体中 发送大量数据
Content-Length 请求体大小
Content-Type 发送到服务端的资源类型

+ application/x-www-form-urlencoded 已编码为URL参数的表单数

安全问题

1. XSS(跨站脚本)和CSRF(跨站点请求伪造)
XSS攻击利用用户对站点的信任，而CSRF攻击则利用站点为其用户提供的信任。
2. SQL注入
3. HTTP数据头注入和电子邮件注入

防范

1. 有潜在危险的字符转义
2. 限制输入数量，只允许有必要数据
3. 沙箱上传文件

表单数据校验

+ 客户端校验(用户体验较好)
  + JS校验
  + H5内置校验
+ 服务端校验

当一个元素校验通过时：

+ 该元素将可以通过CSS伪类`:valid`进行特殊的样式化；
+ 如果尝试提交并没有阻止该操作，那么该表单数据就会被提交。
如果一个元素校验未通过：
+ 该元素将可以通过CSS伪类`:invalid`进行特殊的样式化；
+ 如果尝试提交表单，浏览器会展示出错误消息，并停止表单的提交。
表单校验相关属性
+ required 是否必须
+ pattern 正则校验 texteara不支持
+ minlength / maxlength 条目长度
+ min max  min > max 则条目无效 数值输入框／滑块

自定义错误信息

+ CSS伪类
+ 根据`validity.typeMismatch`调用`setCustomValidity()`方法自定义表单的状态

HTML5约束验证API

+ validationMessage
+ validity
  + customError
  + patternMismatch
  + rangeOverflow
  + rangeUnderflow
  + stepMismatch
  + tooLong
  + typeMismatch
  + valid
  + valueMissing
+ willValidate

+ checkValidity() -> invalid事件
+ setCustomValidity(message)

表单验证相关CSS伪类

+ :valid
+ :invalid
+ :in-range
+ :out-of-range

表单验证的库

+ validate.js(原生)
+ validation(jQery)
+ valid8(jQuery)

远程校验 (异步验证)

表单验证要求：

+ 显示明确的错误消息。
+ 放宽输入格式。
+ 指出错误发生的位置

数据提交
表单提交与AJAX请求的区别
AJAX 技术主要依靠 XMLHttpRequest (XHR) DOM 对象。它可以构造HTTP请求，并获取请求结果。
表单数据(application/x-www-form-urlencoded)由URL编码的键/值对列表组成。为了传输二进制数据，HTTP请求被重新整合成multipart/form-data。

发送表单数据的方法

1. 用DOM API构建表单，然后将其数据发送到隐藏的<iframe>。 要访问提交的结果，请获取<iframe>的内容。这可能是支持很古老的浏览器的唯一选择。
2. XMLHttpRequest是进行HTTP请求的最安全和最可靠的方式。 要使用XMLHttpRequest发送表单数据，请通过对URL进行编码来准备数据，并遵守表单数据请求的具体内容。
3. 使用 XMLHttpRequest 和 the FormData object（表单对象）

# [使用JavaScript发送表单](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript)

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。另一个不同的事件 load 应该仅用于检测一个完全加载的页面。
