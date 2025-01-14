'use client'
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/editor/Sidebar';
import { Editor } from '../components/editor/Editor';
import { Preview } from '../components/editor/Preview';
import { useDraft } from '../hooks/use-draft';

export default function EditorPage() {
  const [content, setContent] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('default');
  const { saveDraft, loadDrafts } = useDraft();

  // 加载草稿
  useEffect(() => {
    const drafts = loadDrafts();
    if (drafts.length > 0) {
      // 加载最新的草稿
      setContent(drafts[0].content);
    }
  }, []);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const handleSaveDraft = async () => {
    await saveDraft(content);
  };

  const handlePublish = async (shouldPublish = false) => {
    // TODO: 实现发布逻辑
    console.log('Publishing...', { content, shouldPublish });
  };

  const handleSelectTemplate = (templateContent) => {
    if (content && !window.confirm('当前内容将被替换，是否继续？')) {
      return;
    }
    setContent(templateContent);
  };

  return (
    <div className="flex h-screen pt-16">
      {/* 左侧功能区 */}
      <Sidebar 
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* 中间编辑区 */}
      <Editor 
        content={content}
        onChange={handleContentChange}
      />

      {/* 右侧预览区 */}
      <Preview 
        content={content}
        theme={selectedTheme}
      />
    </div>
  );
} 