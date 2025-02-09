/** @jsxImportSource @emotion/react */
'use client'

import React, { useState, useEffect } from 'react'
import { Preview } from './PreviewNew'
import { ThemePanel } from './ThemePanel'
import { Button, Tooltip, Drawer, DrawerContent, DrawerHeader, DrawerBody } from '@heroui/react'
import { Save, FileText, Send, Bot } from 'lucide-react'
import { useDrafts } from '@/hooks/useDrafts'

// 生成主题样式
const generateThemeStyles = (config) => {
  const fontFamily = {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  }

  const width = {
    narrow: '65ch',
    normal: '80ch',
    wide: '100ch',
  }

  const quoteStyles = {
    border: {
      borderLeft: '4px solid var(--quote-border-color)',
      paddingLeft: '1rem',
      fontStyle: 'italic',
      color: 'var(--quote-color)',
    },
    background: {
      backgroundColor: 'var(--quote-bg-color)',
      padding: '1rem',
      borderRadius: '0.5rem',
      color: 'var(--quote-color)',
    },
    modern: {
      borderLeft: '2px solid var(--link-color)',
      backgroundColor: 'var(--quote-bg-color)',
      padding: '1rem',
      borderRadius: '0 0.5rem 0.5rem 0',
      color: 'var(--quote-color)',
    },
  }

  return {
    article: {
      '--text-color': config.colors.text,
      '--heading-color': config.colors.heading,
      '--link-color': config.colors.link,
      '--quote-color': config.colors.quote,
      '--quote-border-color': config.colors.border,
      '--quote-bg-color': 'color-mix(in srgb, var(--quote-color) 10%, transparent)',
      
      fontFamily: fontFamily[config.bodyFont],
      fontSize: `${config.fontSize}px`,
      lineHeight: config.lineHeight,
      maxWidth: width[config.contentWidth],
      margin: '0 auto',
      color: 'var(--text-color)',
      
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        color: 'var(--heading-color)',
        marginBottom: '1rem',
        fontWeight: '600',
        lineHeight: 1.3,
      },
      
      '& h1': { fontSize: '2em' },
      '& h2': { fontSize: '1.5em' },
      '& h3': { fontSize: '1.25em' },
      '& h4': { fontSize: '1.1em' },
      
      '& p': {
        marginBottom: `${config.paragraphSpacing}rem`,
      },
      
      '& a': {
        color: 'var(--link-color)',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      
      '& blockquote': {
        ...quoteStyles[config.quoteStyle],
        margin: '1.5rem 0',
      },
      
      '& img': {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '0.5rem',
      },
      
      '& ul, & ol': {
        paddingLeft: '1.5rem',
        marginBottom: `${config.paragraphSpacing}rem`,
      },
      
      '& li': {
        marginBottom: '0.5rem',
      },
      
      '& hr': {
        border: 'none',
        height: '1px',
        backgroundColor: 'var(--quote-border-color)',
        margin: '2rem 0',
      },
    },
  }
}

export default function Editor({ 
  content = '', 
  onContentChange,
  onThemeChange,
}) {
  const [mounted, setMounted] = useState(false)
  const [showThemePanel, setShowThemePanel] = useState(false)
  const [isDraftsOpen, setIsDraftsOpen] = useState(false)
  const { saveDraft, deleteDraft, loadDrafts } = useDrafts()
  const [config, setConfig] = useState({
    preset: 'elegant',
    bodyFont: 'serif',
    fontSize: 16,
    lineHeight: 1.8,
    contentWidth: 'normal',
    paragraphSpacing: 1.6,
    quoteStyle: 'border',
    colors: {
      text: '#1f2937',
      heading: '#111827',
      link: '#3b82f6',
      quote: '#4b5563',
      border: '#e5e7eb',
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig)
    const styles = generateThemeStyles(newConfig)
    onThemeChange?.(styles)
  }

  useEffect(() => {
    handleConfigChange(config)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 min-h-0">
        {/* 编辑区域 */}
        <div className="flex-1 min-w-0 h-full">
          <textarea
            className="w-full h-full p-4 resize-none outline-none"
            value={content}
            onChange={(e) => onContentChange?.(e.target.value)}
            placeholder="开始编写..."
          />
        </div>

        {/* 预览区域 */}
        <div className="flex-1 min-w-0 h-full overflow-auto border-l">
          <Preview content={content} styles={generateThemeStyles(config)} />
        </div>

        {/* 主题设置面板 */}
        {showThemePanel && (
          <div className="w-[280px] h-full border-l overflow-auto bg-gray-50">
            <ThemePanel config={config} onChange={handleConfigChange} />
          </div>
        )}

        {/* 操作按钮区 */}
        <div className="w-[60px] h-full border-l flex flex-col items-center gap-2 py-4 bg-gray-50">
          <Tooltip content="保存草稿" placement="left">
            <Button
              variant="light"
              size="sm"
              isIconOnly
              onClick={() => saveDraft({ content })}
            >
              <Save className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="发布文章" placement="left">
            <Button
              variant="primary"
              size="sm"
              isIconOnly
              onClick={() => {}}
            >
              <Send className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="草稿管理" placement="left">
            <Button
              variant="light"
              size="sm"
              isIconOnly
              onClick={() => setIsDraftsOpen(true)}
            >
              <FileText className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="主题设置" placement="left">
            <Button
              variant={showThemePanel ? "primary" : "light"}
              size="sm"
              isIconOnly
              onClick={() => setShowThemePanel(!showThemePanel)}
            >
              <Bot className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* 草稿管理抽屉 */}
      <Drawer 
        isOpen={isDraftsOpen} 
        onOpenChange={setIsDraftsOpen}
        placement="right"
      >
        <DrawerContent>
          <DrawerHeader>草稿管理</DrawerHeader>
          <DrawerBody>
            {/* TODO: 草稿列表 */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
