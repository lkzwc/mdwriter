/** @jsxImportSource @emotion/react */
'use client'

import React, { useState, useEffect } from 'react'
import { compile } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import { css } from '@emotion/react'
import * as runtime from 'react/jsx-runtime'

// 自定义 MDX 组件
const mdxComponents = {
  pre: ({ children, ...props }) => (
    <pre {...props}>
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }) => (
    <code className={className} {...props}>
      {children}
    </code>
  ),
  img: (props) => (
    <img {...props} className="max-w-full h-auto" />
  ),
  center: (props) => (
    <div className="text-center" {...props} />
  ),
  p: (props) => (
    <p {...props} className={`${props.className || ''} break-words`} />
  ),
  aligned: ({ align, children }) => (
    <div style={{ textAlign: align }}>
      {children}
    </div>
  )
}

// 创建运行时环境
const evalCode = (code) => {
  const scope = {
    React,
    ...runtime,
    MDXProvider,
    components: mdxComponents
  }
  
  const fn = new Function(
    ...Object.keys(scope),
    `${code}
    return MDXContent`
  )
  
  return fn(...Object.values(scope))
}

async function compileMdx(content) {
  if (!content?.trim()) {
    return { code: null }
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

    // 编译 MDX
    const compiled = await compile(processedContent, {
      outputFormat: 'function-body',
      development: false,
      providerImportSource: '@mdx-js/react'
    })

    // 提取编译后的代码
    const code = String(compiled)
      // 移除 export 语句
      .replace(/export\s+default\s+function\s+MDXContent/g, 'function MDXContent')
      .replace(/export\s+default\s+MDXContent/g, '')
      // 确保代码中的变量名不冲突
      .replace(/const\s+{([^}]+)}\s*=\s*_components/g, 'const {$1} = components')

    return { code }
  } catch (error) {
    console.error('MDX compilation error:', error)
    return { 
      error: {
        title: 'Markdown 语法错误',
        message: '请检查：\n' +
          '• 标题使用 # 号标记（1-6个）\n' +
          '• 列表使用 - 或 1. 标记\n' +
          '• 代码块使用三个反引号包裹\n' +
          '• 图片和链接的括号要成对\n' +
          '• 对齐语法使用 :::center 包裹内容\n' +
          '• 居中使用 <div className="text-center">内容</div>'
      }
    }
  }
}

function MdxContent({ code }) {
  const Content = React.useMemo(() => {
    if (!code) return null
    
    try {
      return evalCode(code)
    } catch (error) {
      console.error('MDX evaluation error:', error)
      return null
    }
  }, [code])

  if (!Content) return null

  return <Content />
}

export function Preview({ content, styles }) {
  const [component, setComponent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function compile() {
      const result = await compileMdx(content)
      
      if (!isMounted) return
      
      if (result.error) {
        setError(result.error)
        setComponent(null)
      } else {
        setError(null)
        setComponent(result.code)
      }
    }

    compile()
    return () => { isMounted = false }
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

  return (
    <div className="h-full bg-white p-4">
      <article css={css(styles?.article)}>
        {error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-600 font-medium mb-2">{error.title}</div>
            <div className="text-gray-600 text-sm whitespace-pre-wrap">{error.message}</div>
          </div>
        ) : component ? (
          <MDXProvider components={mdxComponents}>
            <MdxContent code={component} />
          </MDXProvider>
        ) : (
          <div className="text-gray-400">
            正在渲染...
          </div>
        )}
      </article>
    </div>
  )
}