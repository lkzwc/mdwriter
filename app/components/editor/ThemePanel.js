"use client";

import React from "react";
import { Palette, Type, Layout, Quote, RotateCcw } from "lucide-react";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Slider,
  Button,
} from "@heroui/react";

// 预设主题配置
const presetThemes = {
  elegant: {
    preset: "elegant",
    bodyFont: "serif",
    fontSize: 16,
    lineHeight: 1.8,
    contentWidth: "normal",
    paragraphSpacing: 1.6,
    quoteStyle: "border",
    colors: {
      text: "#1f2937",
      heading: "#111827",
      link: "#3b82f6",
      quote: "#4b5563",
      border: "#e5e7eb",
    },
  },
  modern: {
    preset: "modern",
    bodyFont: "sans",
    fontSize: 15,
    lineHeight: 1.6,
    contentWidth: "wide",
    paragraphSpacing: 1.4,
    quoteStyle: "background",
    colors: {
      text: "#374151",
      heading: "#1f2937",
      link: "#2563eb",
      quote: "#6b7280",
      border: "#d1d5db",
    },
  },
  minimal: {
    preset: "minimal",
    bodyFont: "sans",
    fontSize: 14,
    lineHeight: 1.5,
    contentWidth: "narrow",
    paragraphSpacing: 1.2,
    quoteStyle: "modern",
    colors: {
      text: "#4b5563",
      heading: "#374151",
      link: "#60a5fa",
      quote: "#9ca3af",
      border: "#e5e7eb",
    },
  },
};

// 默认主题
export const defaultTheme = presetThemes.elegant;

export function ThemePanel({ config = defaultTheme, onChange }) {
  // 获取当前预设主题的默认配置
  const getPresetDefaults = (presetName) => {
    return presetThemes[presetName] || presetThemes.elegant;
  };

  // 重置为预设主题的默认配置
  const handleReset = () => {
    const defaults = getPresetDefaults(config.preset);
    onChange?.(defaults);
  };

  // 处理配置变更
  const handleChange = (key, value) => {
    // 如果切换预设主题，加载该主题的默认配置
    if (key === "preset") {
      const defaults = getPresetDefaults(value);
      onChange?.(defaults);
      return;
    }

    // 其他配置项正常更新
    onChange?.({ ...config, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardBody className="p-4">
          <div className="space-y-4">
            <div>
              <Select
                label="预设主题"
                selectedKey={config.preset}
                onSelectionChange={(key) => handleChange("preset", key)}
                size="sm"
                startContent={<Palette className="w-4 h-4" />}
              >
                <SelectItem key="elegant" value="elegant">优雅</SelectItem>
                <SelectItem key="modern" value="modern">现代</SelectItem>
                <SelectItem key="minimal" value="minimal">简约</SelectItem>
              </Select>
            </div>
            <div>
              <Select
                label="字体"
                selectedKey={config.bodyFont}
                onSelectionChange={(key) => handleChange("bodyFont", key)}
                size="sm"
                startContent={<Type className="w-4 h-4" />}
              >
                <SelectItem key="serif" value="serif">衬线字体</SelectItem>
                <SelectItem key="sans" value="sans">无衬线字体</SelectItem>
              </Select>
            </div>
            <div>
              <Select
                label="内容宽度"
                selectedKey={config.contentWidth}
                onSelectionChange={(key) => handleChange("contentWidth", key)}
                size="sm"
                startContent={<Layout className="w-4 h-4" />}
              >
                <SelectItem key="narrow" value="narrow">窄</SelectItem>
                <SelectItem key="normal" value="normal">中等</SelectItem>
                <SelectItem key="wide" value="wide">宽</SelectItem>
              </Select>
            </div>
            <div>
              <Select
                label="引用样式"
                selectedKey={config.quoteStyle}
                onSelectionChange={(key) => handleChange("quoteStyle", key)}
                size="sm"
                startContent={<Quote className="w-4 h-4" />}
              >
                <SelectItem key="border" value="border">边框</SelectItem>
                <SelectItem key="background" value="background">背景</SelectItem>
                <SelectItem key="modern" value="modern">现代</SelectItem>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-4">
          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">字体大小: {config.fontSize}px</label>
              <Slider 
                size="sm"
                step={1}
                maxValue={20}
                minValue={12}
                value={config.fontSize}
                onChange={(value) => handleChange("fontSize", value)}
                className="max-w-md"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">行高: {config.lineHeight}</label>
              <Slider
                size="sm"
                step={0.1}
                maxValue={2}
                minValue={1}
                value={config.lineHeight}
                onChange={(value) => handleChange("lineHeight", value)}
                className="max-w-md"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">段落间距: {config.paragraphSpacing}em</label>
              <Slider
                size="sm"
                step={0.1}
                maxValue={2}
                minValue={1}
                value={config.paragraphSpacing}
                onChange={(value) => handleChange("paragraphSpacing", value)}
                className="max-w-md"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button
          size="sm"
          variant="light"
          startContent={<RotateCcw className="w-4 h-4" />}
          onClick={handleReset}
        >
          重置为预设值
        </Button>
      </div>
    </div>
  );
}