'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// 使用 dynamic 导入并禁用 SSR
const Preview = dynamic(() => import('./Preview'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-400">
      加载预览组件...
    </div>
  )
})

export function Editor({ title, content, theme, onTitleChange, onContentChange }) {
  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex flex-col flex-1">
        <div className="flex-none p-4 border-b">
          <input
            type="text"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            placeholder="请输入标题..."
            className="w-full px-4 py-2 text-xl font-bold bg-transparent border-none outline-none"
          />
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <textarea
              value={content}
              onChange={e => onContentChange(e.target.value)}
              placeholder="开始编写内容..."
              className="w-full h-full p-4 bg-transparent border-none outline-none resize-none"
            />
          </div>
          <div className="flex-1 border-l">
            <Preview content={content} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  )
} 