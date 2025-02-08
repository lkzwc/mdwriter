'use client'

import React, { useState, useEffect } from 'react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

// 自定义 MDX 组件
const components = {
  // 图片组件，自动添加居中和样式
  // 图片组件，自动添加居中和样式
  img: (props) => (
    <div className="text-center">
      <img {...props} className={`inline-block max-w-full ${props.className || ''}`} />
    </div>
  ),
  // 居中容器组件
  center: (props) => (
    <div className="text-center" {...props} />
  ),
  // 段落组件
  p: (props) => (
    <p {...props} className={`${props.className || ''} break-words`} />
  ),
  // 对齐组件
  aligned: ({ children, align = 'center' }) => (
    <div className={`text-${align}`}>{children}</div>
  ),
  // 分割线
  hr: () => <hr className="my-4 border-t border-gray-200" />,
  // 引用块
  blockquote: (props) => (
    <blockquote {...props} className="pl-4 border-l-4 border-violet-300 text-gray-700 my-4" />
  ),
  // 代码块
  pre: (props) => (
    <pre {...props} className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-auto" />
  ),
  // 行内代码
  code: (props) => (
    <code {...props} className="bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded" />
  )
}

// 主题样式定义
const THEMES = {
  'wechat-elegant': `prose prose-sm max-w-none
    prose-headings:text-center prose-headings:font-bold
    prose-h1:text-2xl prose-h1:mt-6 prose-h1:mb-4
    prose-h2:text-xl prose-h2:mt-5 prose-h2:mb-3
    prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
    prose-p:text-base prose-p:leading-relaxed prose-p:my-2
    prose-img:rounded-lg prose-img:shadow-md prose-img:my-4
    prose-blockquote:border-l-4 prose-blockquote:border-violet-300
    prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:my-2
    prose-blockquote:text-gray-700 prose-blockquote:bg-violet-50/50
    prose-strong:text-violet-700 prose-strong:font-bold
    prose-em:text-gray-700 prose-em:not-italic prose-em:border-b
    prose-em:border-violet-200 prose-em:border-dashed
    prose-code:before:content-none prose-code:after:content-none
    prose-code:bg-violet-50 prose-code:text-violet-700
    prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
    prose-pre:bg-gray-900 prose-pre:text-gray-100
    prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-4
    prose-a:text-violet-600 prose-a:no-underline
    prose-a:border-b prose-a:border-violet-200
    hover:prose-a:text-violet-700 hover:prose-a:border-violet-500
    prose-ul:list-disc prose-ul:pl-6 prose-ul:my-2
    prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-2
    prose-li:my-1`
}

export default function Preview({ content, theme = 'wechat-elegant', config }) {
  const [Component, setComponent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function compileMdx() {
      if (!content?.trim()) {
        setComponent(null)
        setError(null)
        return
      }

      try {
        // 预处理内容，修复常见错误
        let processedContent = content
          // 替换未闭合的图片标签
          .replace(/<img([^>]*)>/g, '<img$1 />')
          // 替换 center 标签
          .replace(/<center>(.*?)<\/center>/gs, '<div className="text-center">$1</div>')
          // 替换对齐语法
          .replace(/:::(left|center|right)\n([\s\S]*?)\n:::/g, '<aligned align="$1">$2</aligned>')
          // 处理连续的换行
          .replace(/\n{3,}/g, '\n\n')

        const { default: MdxContent } = await evaluate(processedContent, {
          ...runtime,
          development: false,
          useMDXComponents: () => components
        })
        
        if (mounted) {
          setComponent(() => MdxContent)
          setError(null)
        }
      } catch (err) {
        console.error('MDX Error:', err)
        if (mounted) {
          setError({
            title: 'Markdown 语法错误',
            message: '请检查：\n' +
              '• 标题使用 # 号标记（1-6个）\n' +
              '• 列表使用 - 或 1. 标记\n' +
              '• 代码块使用三个反引号包裹\n' +
              '• 图片和链接的括号要成对\n' +
              '• 对齐语法使用 :::center 包裹内容\n' +
              '• 居中使用 <div className="text-center">内容</div>'
          })
          setComponent(null)
        }
      }
    }

    compileMdx()

    return () => {
      mounted = false
    }
  }, [content])

  if (!content?.trim()) {
    return (
      <div className="h-full bg-white">
        <div className="p-4">
          <div className="text-gray-400">
            <p>开始编写内容后这里会显示预览效果...</p>
          </div>
        </div>
      </div>
    )
  }

  const themeClass = THEMES[theme] || THEMES['wechat-elegant']

  return (
    <div className="h-full bg-white">
      <article className={`p-4 ${themeClass}`} style={{
        fontSize: `${config.fontSize}px`,
        lineHeight: config.lineHeight,
        fontFamily: config.fontFamily
      }}>
        {error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-600 font-medium mb-2">{error.title}</div>
            <div className="text-gray-600 text-sm whitespace-pre-wrap">{error.message}</div>
          </div>
        ) : Component ? (
          <Component components={components} />
        ) : (
          <div className="text-gray-400">正在渲染...</div>
        )}
      </article>
    </div>
  )
}