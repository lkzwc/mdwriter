"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Settings,
  Save,
  Send,
  X,
  FileText,
  Bot,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemePanel } from "./ThemePanel";
import { useDrafts } from "@/hooks/useDrafts";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Card,
  Divider,
  Alert,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";

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
      <div className="w-1/2 h-full flex flex-col border-r">
        <textarea
          value={content || ""}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="开始编写内容..."
          className="flex-1 p-4 bg-transparent outline-none resize-none overflow-auto"
        />
      </div>

      {/* 预览区 */}
      <div className="flex-1 h-full overflow-auto relative">
        <Preview content={content} theme={theme} config={themeConfig} />

        {/* 操作按钮组 */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="light"
            size="lg"
            isIconOnly
            tooltip="AI一键改写"
            onClick={onSaveDraft}
          >
            <Bot size={20} />
          </Button>
          <Button
            variant="light"
            size="lg"
            isIconOnly
            tooltip="保存草稿"
            onClick={onSaveDraft}
          >
            <Save size={20} />
          </Button>
          <Button
            variant="primary"
            size="lg"
            isIconOnly
            tooltip="发布文章"
            onClick={() => setIsPublishModalOpen(true)}
          >
            <Send size={20} />
          </Button>
          <Divider />
          <Button
            variant={isDraftsOpen ? "primary-light" : "light"}
            size="lg"
            isIconOnly
            tooltip="草稿管理"
            onClick={() => {
              setIsDraftsOpen(true);
              setIsThemePanelOpen(false);
            }}
          >
            <FileText size={20} />
          </Button>
          <Button
            variant={isThemePanelOpen ? "primary-light" : "light"}
            size="lg"
            isIconOnly
            tooltip="主题设置"
            onClick={() => {
              setIsThemePanelOpen(true);
              setIsDraftsOpen(false);
            }}
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      {/* 草稿管理抽屉 */}
      <Drawer 
        isOpen={isDraftsOpen} 
        onOpenChange={setIsDraftsOpen}
        placement="right"
        size="md"
      >
          <DrawerContent className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl">
            <DrawerHeader className="px-6 py-4 border-b">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-primary" />
                <span className="text-lg font-semibold">草稿管理</span>
              </div>
            </DrawerHeader>
            <DrawerBody className="p-6">
              <div className="space-y-3">
                {drafts.map((draft) => (
                  <Card
                    key={draft.id}
                    className={`cursor-pointer transition-all ${
                      currentDraftId === draft.id
                        ? "ring-2 ring-primary"
                        : "hover:ring-1 hover:ring-primary/50"
                    }`}
                  >
                    <div className="p-4">
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
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          className="text-error opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("确定要删除这个草稿吗？")) {
                              deleteDraft(draft.id);
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {drafts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    暂无草稿
                  </div>
                )}

                {drafts.length >= 3 && (
                  <Alert variant="warning">
                    草稿数量已达上限，请删除不需要的草稿
                  </Alert>
                )}
              </div>
            </DrawerBody>
          </DrawerContent>
      </Drawer>

      {/* 主题设置抽屉 */}
      <Drawer 
        isOpen={isThemePanelOpen}
        onOpenChange={setIsThemePanelOpen}
        placement="right"
        size="md"
      >
          <DrawerContent className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl">
            <ThemePanel
              theme={theme}
              onThemeChange={onThemeChange}
              config={themeConfig}
              onConfigChange={setThemeConfig}
            />
          </DrawerContent>
      </Drawer>

      {/* 发布弹框 */}
      <Modal
        isOpen={isPublishModalOpen}
        onOpenChange={(open) => setIsPublishModalOpen(open)}
      >
        <ModalContent>
          <ModalHeader>
          发布文章
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <Input label="标题" placeholder="晴输入你的文字标题" />
              </div>
              <div>
                <Select 
                  label="选择公众号"
                  placeholder="请选择公众号"
                  selectedKeys={publishForm.account ? [publishForm.account] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    setPublishForm((prev) => ({
                      ...prev,
                      account: selectedKey,
                    }));
                  }}
                >
                  {accounts.map((account) => (
                    <SelectItem key={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => handlePublish(true)}>
              推送到草稿
            </Button>
            <Button variant="primary" onClick={() => handlePublish(false)}>
              直接发布
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
