'use client'

import React, { useState, useEffect } from 'react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

const THEMES = [
  {
    id: 'wechat-elegant',
    name: '微信典雅',
    class: `prose prose-sm max-w-none
      prose-h1:text-[1.2em] prose-h1:text-center prose-h1:font-bold prose-h1:text-gray-900
      prose-h1:my-4 prose-h1:tracking-wide prose-h1:leading-relaxed
      prose-h1:after:content-[''] prose-h1:after:block prose-h1:after:w-16 prose-h1:after:h-0.5
      prose-h1:after:mx-auto prose-h1:after:mt-2 prose-h1:after:bg-gradient-to-r
      prose-h1:after:from-purple-500 prose-h1:after:to-pink-500
      
      prose-h2:text-[1.1em] prose-h2:font-bold prose-h2:text-gray-800 prose-h2:my-3
      prose-h2:pl-3 prose-h2:border-l-4 prose-h2:border-purple-500
      prose-h2:bg-gradient-to-r prose-h2:from-purple-50 prose-h2:to-transparent
      
      prose-h3:text-[1em] prose-h3:font-bold prose-h3:text-gray-700 prose-h3:my-2
      prose-h3:flex prose-h3:items-center prose-h3:before:content-['◆']
      prose-h3:before:text-purple-500 prose-h3:before:mr-2 prose-h3:before:text-sm
      
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-2
      prose-p:text-[14px] prose-p:break-words
      
      prose-blockquote:border-l-4 prose-blockquote:border-purple-300
      prose-blockquote:bg-gradient-to-r prose-blockquote:from-purple-50 prose-blockquote:to-transparent
      prose-blockquote:py-1 prose-blockquote:px-3 prose-blockquote:my-2
      prose-blockquote:text-[14px] prose-blockquote:text-gray-700
      prose-blockquote:not-italic prose-blockquote:font-normal
      
      prose-strong:text-purple-700 prose-strong:font-bold
      prose-em:text-gray-700 prose-em:not-italic prose-em:border-b-2 prose-em:border-purple-200
      
      prose-code:before:content-none prose-code:after:content-none
      prose-code:bg-gray-100 prose-code:text-purple-600 prose-code:rounded
      prose-code:text-[13px] prose-code:px-1.5 prose-code:py-0.5
      
      prose-pre:bg-[#292d3e] prose-pre:text-gray-100 prose-pre:p-3 
      prose-pre:rounded-lg prose-pre:my-2 prose-pre:shadow-md
      
      prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto
      prose-img:my-4 prose-img:border prose-img:border-purple-100
      
      prose-a:text-purple-600 prose-a:no-underline prose-a:border-b 
      prose-a:border-purple-500 prose-a:border-dashed
      hover:prose-a:text-purple-500 hover:prose-a:border-solid
      
      prose-ul:my-2 prose-ul:list-none prose-ul:pl-4
      prose-ul:li:relative prose-ul:li:pl-4
      prose-ul:li:before:content-['•'] prose-ul:li:before:absolute
      prose-ul:li:before:left-0 prose-ul:li:before:text-purple-500
      prose-ul:li:before:font-bold prose-ul:li:my-1
      
      prose-ol:my-2 prose-ol:list-none prose-ol:pl-4 prose-ol:counter-reset-[item]
      prose-ol:li:relative prose-ol:li:pl-4
      prose-ol:li:before:absolute prose-ol:li:before:left-0
      prose-ol:li:before:text-purple-500 prose-ol:li:before:font-bold
      prose-ol:li:before:content-[counter(item)] prose-ol:li:before:counter-increment-[item]
      prose-ol:li:my-1`
  },
  {
    id: 'wechat-modern',
    name: '微信现代',
    class: `prose prose-sm md:prose-base lg:prose-lg max-w-none
      prose-h1:text-[1.4em] prose-h1:font-bold prose-h1:text-center
      prose-h1:bg-gradient-to-r prose-h1:from-blue-600 prose-h1:to-cyan-500
      prose-h1:text-white prose-h1:py-6 prose-h1:rounded-lg prose-h1:shadow-md
      prose-h1:my-8 prose-h1:tracking-wide
      
      prose-h2:text-[1.3em] prose-h2:font-bold prose-h2:text-gray-800
      prose-h2:flex prose-h2:items-center prose-h2:gap-3 prose-h2:my-6
      prose-h2:before:content-[''] prose-h2:before:block
      prose-h2:before:w-1 prose-h2:before:h-6 prose-h2:before:bg-blue-500
      prose-h2:before:rounded prose-h2:pl-2
      
      prose-h3:text-[1.1em] prose-h3:font-bold prose-h3:text-gray-700
      prose-h3:flex prose-h3:items-center prose-h3:my-4
      prose-h3:before:content-['→'] prose-h3:before:text-blue-500
      prose-h3:before:mr-2 prose-h3:before:font-normal
      
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
      prose-p:text-[15px]
      
      prose-blockquote:border-none prose-blockquote:relative
      prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
      prose-blockquote:my-6 prose-blockquote:rounded-r-lg
      prose-blockquote:before:content-[''] prose-blockquote:before:absolute
      prose-blockquote:before:left-0 prose-blockquote:before:top-0
      prose-blockquote:before:bottom-0 prose-blockquote:before:w-1
      prose-blockquote:before:bg-gradient-to-b prose-blockquote:before:from-blue-500
      prose-blockquote:before:to-cyan-500 prose-blockquote:before:rounded-full
      
      prose-strong:text-blue-700 prose-strong:font-bold
      prose-em:text-gray-700 prose-em:not-italic
      prose-em:bg-gradient-to-r prose-em:from-blue-200/40 prose-em:to-cyan-200/40
      prose-em:rounded prose-em:px-2 prose-em:py-0.5
      
      prose-code:before:content-none prose-code:after:content-none
      prose-code:bg-blue-50 prose-code:text-blue-600
      prose-code:rounded prose-code:text-[14px] prose-code:px-2 prose-code:py-0.5
      
      prose-pre:bg-[#1a1b26] prose-pre:text-gray-100
      prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-4
      
      prose-img:rounded-xl prose-img:shadow-xl prose-img:my-6
      prose-img:border-2 prose-img:border-blue-100
      
      prose-a:text-blue-600 prose-a:no-underline
      prose-a:bg-gradient-to-r prose-a:from-blue-200/40 prose-a:to-cyan-200/40
      prose-a:border-b prose-a:border-blue-400
      hover:prose-a:text-blue-500 hover:prose-a:border-blue-500
      
      prose-ul:my-4 prose-ul:list-none prose-ul:pl-4
      prose-ul:li:relative prose-ul:li:pl-6
      prose-ul:li:before:content-['○'] prose-ul:li:before:absolute
      prose-ul:li:before:left-0 prose-ul:li:before:text-blue-500
      prose-ul:li:my-2
      
      prose-ol:my-4 prose-ol:list-none prose-ol:pl-4
      prose-ol:li:relative prose-ol:li:pl-6 prose-ol:counter-reset-[item]
      prose-ol:li:before:absolute prose-ol:li:before:left-0
      prose-ol:li:before:text-blue-500 prose-ol:li:before:font-bold
      prose-ol:li:before:content-[counter(item)] prose-ol:li:before:counter-increment-[item]
      prose-ol:li:my-2`
  },
  {
    id: 'wechat-magazine',
    name: '微信杂志',
    class: `prose prose-sm md:prose-base lg:prose-lg max-w-none
      prose-h1:text-[1.4em] prose-h1:font-bold prose-h1:text-center
      prose-h1:relative prose-h1:my-8 prose-h1:pb-4
      prose-h1:after:content-[''] prose-h1:after:absolute
      prose-h1:after:bottom-0 prose-h1:after:left-1/2
      prose-h1:after:w-16 prose-h1:after:h-0.5
      prose-h1:after:bg-gradient-to-r prose-h1:after:from-emerald-500
      prose-h1:after:to-teal-500 prose-h1:after:-translate-x-1/2
      
      prose-h2:text-[1.3em] prose-h2:font-bold prose-h2:text-gray-800
      prose-h2:my-6 prose-h2:flex prose-h2:items-center
      prose-h2:before:content-['✦'] prose-h2:before:text-emerald-500
      prose-h2:before:mr-2 prose-h2:before:text-xl
      
      prose-h3:text-[1.1em] prose-h3:font-bold prose-h3:text-gray-700
      prose-h3:my-4 prose-h3:flex prose-h3:items-center
      prose-h3:before:content-['❋'] prose-h3:before:text-emerald-500
      prose-h3:before:mr-2 prose-h3:before:text-base
      
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
      prose-p:text-[15px]
      
      prose-blockquote:border-none prose-blockquote:bg-emerald-50
      prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-6
      prose-blockquote:rounded-lg prose-blockquote:shadow-sm
      prose-blockquote:relative prose-blockquote:overflow-hidden
      prose-blockquote:before:content-['"'] prose-blockquote:before:absolute
      prose-blockquote:before:text-emerald-200 prose-blockquote:before:text-6xl
      prose-blockquote:before:top-0 prose-blockquote:before:left-2
      prose-blockquote:before:leading-none prose-blockquote:before:font-serif
      
      prose-strong:text-emerald-700 prose-strong:font-bold
      prose-em:text-gray-700 prose-em:not-italic
      prose-em:border-b-2 prose-em:border-emerald-200
      
      prose-code:before:content-none prose-code:after:content-none
      prose-code:bg-emerald-50 prose-code:text-emerald-600
      prose-code:rounded prose-code:text-[14px]
      prose-code:px-2 prose-code:py-0.5
      
      prose-pre:bg-[#2b2b2b] prose-pre:text-gray-100
      prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-4
      
      prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6
      prose-img:border prose-img:border-emerald-100
      
      prose-a:text-emerald-600 prose-a:no-underline
      prose-a:border-b prose-a:border-emerald-300
      hover:prose-a:text-emerald-500 hover:prose-a:border-emerald-500
      
      prose-ul:my-4 prose-ul:list-none prose-ul:pl-4
      prose-ul:li:relative prose-ul:li:pl-6
      prose-ul:li:before:content-['✿'] prose-ul:li:before:absolute
      prose-ul:li:before:left-0 prose-ul:li:before:text-emerald-500
      prose-ul:li:before:text-sm prose-ul:li:my-2
      
      prose-ol:my-4 prose-ol:list-none prose-ol:pl-4
      prose-ol:li:relative prose-ol:li:pl-6 prose-ol:counter-reset-[item]
      prose-ol:li:before:absolute prose-ol:li:before:left-0
      prose-ol:li:before:text-emerald-500 prose-ol:li:before:font-bold
      prose-ol:li:before:content-[counter(item)] prose-ol:li:before:counter-increment-[item]
      prose-ol:li:my-2`
  },
  {
    id: 'wechat-creative',
    name: '微信创意',
    class: `prose prose-sm md:prose-base lg:prose-lg max-w-none
      prose-h1:text-[1.4em] prose-h1:font-bold prose-h1:text-center
      prose-h1:bg-gradient-to-br prose-h1:from-orange-500 prose-h1:to-pink-500
      prose-h1:text-transparent prose-h1:bg-clip-text prose-h1:my-8
      prose-h1:drop-shadow-sm prose-h1:tracking-wide
      
      prose-h2:text-[1.3em] prose-h2:font-bold prose-h2:text-gray-800
      prose-h2:my-6 prose-h2:pl-4 prose-h2:py-2
      prose-h2:border-l-4 prose-h2:border-orange-500
      prose-h2:bg-gradient-to-r prose-h2:from-orange-50 prose-h2:to-pink-50
      
      prose-h3:text-[1.1em] prose-h3:font-bold prose-h3:text-gray-700
      prose-h3:my-4 prose-h3:flex prose-h3:items-center
      prose-h3:before:content-['☀'] prose-h3:before:text-orange-500
      prose-h3:before:mr-2
      
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
      prose-p:text-[15px]
      
      prose-blockquote:border-none prose-blockquote:relative
      prose-blockquote:bg-gradient-to-r prose-blockquote:from-orange-50
      prose-blockquote:to-pink-50 prose-blockquote:py-4 prose-blockquote:px-6
      prose-blockquote:my-6 prose-blockquote:rounded-lg
      prose-blockquote:shadow-sm
      
      prose-strong:bg-gradient-to-r prose-strong:from-orange-500
      prose-strong:to-pink-500 prose-strong:text-transparent
      prose-strong:bg-clip-text prose-strong:font-bold
      
      prose-em:text-gray-700 prose-em:not-italic
      prose-em:bg-gradient-to-r prose-em:from-orange-100
      prose-em:to-pink-100 prose-em:rounded
      prose-em:px-2 prose-em:py-0.5
      
      prose-code:before:content-none prose-code:after:content-none
      prose-code:bg-gradient-to-r prose-code:from-orange-100
      prose-code:to-pink-100 prose-code:text-orange-700
      prose-code:rounded prose-code:text-[14px]
      prose-code:px-2 prose-code:py-0.5
      
      prose-pre:bg-[#2d2d2d] prose-pre:text-gray-100
      prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-4
      prose-pre:shadow-lg
      
      prose-img:rounded-xl prose-img:shadow-xl prose-img:my-6
      prose-img:border-2 prose-img:border-orange-100
      
      prose-a:text-orange-600 prose-a:no-underline
      prose-a:border-b prose-a:border-orange-300
      hover:prose-a:text-pink-500 hover:prose-a:border-pink-500
      
      prose-ul:my-4 prose-ul:list-none prose-ul:pl-4
      prose-ul:li:relative prose-ul:li:pl-6
      prose-ul:li:before:content-['❂'] prose-ul:li:before:absolute
      prose-ul:li:before:left-0 prose-ul:li:before:text-orange-500
      prose-ul:li:my-2
      
      prose-ol:my-4 prose-ol:list-none prose-ol:pl-4
      prose-ol:li:relative prose-ol:li:pl-6 prose-ol:counter-reset-[item]
      prose-ol:li:before:absolute prose-ol:li:before:left-0
      prose-ol:li:before:text-orange-500 prose-ol:li:before:font-bold
      prose-ol:li:before:content-[counter(item)] prose-ol:li:before:counter-increment-[item]
      prose-ol:li:my-2`
  },
  {
    id: 'wechat-business',
    name: '微信商务',
    class: `prose prose-sm md:prose-base lg:prose-lg max-w-none
      prose-h1:text-[1.4em] prose-h1:font-bold prose-h1:text-center
      prose-h1:text-gray-900 prose-h1:my-8 prose-h1:tracking-wide
      prose-h1:border-b-2 prose-h1:border-gray-900 prose-h1:pb-4
      prose-h1:relative prose-h1:after:content-['']
      prose-h1:after:absolute prose-h1:after:bottom-0
      prose-h1:after:left-1/2 prose-h1:after:w-32 prose-h1:after:h-0.5
      prose-h1:after:bg-gray-900 prose-h1:after:-translate-x-1/2
      prose-h1:after:translate-y-0.5
      
      prose-h2:text-[1.3em] prose-h2:font-bold prose-h2:text-gray-800
      prose-h2:my-6 prose-h2:flex prose-h2:items-center
      prose-h2:after:content-[''] prose-h2:after:flex-1
      prose-h2:after:h-0.5 prose-h2:after:bg-gray-200
      prose-h2:after:ml-4
      
      prose-h3:text-[1.1em] prose-h3:font-bold prose-h3:text-gray-700
      prose-h3:my-4 prose-h3:pl-4 prose-h3:border-l-2
      prose-h3:border-gray-300
      
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
      prose-p:text-[15px]
      
      prose-blockquote:border-l-4 prose-blockquote:border-gray-900
      prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6
      prose-blockquote:my-6
      
      prose-strong:text-gray-900 prose-strong:font-bold
      prose-strong:border-b-2 prose-strong:border-gray-200
      
      prose-em:text-gray-700 prose-em:not-italic
      prose-em:bg-gray-100 prose-em:rounded
      prose-em:px-2 prose-em:py-0.5
      
      prose-code:before:content-none prose-code:after:content-none
      prose-code:bg-gray-100 prose-code:text-gray-700
      prose-code:rounded prose-code:text-[14px]
      prose-code:px-2 prose-code:py-0.5
      
      prose-pre:bg-gray-900 prose-pre:text-gray-100
      prose-pre:p-4 prose-pre:rounded-none prose-pre:my-4
      prose-pre:border-l-4 prose-pre:border-gray-700
      
      prose-img:rounded-none prose-img:shadow-xl prose-img:my-6
      prose-img:border prose-img:border-gray-200
      
      prose-a:text-gray-900 prose-a:no-underline
      prose-a:border-b-2 prose-a:border-gray-200
      hover:prose-a:border-gray-900
      
      prose-ul:my-4 prose-ul:list-none prose-ul:pl-4
      prose-ul:li:relative prose-ul:li:pl-6
      prose-ul:li:before:content-['—'] prose-ul:li:before:absolute
      prose-ul:li:before:left-0 prose-ul:li:before:text-gray-400
      prose-ul:li:my-2
      
      prose-ol:my-4 prose-ol:list-none prose-ol:pl-4
      prose-ol:li:relative prose-ol:li:pl-6 prose-ol:counter-reset-[item]
      prose-ol:li:before:absolute prose-ol:li:before:left-0
      prose-ol:li:before:text-gray-500 prose-ol:li:before:font-bold
      prose-ol:li:before:content-[counter(item)] prose-ol:li:before:counter-increment-[item]
      prose-ol:li:my-2`
  }
]

export default function Preview({ content, theme = 'wechat-elegant' }) {
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
        const { default: MdxContent } = await evaluate(content, {
          ...runtime,
          development: false
        })
        
        if (mounted) {
          setComponent(() => MdxContent)
          setError(null)
        }
      } catch (err) {
        console.error('MDX Error:', err)
        if (mounted) {
          setError(err.message)
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

  const themeClass = THEMES.find(t => t.id === theme)?.class || THEMES[0].class

  return (
    <div className="h-full bg-white">
      <article className={`p-4 ${themeClass}`}>
        {error ? (
          <div className="text-red-500">
            MDX 语法错误: {error}
          </div>
        ) : Component ? (
          <Component />
        ) : (
          <div>编译中...</div>
        )}
      </article>
    </div>
  )
} 
