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

  return (
    <div className="min-h-screen pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          drafts={drafts}
          onSaveDraft={() => saveDraft({ title, content })}
          onDeleteDraft={deleteDraft}
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
    </div>
  )
} 