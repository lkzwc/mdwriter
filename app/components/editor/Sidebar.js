'use client'

import { Settings, Save, Send } from 'lucide-react'

const THEMES = [
  { id: 'wechat-elegant', name: '微信典雅' },
  { id: 'wechat-modern', name: '微信现代' },
  { id: 'wechat-magazine', name: '微信杂志' },
  { id: 'wechat-creative', name: '微信创意' },
  { id: 'wechat-business', name: '微信商务' }
]

export function Sidebar({ drafts = [], onSaveDraft, onDeleteDraft, theme, onThemeChange }) {
  return (
    <div className="w-64 flex-none border-r bg-gray-50">
      <div className="h-full flex flex-col">
        {/* 主题选择 */}
        <div className="flex-none p-4 border-b">
          <div className="dropdown w-full">
            <label tabIndex={0} className="btn btn-ghost w-full justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>{THEMES.find(t => t.id === theme)?.name || '选择主题'}</span>
              </div>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {THEMES.map(t => (
                <li key={t.id}>
                  <a 
                    className={theme === t.id ? 'active' : ''} 
                    onClick={() => onThemeChange(t.id)}
                  >
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 草稿列表 */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">草稿箱</h3>
            {drafts.length === 0 ? (
              <div className="text-sm text-gray-400">暂无草稿</div>
            ) : (
              <ul className="space-y-2">
                {drafts.map((draft, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-sm truncate">{draft.title || '未命名草稿'}</span>
                    <button
                      onClick={() => onDeleteDraft(draft.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      删除
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex-none p-4 border-t space-y-2">
          <button
            onClick={onSaveDraft}
            className="btn btn-block btn-primary"
          >
            <Save className="w-4 h-4 mr-2" />
            保存草稿
          </button>
          <button className="btn btn-block">
            <Send className="w-4 h-4 mr-2" />
            发布文章
          </button>
        </div>
      </div>
    </div>
  )
} 