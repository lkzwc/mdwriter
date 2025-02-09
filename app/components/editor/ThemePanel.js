'use client'

import React from 'react'
import { Palette, Type, Layout, Quote, RotateCcw } from 'lucide-react'
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Slider,
  Button,
} from '@heroui/react'

// 预设主题配置
const presetThemes = {
  elegant: {
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
  },
  modern: {
    preset: 'modern',
    bodyFont: 'sans',
    fontSize: 15,
    lineHeight: 1.6,
    contentWidth: 'wide',
    paragraphSpacing: 1.4,
    quoteStyle: 'background',
    colors: {
      text: '#374151',
      heading: '#1f2937',
      link: '#2563eb',
      quote: '#6b7280',
      border: '#d1d5db',
    },
  },
  minimal: {
    preset: 'minimal',
    bodyFont: 'sans',
    fontSize: 14,
    lineHeight: 1.5,
    contentWidth: 'narrow',
    paragraphSpacing: 1.2,
    quoteStyle: 'modern',
    colors: {
      text: '#4b5563',
      heading: '#374151',
      link: '#60a5fa',
      quote: '#9ca3af',
      border: '#e5e7eb',
    },
  },
}

export function ThemePanel({ config, onChange }) {
  // 获取当前预设主题的默认配置
  const getPresetDefaults = (presetName) => {
    return presetThemes[presetName] || presetThemes.elegant
  }

  // 重置为预设主题的默认配置
  const handleReset = () => {
    const defaults = getPresetDefaults(config.preset)
    onChange?.(defaults)
  }

  // 处理配置变更
  const handleChange = (key, value) => {
    // 如果切换预设主题，加载该主题的默认配置
    if (key === 'preset') {
      const defaults = getPresetDefaults(value)
      onChange?.(defaults)
      return
    }
    
    // 其他配置项正常更新
    onChange?.({ ...config, [key]: value })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <Card>
          <CardBody className="p-2 overflow-hidden">
            <Select
              label="预设主题"
              selectedKey={config.preset}
              onSelectionChange={(key) => handleChange('preset', key)}
              size="sm"
              startContent={<Palette className="w-4 h-4" />}
            >
              <SelectItem key="elegant">典雅</SelectItem>
              <SelectItem key="modern">现代</SelectItem>
              <SelectItem key="minimal">极简</SelectItem>
            </Select>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-2 space-y-2 overflow-hidden">
            <Select
              label="字体"
              selectedKey={config.bodyFont}
              onSelectionChange={(key) => handleChange('bodyFont', key)}
              size="sm"
              startContent={<Type className="w-4 h-4" />}
            >
              <SelectItem key="sans">无衬线</SelectItem>
              <SelectItem key="serif">衬线</SelectItem>
            </Select>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>字号</span>
                <span>{config.fontSize}px</span>
              </div>
              <Slider
                min={12}
                max={20}
                step={1}
                value={config.fontSize}
                onChange={(value) => handleChange('fontSize', value)}
                size="sm"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>行高</span>
                <span>{config.lineHeight}</span>
              </div>
              <Slider
                min={1.2}
                max={2}
                step={0.1}
                value={config.lineHeight}
                onChange={(value) => handleChange('lineHeight', value)}
                size="sm"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-2 space-y-2 overflow-hidden">
            <Select
              label="内容宽度"
              selectedKey={config.contentWidth}
              onSelectionChange={(key) => handleChange('contentWidth', key)}
              size="sm"
              startContent={<Layout className="w-4 h-4" />}
            >
              <SelectItem key="narrow">窄</SelectItem>
              <SelectItem key="normal">中</SelectItem>
              <SelectItem key="wide">宽</SelectItem>
            </Select>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>段落间距</span>
                <span>{config.paragraphSpacing}</span>
              </div>
              <Slider
                min={1}
                max={2.5}
                step={0.1}
                value={config.paragraphSpacing}
                onChange={(value) => handleChange('paragraphSpacing', value)}
                size="sm"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-2 overflow-hidden">
            <Select
              label="引用样式"
              selectedKey={config.quoteStyle}
              onSelectionChange={(key) => handleChange('quoteStyle', key)}
              size="sm"
              startContent={<Quote className="w-4 h-4" />}
            >
              <SelectItem key="border">边线</SelectItem>
              <SelectItem key="background">背景</SelectItem>
              <SelectItem key="modern">现代</SelectItem>
            </Select>
          </CardBody>
        </Card>
      </div>

      {/* 重置按钮 */}
      <div className="p-2 border-t bg-gray-50">
        <Button
          variant="light"
          size="sm"
          startContent={<RotateCcw className="w-4 h-4" />}
          onClick={handleReset}
          className="w-full"
        >
          重置为预设样式
        </Button>
      </div>
    </div>
  )
}