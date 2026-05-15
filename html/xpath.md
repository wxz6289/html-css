# XPath

抽取元素、属性和文本

浏览器控制台使用`$x()`函数

`/` 表示父子元素,严格的层级
`[]` 索引 从1开始
`//` 无需考虑层级
`@` 选择属性
`text()` 选取文本
`*` 选取所用元素  $x('//div/*')

```js
//h1[@id="xxx"]
//div[@id="toc"]/ul/a/@href
//*[contains(@class, 'ltr') and contains(@class, 'skin-vecotor')]
//div[starts-with(@class, 'reflist')]//a/@href
//*[text()="References"]/../following-sibling::div//a  # 选择子元素包含文本References的元素之后的div元素中的所有链接
//img/@src  #选择每张图片的url
```

```js
$x('//a[@href]')  // 选择包含href属性的链接
$x('//img[src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9jM2ZjNzM3MGJjMDk1MWZiYTk0NGI3YjhjYWM1YjljYz9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.2735RDAi_avZ7jDl8X5eYXkrSEO_pVfVGcD6dGYgrMg"]')
$x('//a[contains(@href,"https://www.npmjs.com/package/msgpack5#signin")]')
$x('a[starts-with(@href, "http")]')
$x('a[not(starts-with(@href, "http"))]')
```

[XSLT](https://www.w3schools.com/xml/xsl_functions.asp)

XPath表达式注意事项

- 避免使用索引
- 类名可能发生变化，面向数据的类名比面向布局的类更好
- id通常比较可靠，但是生成的id可能会改变

```bash
scrapy shell http://example.com
response.xpath('/html').extract()
```

## trouble

AttributeError: 'SelectReactor' object has no attribute '_handleSignals'

```bash
conda install twisted
conda update scrapy
```

AttributeError: 'Decompressor' object has no attribute 'process'

```bash
conda install brotlipy
```

UR<sup>2</sup>IM流程

URL -> Request -> Response -> Item -> More URL -> Request -> ...

```bash
scrapy shell -s USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" https://worktile.com/kb/ask/552061.html
scrapy shell --pdb https://gumtree.com
scrapy shell -s USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" https://www.zhipin.com/web/geek/job?query=&city=101210100&position=100101

scrapy shell -s USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" https://gumtree.com
```
