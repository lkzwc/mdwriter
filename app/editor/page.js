'use client'

import { useState } from 'react'
import { Editor } from '@/app/components/editor/Editor'
import { Sidebar } from '@/app/components/editor/Sidebar'
import { useDrafts } from '@/app/hooks/useDrafts'

export default function EditorPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [theme, setTheme] = useState('wechat-elegant')
  const { drafts, saveDraft, deleteDraft } = useDrafts()

  const handleLoadDraft = (draft) => {
    setTitle(draft.title)
    setContent(draft.content)
  }

  const handleSaveDraft = () => {
    saveDraft({ title, content })
  }

  return (
    <div className="fixed inset-0 flex">
      <Sidebar 
        drafts={drafts}
        onSaveDraft={handleSaveDraft}
        onDeleteDraft={deleteDraft}
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