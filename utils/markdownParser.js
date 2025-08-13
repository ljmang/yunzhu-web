import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import DOMPurify from 'dompurify'

// 初始化 MarkdownIt 并配置插件
const md = new MarkdownIt({
  html: true, // 允许 HTML 标签，后续由 DOMPurify 清理
  linkify: true, // 自动将 URL 转换为链接
  typographer: true, // 启用智能标点替换
}).use(anchor, {
  // markdown-it-anchor 的配置
  permalink: anchor.permalink.ariaHidden({
    placement: 'before',
    symbol: '#',
  }),
  slugify: s =>
    'heading-' +
    encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
})

// 生成目录编号
function generateTocNumbers(headings) {
  const counters = {}
  const numberedHeadings = []

  headings.forEach(heading => {
    const level = heading.level

    // 重置更深层级的计数器
    for (let i = level + 1; i <= 6; i++) {
      counters[i] = 0
    }

    // 增加当前层级的计数器
    counters[level] = (counters[level] || 0) + 1

    // 生成编号
    let number = ''
    for (let i = 2; i <= level; i++) {
      if (counters[i] > 0) {
        number += (number ? '-' : '') + counters[i]
      }
    }

    numberedHeadings.push({
      ...heading,
      number: number || counters[level].toString(),
    })
  })

  return numberedHeadings
}

// 在 HTML 中为标题添加编号
function addNumbersToHtml(html, numberedHeadings) {
  let modifiedHtml = html

  numberedHeadings.forEach(heading => {
    const originalText = heading.text

    // 为标题添加 data-number 属性
    const regex = new RegExp(
      `<h${heading.level}[^>]*>([^<]*${originalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*)</h${heading.level}>`,
      'g'
    )
    modifiedHtml = modifiedHtml.replace(regex, (match, content) => {
      // 检查是否已经有 data-number 属性
      if (match.includes('data-number')) {
        return match
      }
      // 添加 data-number 属性
      return match.replace(
        `<h${heading.level}`,
        `<h${heading.level} data-number="${heading.number}"`
      )
    })
  })

  return modifiedHtml
}

// 封装一个函数来同时处理 HTML 转换和目录生成
export function parseMarkdown(markdownString) {
  const headings = []

  // 关键：重写标题的渲染规则，在渲染的同时收集标题信息
  const originalHeadingOpen = md.renderer.rules.heading_open
  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    const level = parseInt(token.tag.substring(1))
    const titleToken = tokens[idx + 1]

    if (titleToken && titleToken.type === 'inline') {
      const text = titleToken.content
      const id = token.attrGet('id')
      headings.push({ id, text, level })
    }

    // 如果原始规则存在，则调用它，否则使用默认渲染
    if (originalHeadingOpen) {
      return originalHeadingOpen(tokens, idx, options, env, self)
    } else {
      return self.renderToken(tokens, idx, options)
    }
  }

  // 1. 一次解析，生成HTML
  const rawHtml = md.render(markdownString)

  // 2. 清理HTML，确保安全
  const sanitizedHtml = process.client ? DOMPurify.sanitize(rawHtml) : rawHtml

  // 3. 为目录添加编号
  const numberedToc = generateTocNumbers(headings)

  // 4. 在 HTML 中为标题添加编号
  const numberedHtml = addNumbersToHtml(sanitizedHtml, numberedToc)

  // 5. 返回所有需要的数据
  return {
    html: numberedHtml,
    toc: numberedToc,
  }
}
