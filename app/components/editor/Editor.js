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
    <div className="flex-1 grid grid-cols-2 h-full bg-base-100 mt-16">
      {/* 左侧编辑区 */}
      <div className="h-full flex flex-col border-r">
        <input
          type="text"
          value={title || ''}
          onChange={e => onTitleChange(e.target.value)}
          placeholder="请输入标题..."
          className="px-4 h-12 bg-transparent border-b outline-none"
        />
        <textarea
          value={content || ''}
          onChange={e => onContentChange(e.target.value)}
          placeholder="开始编写内容..."
          className="flex-1 p-4 bg-transparent outline-none resize-none overflow-auto"
        />
      </div>

      {/* 右侧预览区 */}
      <div className="h-full overflow-auto">
        <Preview content={content} theme={theme} />
      </div>
    </div>
  )
} 