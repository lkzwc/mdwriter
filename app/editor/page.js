'use client'

import { useState } from 'react'
import {Editor} from '@/components/editor/Editor'

export default function EditorPage() {
  const [content, setContent] = useState('')
  const [themeStyles, setThemeStyles] = useState(null)

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <div className="h-full max-w-screen-2xl mx-auto px-4">
        <div className="h-full bg-white rounded-lg shadow-sm">
          <Editor
            content={content}
            onContentChange={setContent}
            onThemeChange={setThemeStyles}
          />
        </div>
      </div>
    </div>
  )
}