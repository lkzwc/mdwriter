'use client'

import { useEffect } from 'react'

const getHeadingStyles = (config) => `
  h1, h2, h3, h4, h5, h6 {
    font-family: ${config.headingFont === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)'};
    margin-left: ${config.headingIndent}em;
    margin-bottom: ${config.headingSpacing}em;
    ${config.headingBorder ? `
      padding-bottom: 0.3em;
      border-bottom: 1px solid var(--border-color);
    ` : ''}
  }

  h1 { font-size: 2em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.25em; }
  h4 { font-size: 1em; }
  h5 { font-size: 0.875em; }
  h6 { font-size: 0.85em; }
`

const getBodyStyles = (config) => `
  font-family: ${
    config.bodyFont === 'serif' ? 'var(--font-serif)' :
    config.bodyFont === 'sans' ? 'var(--font-sans)' :
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };
  font-size: ${config.fontSize}px;
  line-height: ${config.lineHeight};
  letter-spacing: ${config.letterSpacing}px;

  p {
    margin-bottom: ${config.paragraphSpacing}em;
  }
`

const getCodeStyles = (config) => `
  code {
    font-family: ${
      config.codeFont === 'fira' ? '"Fira Code"' :
      config.codeFont === 'jetbrains' ? '"JetBrains Mono"' :
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    };
    font-size: ${config.codeFontSize}px;
  }

  pre {
    background: var(--code-bg);
    border-radius: 6px;
    padding: 1em;
    overflow-x: auto;

    ${config.codeLineNumbers ? `
      counter-reset: line;
      
      > code {
        display: block;
        line-height: 1.5;
        
        &::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          width: 2em;
          margin-right: 1em;
          text-align: right;
          color: var(--text-secondary);
        }
      }
    ` : ''}
  }
`

const getQuoteAndListStyles = (config) => `
  blockquote {
    ${config.quoteStyle === 'border' ? `
      border-left: 4px solid var(--primary-color);
      padding-left: 1em;
      margin-left: 0;
      color: var(--text-secondary);
    ` : ''}
    
    ${config.quoteStyle === 'background' ? `
      background: var(--quote-bg);
      padding: 1em;
      border-radius: 6px;
    ` : ''}
    
    ${config.quoteStyle === 'modern' ? `
      position: relative;
      padding: 1em 2em;
      
      &::before,
      &::after {
        position: absolute;
        font-size: 3em;
        opacity: 0.1;
      }
      
      &::before {
        content: '"';
        left: 0;
        top: 0;
      }
      
      &::after {
        content: '"';
        right: 0;
        bottom: -0.5em;
      }
    ` : ''}
  }

  ul, ol {
    padding-left: ${config.listIndent}em;
    
    li {
      margin-bottom: 0.5em;
    }
  }

  ul {
    list-style-type: ${config.listStyle};
  }
`

const getTableStyles = (config) => `
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    
    ${config.tableStyle === 'bordered' ? `
      th, td {
        border: 1px solid var(--border-color);
      }
    ` : ''}
    
    ${config.tableStyle === 'striped' ? `
      tr:nth-child(even) {
        background: var(--table-stripe-bg);
      }
    ` : ''}
    
    th, td {
      padding: 0.75em;
      text-align: left;
    }
    
    ${config.tableHeaderBg ? `
      th {
        background: var(--table-header-bg);
      }
    ` : ''}
    
    ${config.tableHover ? `
      tr:hover {
        background: var(--table-hover-bg);
      }
    ` : ''}
  }
`

const getOtherStyles = (config) => `
  hr {
    margin: 2em 0;
    border: none;
    
    ${config.hrStyle === 'solid' ? `
      border-top: 1px solid var(--border-color);
    ` : ''}
    
    ${config.hrStyle === 'dashed' ? `
      border-top: 1px dashed var(--border-color);
    ` : ''}
    
    ${config.hrStyle === 'gradient' ? `
      height: 1px;
      background: linear-gradient(to right, transparent, var(--border-color), transparent);
    ` : ''}
  }

  a {
    color: var(--primary-color);
    
    ${config.linkStyle === 'underline' ? `
      text-decoration: underline;
    ` : ''}
    
    ${config.linkStyle === 'color' ? `
      text-decoration: none;
    ` : ''}
    
    ${config.linkStyle === 'modern' ? `
      text-decoration: none;
      background-image: linear-gradient(currentColor, currentColor);
      background-position: 0% 100%;
      background-repeat: no-repeat;
      background-size: 0% 2px;
      transition: background-size .3s;
      
      &:hover {
        background-size: 100% 2px;
      }
    ` : ''}
  }

  ${config.smoothScrolling ? `
    scroll-behavior: smooth;
  ` : ''}
`

export function MarkdownStyles({ config }) {
  useEffect(() => {
    // 创建 style 元素
    const style = document.createElement('style')
    
    // 生成样式内容
    const styleContent = `
      .markdown-body {
        color: var(--text-primary);
        ${getHeadingStyles(config)}
        ${getBodyStyles(config)}
        ${getCodeStyles(config)}
        ${getQuoteAndListStyles(config)}
        ${getTableStyles(config)}
        ${getOtherStyles(config)}
      }
    `
    
    // 设置样式内容
    style.textContent = styleContent
    
    // 将样式添加到文档头部
    document.head.appendChild(style)
    
    // 清理函数
    return () => {
      document.head.removeChild(style)
    }
  }, [config])
  
  return null
}
