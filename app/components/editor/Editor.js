"use client";

import React, { useState, useEffect, useRef } from "react";
import { Preview } from "./PreviewNew";
import { ThemePanel, defaultTheme } from "./ThemePanel";
import {
  Button,
  Tooltip,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerTrigger,
} from "@heroui/react";
import { Save, FileText, Send, Bot, Settings } from "lucide-react";
import { useDrafts } from "@/hooks/useDrafts";

export function Editor({ content = "", onContentChange, onThemeChange }) {
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
  const [themeConfig, setThemeConfig] = useState(defaultTheme);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const { saveDraft } = useDrafts();

  // 处理主题变更
  const handleThemeChange = (newConfig) => {
    setThemeConfig(newConfig);
    onThemeChange?.(newConfig);
  };

  // 同步滚动
  useEffect(() => {
    const editor = editorRef.current;
    const preview = previewRef.current;

    if (!editor || !preview) return;

    const handleScroll = (source) => {
      if (isScrolling) return;
      setIsScrolling(true);

      const target = source === editor ? preview : editor;
      const sourceElement = source === editor ? editor : preview;
      
      const percentage = sourceElement.scrollTop / (sourceElement.scrollHeight - sourceElement.clientHeight);
      target.scrollTop = percentage * (target.scrollHeight - target.clientHeight);

      setTimeout(() => setIsScrolling(false), 50);
    };

    const editorScrollHandler = () => handleScroll(editor);
    const previewScrollHandler = () => handleScroll(preview);

    editor.addEventListener('scroll', editorScrollHandler);
    preview.addEventListener('scroll', previewScrollHandler);

    return () => {
      editor.removeEventListener('scroll', editorScrollHandler);
      preview.removeEventListener('scroll', previewScrollHandler);
    };
  }, [isScrolling]);

  // 处理保存草稿
  const handleSaveDraft = async () => {
    try {
      await saveDraft({ content });
      // TODO: 添加保存成功提示
    } catch (error) {
      console.error("保存草稿失败:", error);
      // TODO: 添加错误提示
    }
  };

  return (
    <div className="flex h-full rounded-sm">
      {/* 编辑区 */}
      <div className={`flex-1 ${isThemePanelOpen ? 'basis-[calc(50%-140px)]' : 'basis-1/2'} transition-all duration-300 overflow-hidden`}>
        <textarea
          ref={editorRef}
          value={content}
          onChange={(e) => onContentChange?.(e.target.value)}
          className="w-full h-full resize-none border-none outline-none p-6 overflow-auto"
          placeholder="开始写作..."
        />
      </div>

      {/* 预览区 */}
      <div className={`flex-1 border-l ${isThemePanelOpen ? 'basis-[calc(50%-140px)]' : 'basis-1/2'} transition-all duration-300`}>
        <div ref={previewRef} className="h-full overflow-hidden">
          <Preview content={content} styles={generateThemeStyles(themeConfig)} />
        </div>
      </div>

      {/* 主题设置面板 */}
      <div className={`w-[280px] border-x border-gray-200 bg-white transition-all duration-300 ${
        isThemePanelOpen ? '' : 'w-0 opacity-0 overflow-hidden'
      }`}>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">主题设置</h2>
            <button
              onClick={() => setIsThemePanelOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <ThemePanel config={themeConfig} onChange={handleThemeChange} />
        </div>
      </div>

      {/* 操作按钮区 */}
      <div className="w-[50px] border-l border-gray-200 bg-gray-50/50 flex flex-col items-center py-4 space-y-2">
        <ActionButton
          icon={Save}
          tooltip="保存草稿"
          onClick={handleSaveDraft}
        />
        <ActionButton
          icon={FileText}
          tooltip="草稿箱"
          onClick={() => setIsDraftsOpen(true)}
        />
        <ActionButton
          icon={Send}
          tooltip="发布文章"
          onClick={() => setIsPublishOpen(true)}
        />
        <ActionButton
          icon={Bot}
          tooltip="AI 助手"
          onClick={() => setIsAIOpen(true)}
        />
        <ActionButton
          id="theme-button"
          icon={Settings}
          tooltip="主题设置"
          onClick={() => setIsThemePanelOpen(!isThemePanelOpen)}
        />
      </div>

      {/* 发布面板 */}
      <Drawer open={isPublishOpen} onOpenChange={setIsPublishOpen}>
        <DrawerContent>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">发布文章</h2>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4">
              {/* 发布表单 */}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* 草稿箱面板 */}
      <Drawer open={isDraftsOpen} onOpenChange={setIsDraftsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">草稿箱</h2>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4">
              {/* 草稿列表 */}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* AI助手面板 */}
      <Drawer open={isAIOpen} onOpenChange={setIsAIOpen}>
        <DrawerContent>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">AI 助手</h2>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4">
              {/* AI助手界面 */}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

// 生成主题样式
const generateThemeStyles = (config) => {
  const fontFamily = {
    serif: "'Noto Serif', 'Source Serif Pro', Georgia, Cambria, 'Times New Roman', Times, serif",
    sans: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  };

  const width = {
    narrow: '680px',
    normal: '780px',
    wide: '880px',
  };

  return {
    "--text-color": config.colors.text,
    "--heading-color": config.colors.heading,
    "--link-color": config.colors.link,
    "--quote-color": config.colors.quote,
    "--quote-border-color": config.colors.border,
    "--font-family": config.bodyFont === "serif" ? fontFamily.serif : fontFamily.sans,
    "--font-size": `${config.fontSize}px`,
    "--line-height": config.lineHeight,
    "--content-width": width[config.contentWidth],
    "--paragraph-spacing": `${config.paragraphSpacing}em`,
    "--quote-style": config.quoteStyle,
  };
};

// 自定义按钮组件
const ActionButton = ({ icon: Icon, tooltip, onClick, active }) => (
  <Tooltip content={tooltip}>
    <button
      onClick={onClick}
      className={`p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600`}
    >
      <Icon className="h-4 w-4" />
    </button>
  </Tooltip>
);
