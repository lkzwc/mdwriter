'use client'

import { useState } from 'react'
import { Save, Send, FileText, Settings, ChevronDown, Palette, Sparkles, Book, Layout, Briefcase, Upload, Trash2 } from 'lucide-react'

const THEMES = [
  { id: 'wechat-elegant', name: '微信典雅', icon: Palette },
  { id: 'wechat-modern', name: '微信现代', icon: Layout },
  { id: 'wechat-magazine', name: '微信杂志', icon: Book },
  { id: 'wechat-creative', name: '微信创意', icon: Sparkles },
  { id: 'wechat-business', name: '微信商务', icon: Briefcase }
]

export function Sidebar({ drafts, onSaveDraft, onDeleteDraft, onLoadDraft, theme, onThemeChange }) {
  const [selectedDraft, setSelectedDraft] = useState(null)
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [draftToDelete, setDraftToDelete] = useState(null)

  const handleDraftClick = (draft) => {
    setSelectedDraft(draft)
    document.getElementById('draft-modal').showModal()
  }

  const handleDeleteClick = (e, draft) => {
    e.stopPropagation()
    setDraftToDelete(draft)
    document.getElementById('delete-modal').showModal()
  }

  const handleConfirmDelete = async () => {
    if (draftToDelete) {
      try {
        await onDeleteDraft(draftToDelete.id)
        setDraftToDelete(null)
        document.getElementById('delete-modal').close()
      } catch (error) {
        alert('删除草稿失败：' + error.message)
      }
    }
  }

  const handleCancelDelete = () => {
    setDraftToDelete(null)
    document.getElementById('delete-modal').close()
  }

  const handleConfirmLoad = () => {
    if (selectedDraft) {
      onLoadDraft(selectedDraft)
    }
    setSelectedDraft(null)
    document.getElementById('draft-modal').close()
  }

  const handleCancelLoad = () => {
    setSelectedDraft(null)
    document.getElementById('draft-modal').close()
  }

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0]
  const CurrentThemeIcon = currentTheme.icon

  return (
    <div className="w-52 h-full flex flex-col bg-base-200 border-r my-14">
      {/* 主题选择 */}
      <div className="p-4 border-b">
        <div className="w-full">
          <label className="block pb-2">
            <span className="font-medium flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <Settings size={16} />
              主题样式
            </span>
          </label>
          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-left flex items-center justify-between hover:border-violet-500 dark:hover:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all group"
            >
              <span className="flex items-center gap-2">
                <CurrentThemeIcon size={16} className="text-violet-500" />
                <span className="text-gray-700 dark:text-gray-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">{currentTheme.name}</span>
              </span>
              <ChevronDown size={16} className={`transition-transform duration-200 text-gray-400 group-hover:text-violet-500 ${isThemeOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isThemeOpen && (
              <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 ring-1 ring-black ring-opacity-5">
                {THEMES.map(t => {
                  const ThemeIcon = t.icon
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        onThemeChange(t.id)
                        setIsThemeOpen(false)
                      }}
                      className={`w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 transition-colors
                        ${theme === t.id 
                          ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 dark:hover:text-violet-400'
                        }`}
                    >
                      <ThemeIcon size={16} className={theme === t.id ? 'text-violet-500' : 'text-gray-400'} />
                      {t.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 草稿列表 */}
      <div className="flex-1 overflow-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-base-content/70 mb-2">
            <FileText size={14} />
            文稿管理
          </div>
          <div className="space-y-2">
            {drafts.map((draft, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded bg-base-100 hover:bg-base-300 cursor-pointer group"
                onClick={() => handleDraftClick(draft)}
              >
                <div className="truncate flex-1">{draft.title || '无标题文档'}</div>
                <button
                  className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                  onClick={(e) => handleDeleteClick(e, draft)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="sticky bottom-0 border-t p-3 space-y-2 bg-base-200 shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
        <button
          className="btn btn-sm btn-block bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm"
          onClick={onSaveDraft}
        >
          <Save size={14} className="mr-1" />
          保存草稿
        </button>
        <button className="btn btn-sm btn-block bg-violet-500 hover:bg-violet-600 text-white border-none shadow-sm">
          <Upload size={14} className="mr-1" />
          推送草稿
        </button>
        <button className="btn btn-sm btn-block bg-violet-600 hover:bg-violet-700 text-white border-none shadow-sm">
          <Send size={14} className="mr-1" />
          发布文章
        </button>
      </div>

      {/* 删除草稿确认对话框 */}
      <dialog id="delete-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">删除草稿</h3>
          <p className="py-4">确定要删除"{draftToDelete?.title || '无标题文档'}"吗？此操作不可恢复。</p>
          <div className="modal-action">
            <button className="btn" onClick={handleCancelDelete}>取消</button>
            <button className="btn bg-red-500 hover:bg-red-600 text-white border-none" onClick={handleConfirmDelete}>
              <Trash2 size={14} className="mr-1" />
              确认删除
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCancelDelete}>关闭</button>
        </form>
      </dialog>

      {/* 加载草稿确认对话框 */}
      <dialog id="draft-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">加载草稿</h3>
          <p className="py-4">确定要加载选中的草稿吗？当前未保存的内容将会丢失。</p>
          <div className="modal-action">
            <button className="btn" onClick={handleCancelLoad}>取消</button>
            <button className="btn btn-primary" onClick={handleConfirmLoad}>确定</button>
          </div>
        </div>
      </dialog>
    </div>
  )
} 