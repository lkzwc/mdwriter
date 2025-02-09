'use client'

import { useState } from 'react'
import {Editor} from '@/components/editor/Editor'

export default function EditorPage() {
  const [content, setContent] = useState('')
  const [themeStyles, setThemeStyles] = useState(null)

  return (
    <div className="h-screen bg-gray-100 pt-20 pb-5 px-5">
        <div className="h-full bg-white shadow-sm rounded-sm">
          <Editor
            content={content}
            onContentChange={setContent}
            onThemeChange={setThemeStyles}
          />
        </div>
    </div>
  )
}