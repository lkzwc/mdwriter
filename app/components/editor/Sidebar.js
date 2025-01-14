'use client'

import { useState } from 'react'
import { ThemeSelect } from './ThemeSelect'
import { FileText, Save, Send, Trash2, Clock } from 'lucide-react'

const THEMES = [
  {
    id: 'wechat-elegant',
    name: '微信典雅',
    class: 'prose-wechat-elegant'
  },
  {
    id: 'wechat-modern',
    name: '微信现代',
    class: 'prose-wechat-modern'
  },
  {
    id: 'wechat-magazine',
    name: '微信杂志',
    class: 'prose-wechat-magazine'
  },
  {
    id: 'wechat-creative',
    name: '微信创意',
    class: 'prose-wechat-creative'
  },
  {
    id: 'wechat-business',
    name: '微信商务',
    class: 'prose-wechat-business'
  }
]

export function Sidebar() {
  const [currentTheme, setCurrentTheme] = useState(THEMES[0])
  const [drafts] = useState([
    { id: '1', title: '未命名草稿', date: '2024-03-20' },
    { id: '2', title: '关于人工智能的思考', date: '2024-03-19' }
  ])

  return (
    <div className="w-64 border-r border-base-300 flex flex-col bg-base-200">
      {/* 头部 */}
      <div className="p-4 border-b border-base-300 bg-base-100">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h2 className="font-medium">文稿管理</h2>
        </div>
        <p className="mt-1 text-xs text-base-content/60">管理您的草稿和发布文章</p>
      </div>

      {/* 主体内容区 */}
      <div className="flex-1 overflow-y-auto">
        {/* 草稿箱 */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">草稿箱</h3>
            <span className="badge badge-sm">{drafts.length}/3</span>
          </div>
          <div className="space-y-2">
            {drafts.map(draft => (
              <div key={draft.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1">{draft.title}</h4>
                      <div className="flex items-center gap-1 mt-1 text-xs text-base-content/60">
                        <Clock className="w-3 h-3" />
                        <span>{draft.date}</span>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-square btn-xs">
                      <Trash2 className="w-3 h-3 text-error" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 主题设置 */}
        <div className="p-4 border-t border-base-300">
          <h3 className="text-sm font-medium mb-3">主题样式</h3>
          <ThemeSelect
            themes={THEMES}
            value={currentTheme}
            onChange={setCurrentTheme}
            onCustomize={() => {}}
          />
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="p-4 border-t border-base-300 bg-base-100 space-y-2">
        <button className="btn btn-outline btn-sm btn-block gap-2">
          <Save className="w-4 h-4" />
          保存草稿
        </button>
        <button className="btn btn-primary btn-sm btn-block gap-2">
          <Send className="w-4 h-4" />
          推送至公众号
        </button>
      </div>
    </div>
  )
} 