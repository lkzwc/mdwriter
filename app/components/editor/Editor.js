"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Settings,
  Save,
  Send,
  X,
  FileText,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemePanel } from "./ThemePanel";
import { useDrafts } from "@/hooks/useDrafts";

// 动态导入 Preview 组件，禁用 SSR
const Preview = dynamic(() => import("./PreviewNew"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-400">
      加载预览组件...
    </div>
  ),
});

export default function Editor({
  content,
  theme,
  onContentChange,
  onThemeChange,
  onSaveDraft,
  currentDraftId,
  onLoadDraft,
}) {
  const [mounted, setMounted] = useState(false);
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const { drafts, deleteDraft } = useDrafts();
  const [publishForm, setPublishForm] = useState({
    title: "",
    account: "",
  });

  // 模拟公众号列表
  const accounts = [
    { id: "1", name: "测试公众号1" },
    { id: "2", name: "测试公众号2" },
  ];
  const [themeConfig, setThemeConfig] = useState({
    fontSize: 14,
    lineHeight: 1.8,
    fontFamily: "system-ui",
    headingStyle: "elegant",
    spacing: "适中",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handlePublish = (isDraft = false) => {
    console.log("发布内容:", {
      ...publishForm,
      content,
      isDraft,
    });
    setIsPublishModalOpen(false);
    // 重置表单
    setPublishForm({ title: "", account: "" });
  };

  return (
    <div className="flex-1 flex h-full bg-base-100 mt-16 relative">
      {/* 编辑区 */}
      <motion.div
        className="h-full flex flex-col border-r"
        animate={{
          width: isThemePanelOpen ? "40%" : isDraftsOpen ? "40%" : "50%",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
      >
        <textarea
          value={content || ""}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="开始编写内容..."
          className="flex-1 p-4 bg-transparent outline-none resize-none overflow-auto"
        />
      </motion.div>

      {/* 预览区 */}
      <div className="flex-1 flex">
        <motion.div
          className="flex-1 h-full overflow-auto relative"
          animate={{
            width:
              isThemePanelOpen || isDraftsOpen ? "calc(100% - 320px)" : "100%",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 150 }}
        >
          <Preview content={content} theme={theme} config={themeConfig} />

          {/* 操作按钮组 - 竖向排列 */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={onSaveDraft}
              className="p-2 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all text-gray-600 hover:text-violet-600 group relative"
            >
              <Save size={20} />
              <span className="absolute left-0 -translate-x-full -translate-y-1/2 top-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                保存草稿
              </span>
            </button>
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="p-2 rounded-lg bg-violet-600 hover:bg-violet-700 shadow-lg hover:shadow-xl transition-all text-white group relative"
            >
              <Send size={20} />
              <span className="absolute left-0 -translate-x-full -translate-y-1/2 top-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                发布文章
              </span>
            </button>
            <div className="w-full h-px bg-gray-200" />
            <button
              onClick={() => {
                setIsDraftsOpen(!isDraftsOpen);
                setIsThemePanelOpen(false);
              }}
              className={`p-2 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all group relative
                ${
                  isDraftsOpen
                    ? "bg-violet-50 text-violet-600"
                    : "text-gray-600 hover:text-violet-600"
                }`}
            >
              <FileText size={20} />
              <span className="absolute left-0 -translate-x-full -translate-y-1/2 top-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                草稿管理
              </span>
            </button>
            <button
              onClick={() => {
                setIsThemePanelOpen(!isThemePanelOpen);
                setIsDraftsOpen(false);
              }}
              className={`p-2 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all group relative
                ${
                  isThemePanelOpen
                    ? "bg-violet-50 text-violet-600"
                    : "text-gray-600 hover:text-violet-600"
                }`}
            >
              <Settings size={20} />
              <span className="absolute left-0 -translate-x-full -translate-y-1/2 top-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                主题设置
              </span>
            </button>
          </div>
        </motion.div>

        {/* 草稿管理侧边栏 */}
        <AnimatePresence>
          {isDraftsOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="h-full border-l bg-white"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FileText size={20} className="text-violet-500" />
                    草稿管理
                  </h3>
                  <button
                    onClick={() => setIsDraftsOpen(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-3">
                    {drafts.map((draft) => (
                      <div
                        key={draft.id}
                        className={`p-3 rounded-xl border transition-all cursor-pointer group
                          ${
                            currentDraftId === draft.id
                              ? "border-violet-500 bg-violet-50/50"
                              : "border-gray-200 hover:border-violet-500 hover:bg-violet-50/30"
                          }`}
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className="flex-1 min-w-0"
                            onClick={() => onLoadDraft(draft)}
                          >
                            <h4 className="font-medium text-gray-900 truncate">
                              {draft.title || "无标题草稿"}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(draft.date).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm("确定要删除这个草稿吗？")) {
                                deleteDraft(draft.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {drafts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        暂无草稿
                      </div>
                    )}

                    {drafts.length >= 3 && (
                      <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-lg text-sm">
                        草稿数量已达上限，请删除不需要的草稿
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 主题设置面板 */}
        <AnimatePresence>
          {isThemePanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="h-full border-l bg-white"
            >
              <ThemePanel
                theme={theme}
                onThemeChange={onThemeChange}
                config={themeConfig}
                onConfigChange={setThemeConfig}
                onClose={() => setIsThemePanelOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 发布弹框 */}
      {isPublishModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box w-[480px] max-w-[90vw]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">发布文章</h3>
              <button 
                onClick={() => setIsPublishModalOpen(false)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">文章标题</span>
                </label>
                <input
                  type="text"
                  value={publishForm.title}
                  onChange={(e) =>
                    setPublishForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="请输入文章标题"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">选择公众号</span>
                </label>
                <select
                  value={publishForm.account}
                  onChange={(e) =>
                    setPublishForm((prev) => ({
                      ...prev,
                      account: e.target.value,
                    }))
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">请选择公众号</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => handlePublish(true)}
                className="btn btn-outline"
              >
                推送到草稿
              </button>
              <button
                onClick={() => handlePublish(false)}
                className="btn btn-primary"
              >
                直接发布
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsPublishModalOpen(false)} />
        </dialog>
      )}
    </div>
  );
}
