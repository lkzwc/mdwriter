'use client'

import { motion } from 'framer-motion'
import { Palette, ChevronRight, Type, Maximize2, Settings } from 'lucide-react'

export function ThemePanel({ theme, onThemeChange, config, onConfigChange, onClose }) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Palette size={20} className="text-violet-500" />
          主题配置
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {/* 主题选择 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">预设主题</label>
            <div className="grid grid-cols-2 gap-2">
              {['典雅', '现代', '杂志', '创意', '商务'].map((themeName) => (
                <button
                  key={themeName}
                  className={`p-2.5 rounded-lg border text-sm transition-all
                    ${theme === themeName 
                      ? 'border-violet-500 bg-violet-50 text-violet-700' 
                      : 'border-gray-200 hover:border-violet-500 hover:bg-violet-50'
                    }`}
                  onClick={() => onThemeChange(themeName)}
                >
                  {themeName}
                </button>
              ))}
            </div>
          </div>

          {/* 字体设置 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Type size={16} />
              字体设置
            </label>
            <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
              <div>
                <label className="block text-sm text-gray-600 mb-1">字体</label>
                <select
                  value={config.fontFamily}
                  onChange={(e) => onConfigChange({ ...config, fontFamily: e.target.value })}
                  className="w-full rounded-lg border-gray-200 text-sm focus:border-violet-500 focus:ring-violet-500 bg-white"
                >
                  <option value="system-ui">系统默认</option>
                  <option value="serif">宋体</option>
                  <option value="sans-serif">黑体</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">字号</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="12"
                    max="20"
                    value={config.fontSize}
                    onChange={(e) => onConfigChange({ ...config, fontSize: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 w-12 text-right">{config.fontSize}px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">行高</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1.4"
                    max="2.2"
                    step="0.1"
                    value={config.lineHeight}
                    onChange={(e) => onConfigChange({ ...config, lineHeight: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 w-12 text-right">{config.lineHeight}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 间距设置 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Maximize2 size={16} />
              间距设置
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['紧凑', '适中', '宽松'].map((spacing) => (
                <button
                  key={spacing}
                  className={`p-2 rounded-lg border text-sm transition-all
                    ${config.spacing === spacing 
                      ? 'border-violet-500 bg-violet-50 text-violet-700' 
                      : 'border-gray-200 hover:border-violet-500 hover:bg-violet-50'
                    }`}
                  onClick={() => onConfigChange({ ...config, spacing })}
                >
                  {spacing}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}