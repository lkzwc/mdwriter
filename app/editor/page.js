"use client"

import { useState } from 'react'
import { Editor } from '@/components/editor/Editor'
import { defaultTheme } from '@/components/editor/ThemePanel'

export default function EditorPage() {
  const [content, setContent] = useState('')

  return (
    <div className="h-screen bg-gray-100 pt-20 pb-5 px-5">
      <div className="h-full bg-white shadow-sm rounded-sm">
        <Editor
          content={content}
          onContentChange={setContent}
        />
      </div>
    </div>
  )
}