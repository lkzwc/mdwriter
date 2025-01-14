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
  const handleThemeChange = (e) => {
    e.target.blur() // 强制失去焦点，关闭下拉框
    onThemeChange(e.target.value)
  }

  return (
    <div className="w-64 flex-none border-r bg-gray-50">
      <div className="h-full flex flex-col">
        {/* 主题选择 */}
        <div className="flex-none p-4 border-b">
          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text flex items-center gap-2">
                <Settings className="w-4 h-4" />
                主题样式
              </span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={theme}
              onChange={handleThemeChange}
            >
              {THEMES.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
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