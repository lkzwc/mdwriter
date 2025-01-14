'use client'
import { MDXProvider } from '@mdx-js/react'
import { compile } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { useEffect, useState, useMemo } from 'react'

// 基础 MDX 组件配置
const components = {
  // 标题组件
  h1: props => <h1 {...props} className="text-2xl font-bold mb-4" />,
  h2: props => <h2 {...props} className="text-xl font-bold mb-3" />,
  h3: props => <h3 {...props} className="text-lg font-bold mb-2" />,
  
  // 段落和列表
  p: props => <p {...props} className="mb-4 leading-relaxed" />,
  ul: props => <ul {...props} className="list-disc pl-6 mb-4" />,
  ol: props => <ol {...props} className="list-decimal pl-6 mb-4" />,
  li: props => <li {...props} className="mb-1" />,
  
  // 引用和代码
  blockquote: props => (
    <blockquote {...props} className="border-l-4 border-gray-200 pl-4 py-2 mb-4 text-gray-700" />
  ),
  code: props => <code {...props} className="px-1.5 py-0.5 bg-gray-100 rounded text-sm" />,
  pre: props => (
    <pre {...props} className="p-4 mb-4 bg-gray-900 text-gray-100 rounded-lg overflow-auto" />
  ),
}

export function Preview({ content }) {
  const [compiledContent, setCompiledContent] = useState(null)
  const [error, setError] = useState(null)

  // 使用 useMemo 缓存编译配置
  const compileOptions = useMemo(() => ({
    outputFormat: 'function-body',
    development: false,
    pragma: 'React.createElement',
    pragmaFrag: 'React.Fragment'
  }), [])

  useEffect(() => {
    let isMounted = true

    const compileMdx = async () => {
      if (!content?.trim()) {
        setCompiledContent(() => () => (
          <div className="text-gray-400">
            <p>开始编写内容后这里会显示预览效果...</p>
          </div>
        ))
        setError(null)
        return
      }

      try {
        const compiled = await compile(content, compileOptions)
        
        if (!isMounted) return

        const { default: Content } = await (new Function(
          'React',
          'MDXProvider',
          'runtime',
          `${compiled.toString()}\nreturn { default: MDXContent }`
        ))(React, MDXProvider, runtime)

        setCompiledContent(() => Content)
        setError(null)
      } catch (error) {
        if (!isMounted) return
        console.error('MDX 编译错误:', error)
        setError(error)
        setCompiledContent(null)
      }
    }

    const timer = setTimeout(compileMdx, 300) // 添加防抖
    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [content, compileOptions])

  if (error) {
    return (
      <div className="flex-1 h-full overflow-auto bg-white dark:bg-gray-800">
        <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg m-4">
          <h3 className="font-medium mb-2">MDX 语法错误</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 h-full overflow-auto bg-white dark:bg-gray-800">
      <div className="h-full p-8 prose dark:prose-invert max-w-none">
        <MDXProvider components={components}>
          {typeof compiledContent === 'function' ? compiledContent() : null}
        </MDXProvider>
      </div>
    </div>
  )
} 
