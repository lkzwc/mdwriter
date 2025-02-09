'use client'

import React, { useState, useEffect } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'

// 自定义组件
const components = {
  pre: ({ children, ...props }) => (
    <pre {...props} className="overflow-auto p-4 bg-gray-50 rounded">
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }) => (
    <code className={`${className || ''} font-mono text-sm`} {...props}>
      {children}
    </code>
  ),
  img: (props) => (
    <img {...props} className="max-w-full h-auto rounded" />
  ),
  p: (props) => (
    <p {...props} className="mb-[var(--paragraph-spacing)] break-words" style={{ color: 'var(--text-color)' }} />
  ),
  h1: (props) => (
    <h1 {...props} className="text-3xl font-bold mb-6" style={{ color: 'var(--heading-color)' }} />
  ),
  h2: (props) => (
    <h2 {...props} className="text-2xl font-bold mb-4" style={{ color: 'var(--heading-color)' }} />
  ),
  h3: (props) => (
    <h3 {...props} className="text-xl font-bold mb-3" style={{ color: 'var(--heading-color)' }} />
  ),
  ul: (props) => (
    <ul {...props} className="list-disc pl-5 mb-[var(--paragraph-spacing)]" style={{ color: 'var(--text-color)' }} />
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal pl-5 mb-[var(--paragraph-spacing)]" style={{ color: 'var(--text-color)' }} />
  ),
  li: (props) => (
    <li {...props} className="mb-2" style={{ color: 'var(--text-color)' }} />
  ),
  blockquote: (props) => {
    const quoteStyles = {
      border: "border-l-4 border-[var(--quote-border-color)] pl-4",
      background: "bg-gray-50 p-4 rounded",
      modern: "border-l-4 border-[var(--quote-border-color)] pl-4 bg-gray-50/50"
    };

    return (
      <blockquote 
        {...props} 
        className={`${quoteStyles[props.quoteStyle] || quoteStyles.border} my-[var(--paragraph-spacing)]`}
        style={{ color: 'var(--quote-color)' }}
      />
    );
  },
  a: (props) => (
    <a {...props} className="text-[var(--link-color)] hover:underline" />
  ),
  div: (props) => {
    // 处理文本对齐的 div
    if (props.className?.includes('text-')) {
      const alignClass = props.className.match(/text-(left|center|right)/)?.[0] || '';
      return <div {...props} className={`${alignClass} mb-[var(--paragraph-spacing)]`} style={{ color: 'var(--text-color)' }} />;
    }
    return <div {...props} style={{ color: 'var(--text-color)' }} />;
  },
  table: (props) => (
    <div className="overflow-x-auto my-[var(--paragraph-spacing)]">
      <table {...props} className="min-w-full border-collapse table-auto" style={{ color: 'var(--text-color)' }} />
    </div>
  ),
  thead: (props) => (
    <thead {...props} className="bg-gray-50" />
  ),
  tbody: (props) => (
    <tbody {...props} className="divide-y divide-gray-200" />
  ),
  tr: (props) => (
    <tr {...props} className="hover:bg-gray-50" />
  ),
  th: (props) => (
    <th {...props} className="px-4 py-2 text-left text-sm font-medium border border-gray-200" style={{ color: 'var(--heading-color)' }} />
  ),
  td: (props) => (
    <td {...props} className="px-4 py-2 text-sm border border-gray-200" style={{ color: 'var(--text-color)' }} />
  ),
  input: (props) => {
    if (props.type === 'checkbox') {
      return (
        <input
          {...props}
          className="form-checkbox h-4 w-4 text-[var(--link-color)] rounded border-gray-300 mr-2"
          readOnly
        />
      );
    }
    return <input {...props} />;
  }
}

async function processMarkdown(content) {
  if (!content?.trim()) {
    return { result: null }
  }

  try {
    // 预处理内容
    let processedContent = content
      // 替换 center 标签
      .replace(/<center>(.*?)<\/center>/gs, '<div className="text-center">$1</div>')
      // 替换对齐语法，确保正确处理内部换行
      .replace(/:::(left|center|right)\n([\s\S]*?)\n:::/g, (_, align, text) => {
        // 移除开头和结尾的空行，但保留内部换行
        const trimmedText = text.replace(/^\n+|\n+$/g, '')
        return `<div className="text-${align}">${trimmedText}</div>`
      })
      // 处理连续的换行
      .replace(/\n{3,}/g, '\n\n')

    // 使用 next-mdx-remote 编译
    const mdxSource = await serialize(processedContent, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        development: false
      },
      parseFrontmatter: true
    })

    return { result: mdxSource }
  } catch (error) {
    console.error('Markdown processing error:', error)
    return { 
      error: {
        title: 'Markdown 语法错误',
        message: '请检查：\n' +
          '• 标题使用 # 号标记（1-6个）\n' +
          '• 列表使用 - 或 1. 标记\n' +
          '• 代码块使用三个反引号包裹\n' +
          '• 图片和链接的括号要成对\n' +
          '• 对齐语法使用 :::center 包裹内容\n' +
          '• 居中使用 <div className="text-center">内容</div>\n' +
          '• 表格语法：使用 | 分隔列，使用 - 分隔表头'
      }
    }
  }
}

export function Preview({ content, styles }) {
  const [mdxSource, setMdxSource] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function compile() {
      const result = await processMarkdown(content);
      
      if (!isMounted) return;
      
      if (result.error) {
        setError(result.error);
        setMdxSource(null);
      } else {
        setError(null);
        setMdxSource(result.result);
      }
    }

    compile();
    return () => { isMounted = false };
  }, [content]);

  if (!content?.trim()) {
    return (
      <div className="h-full bg-white">
        <div className="p-4">
          <div className="text-gray-400">
            <p>开始编写内容后这里会显示预览效果...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <article 
        className="preview-content"
        style={{
          ...styles,
          fontFamily: 'var(--font-family)',
          fontSize: 'var(--font-size)',
          lineHeight: 'var(--line-height)',
          maxWidth: 'var(--content-width)',
          margin: '0 auto',
          padding: '2rem',
        }}
      >
        {error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-600 font-medium mb-2">{error.title}</div>
            <div className="text-gray-600 text-sm whitespace-pre-wrap">{error.message}</div>
          </div>
        ) : mdxSource ? (
          <MDXRemote {...mdxSource} components={components} />
        ) : (
          <div className="text-gray-400">
            正在渲染...
          </div>
        )}
      </article>
    </div>
  );
}