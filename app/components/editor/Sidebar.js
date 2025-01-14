'use client'

import { useState } from 'react'
import { FileText, Save, Send, Trash2, Clock, Settings, ChevronDown } from 'lucide-react'
import { useDrafts } from '../../hooks/useDrafts'

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

export function Sidebar({ 
  onSave, 
  onPublish, 
  onLoadDraft, 
  currentTheme,
  onThemeChange,
  title,
  content 
}) {
  const { drafts, saveDraft, deleteDraft } = useDrafts()
  const [isThemeOpen, setIsThemeOpen] = useState(false)

  const handleSave = async () => {
    try {
      await saveDraft({
        title: title || '未命名草稿',
        content,
        date: new Date().toISOString().split('T')[0]
      })
      onSave?.()
    } catch (error) {
      if (error.message === '草稿数量已达到上限') {
        alert('草稿数量已达到上限(3个)，请删除部分草稿后再保存')
      } else {
        console.error('保存草稿失败:', error)
        alert('保存草稿失败')
      }
    }
  }

  const handleDeleteDraft = async (e, id) => {
    e.stopPropagation()
    if (confirm('确定要删除这个草稿吗？')) {
      try {
        await deleteDraft(id)
      } catch (error) {
        console.error('删除草稿失败:', error)
        alert('删除草稿失败')
      }
    }
  }

  return (
    <div className="w-64 border-r border-gray-200 flex flex-col bg-gray-50">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <h2 className="font-medium">文稿管理</h2>
        </div>
        <p className="mt-1 text-xs text-gray-500">管理您的草稿和发布文章</p>
      </div>

      {/* 主体内容区 */}
      <div className="flex-1 overflow-y-auto">
        {/* 草稿箱 */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">草稿箱</h3>
            <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">{drafts.length}/3</span>
          </div>
          <div className="space-y-2">
            {drafts.map(draft => (
              <div 
                key={draft.id} 
                className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow cursor-pointer"
                onClick={() => onLoadDraft(draft)}
              >
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-sm truncate">{draft.title}</h4>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{draft.date}</span>
                      </div>
                    </div>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded-full"
                      onClick={(e) => handleDeleteDraft(e, draft.id)}
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 主题设置 */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium mb-3">主题样式</h3>
          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50"
            >
              <span className="truncate text-sm">
                {THEMES.find(t => t.id === currentTheme)?.name || '选择主题'}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isThemeOpen && (
              <div className="absolute top-full left-0 w-full mt-1 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id)
                      setIsThemeOpen(false)
                    }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                      currentTheme === theme.id ? 'bg-gray-50 text-blue-600' : ''
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <button className="w-full px-3 py-2 text-sm text-left text-gray-500 hover:bg-gray-50 flex items-center gap-2">
                    <Settings className="w-3 h-3" />
                    自定义主题
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="p-4 border-t border-gray-200 bg-white space-y-2">
        <button 
          onClick={handleSave}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          保存草稿
        </button>
        <button 
          onClick={onPublish}
          className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          推送至公众号
        </button>
      </div>
    </div>
  )
} 