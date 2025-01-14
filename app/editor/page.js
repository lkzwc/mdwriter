'use client'

import { useState } from 'react'
import { Sidebar } from '../components/editor/Sidebar'
import { Editor } from '../components/editor/Editor'
import { useDrafts } from '../hooks/useDrafts'

export default function EditorPage() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const { drafts, saveDraft, deleteDraft } = useDrafts()
  const [currentTheme, setCurrentTheme] = useState('wechat-elegant')

  const handleSaveDraft = async () => {
    if (!content?.trim()) {
      alert('请先输入内容后再保存')
      return
    }
    try {
      await saveDraft({
        title: title || '未命名草稿',
        content,
      })
    } catch (error) {
      alert('保存草稿失败')
    }
  }

  const handleDeleteDraft = async (id) => {
    try {
      await deleteDraft(id)
    } catch (error) {
      alert('删除草稿失败')
    }
  }

  const handleLoadDraft = (draft) => {
    setTitle(draft.title)
    setContent(draft.content)
  }

  const handlePublish = () => {
    if (!content?.trim()) {
      alert('请先输入内容后再发布')
      return
    }
    // TODO: 实现发布逻辑
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="h-[calc(100vh-4rem)] flex">
        {/* 左侧功能区 */}
        <Sidebar
          onSave={handleSaveDraft}
          onPublish={handlePublish}
          onLoadDraft={handleLoadDraft}
          onDeleteDraft={handleDeleteDraft}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          title={title}
          content={content}
        />

        {/* 编辑器主体 */}
        <Editor
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          theme={currentTheme}
        />
      </div>
    </div>
  )
} 