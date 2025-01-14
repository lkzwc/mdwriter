'use client'

import { useState } from 'react'
import { Editor } from '@/components/editor/Editor'
import { Sidebar } from '@/components/editor/Sidebar'
import { useDrafts } from '@/hooks/useDrafts'

export default function EditorPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [theme, setTheme] = useState('wechat-elegant')
  const { drafts, saveDraft, deleteDraft } = useDrafts()

  const handleSaveDraft = async () => {
    try {
      await saveDraft({
        title,
        content
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLoadDraft = (draft) => {
    setTitle(draft.title)
    setContent(draft.content)
  }

  const handleDeleteDraft = async (draftId) => {
    try {
      await deleteDraft(draftId)
    } catch (error) {
      alert('删除草稿失败：' + error.message)
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        drafts={drafts}
        onSaveDraft={handleSaveDraft}
        onDeleteDraft={handleDeleteDraft}
        onLoadDraft={handleLoadDraft}
        theme={theme}
        onThemeChange={setTheme}
      />
      <Editor
        title={title}
        content={content}
        theme={theme}
        onTitleChange={setTitle}
        onContentChange={setContent}
      />
    </div>
  )
} 