'use client'

import dynamic from 'next/dynamic'


const Preview = dynamic(() => import('./Preview'), {
  ssr: false,
});

export function Editor({ 
  title, 
  content, 
  onTitleChange, 
  onContentChange,
  theme 
}) {
  return (
    <div className="flex flex-1 min-w-0">
      {/* 中间编辑区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 标题输入 */}
        <div className="flex-none border-b border-base-300">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="输入文章标题..."
            className="input input-ghost w-full rounded-none text-xl font-medium h-14 min-h-[3.5rem]"
          />
        </div>

        {/* Markdown 编辑器 */}
        <div className="flex-1 overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="在这里用 Markdown 开始写作..."
            className="block w-full h-full resize-none p-4 bg-base-100 border-0 focus:ring-0 font-mono text-base leading-relaxed"
          />
        </div>
      </div>

      {/* 右侧预览区 */}
      <div className="w-[45%] flex flex-col min-w-0 border-l border-base-300">
        {/* 预览区头部 */}
        <div className="flex-none border-b border-base-300">
          <div className="h-14 flex items-center px-4 text-sm font-medium text-base-content/80">
            预览
          </div>
        </div>

        {/* 预览内容 */}
        <div className="flex-1 overflow-auto">
          <div className="h-full">
            <Preview content={content} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  )
} 