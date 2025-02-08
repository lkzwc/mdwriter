'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useDrafts } from '@/hooks/useDrafts'

// 动态导入 Editor 组件，禁用 SSR
const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-gray-400">加载编辑器...</div>
    </div>
  )
})

export default function EditorPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [theme, setTheme] = useState('wechat-elegant')
  const [mounted, setMounted] = useState(false)
  const { drafts, saveDraft, deleteDraft } = useDrafts()

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen">
      <Editor
        title={title}
        content={content}
        theme={theme}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onThemeChange={setTheme}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}