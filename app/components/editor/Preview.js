'use client'

import React from 'react'

const THEMES = [
  {
    id: 'wechat-elegant',
    name: '微信典雅',
    class: `
      prose prose-sm md:prose-base lg:prose-lg
      prose-h1:text-[1.4em] prose-h1:text-center prose-h1:font-bold prose-h1:text-gray-900
      prose-h1:my-8 prose-h1:tracking-wide prose-h1:leading-relaxed
      prose-h1:after:content-[''] prose-h1:after:block prose-h1:after:w-20 prose-h1:after:h-1
      prose-h1:after:mx-auto prose-h1:after:mt-4 prose-h1:after:bg-gradient-to-r
      prose-h1:after:from-purple-500 prose-h1:after:to-pink-500
      
      prose-h2:text-[1.3em] prose-h2:font-bold prose-h2:text-gray-800 prose-h2:my-6
      prose-h2:pl-3 prose-h2:border-l-4 prose-h2:border-purple-500
      prose-h2:bg-gradient-to-r prose-h2:from-purple-50 prose-h2:to-transparent
      
      prose-h3:text-[1.1em] prose-h3:font-bold prose-h3:text-gray-700 prose-h3:my-4
      prose-h3:flex prose-h3:items-center prose-h3:before:content-['◆']
      prose-h3:before:text-purple-500 prose-h3:before:mr-2 prose-h3:before:text-sm
      
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
      prose-p:text-[15px] prose-p:break-words
      
      prose-blockquote:border-l-4 prose-blockquote:border-purple-300
      prose-blockquote:bg-gradient-to-r prose-blockquote:from-purple-50 prose-blockquote:to-transparent
      prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-4
      prose-blockquote:text-[15px] prose-blockquote:text-gray-700
      prose-blockquote:not-italic prose-blockquote:font-normal
      
      prose-strong:text-purple-700 prose-strong:font-bold
      prose-em:text-gray-700 prose-em:not-italic prose-em:border-b-2 prose-em:border-purple-200
      
      prose-code:before:content-none prose-code:after:content-none
      prose-code:bg-gray-100 prose-code:text-purple-600 prose-code:rounded
      prose-code:text-[14px] prose-code:px-2 prose-code:py-0.5
      
      prose-pre:bg-[#292d3e] prose-pre:text-gray-100 prose-pre:p-4 
      prose-pre:rounded-lg prose-pre:my-4 prose-pre:shadow-md
      
      prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto
      prose-img:my-6 prose-img:border prose-img:border-purple-100
      
      prose-a:text-purple-600 prose-a:no-underline prose-a:border-b 
      prose-a:border-purple-500 prose-a:border-dashed
      hover:prose-a:text-purple-500 hover:prose-a:border-solid
      
      prose-ul:my-4 prose-ul:list-none prose-ul:pl-4
      prose-ul:li:relative prose-ul:li:pl-6
      prose-ul:li:before:content-['•'] prose-ul:li:before:absolute
      prose-ul:li:before:left-0 prose-ul:li:before:text-purple-500
      prose-ul:li:before:font-bold prose-ul:li:my-2
      
      prose-ol:my-4 prose-ol:list-none prose-ol:pl-4 prose-ol:counter-reset-[item]
      prose-ol:li:relative prose-ol:li:pl-6
      prose-ol:li:before:absolute prose-ol:li:before:left-0
      prose-ol:li:before:text-purple-500 prose-ol:li:before:font-bold
      prose-ol:li:before:content-[counter(item)] prose-ol:li:before:counter-increment-[item]
      prose-ol:li:my-2
    `
  }
]

function parseMarkdown(text) {
  // 处理标题
  text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>')
  text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  
  // 处理粗体和斜体
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // 处理链接
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // 处理列表
  text = text.replace(/^\* (.*$)/gm, '<li>$1</li>')
  text = text.replace(/^- (.*$)/gm, '<li>$1</li>')
  text = text.replace(/^(\d+\.) (.*$)/gm, '<li>$2</li>')
  
  // 处理引用
  text = text.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
  
  // 处理代码块
  text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  
  // 处理行内代码
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>')

  // 处理段落
  const paragraphs = text
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim()
      if (!paragraph) return ''
      
      // 如果段落已经是HTML标签，直接返回
      if (paragraph.startsWith('<')) return paragraph
      
      // 处理段落内的换行
      paragraph = paragraph.replace(/\n/g, '<br />')
      
      return `<p>${paragraph}</p>`
    })
    .filter(Boolean)
    .join('\n')

  return paragraphs
}

export default function Preview({ content, theme = 'wechat-elegant' }) {
  if (!content?.trim()) {
    return (
      <div className="flex-1 h-full overflow-auto bg-white">
        <div className="p-8">
          <div className="text-gray-400">
            <p>开始编写内容后这里会显示预览效果...</p>
          </div>
        </div>
      </div>
    )
  }

  const html = parseMarkdown(content)
  const themeClass = THEMES.find(t => t.id === theme)?.class || THEMES[0].class

  return (
    <div className="flex-1 h-full overflow-auto bg-white">
      <article 
        className={`prose prose-sm md:prose-base lg:prose-lg max-w-none ${themeClass}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
} 
