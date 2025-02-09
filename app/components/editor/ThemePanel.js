"use client";

import React, { useState } from "react";
import { Palette, Type, Quote, RotateCcw } from "lucide-react";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Slider,
  Button,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
} from "@heroui/react";

// 预设主题配置
const presetThemes = {
  light: {
    preset: "light",
    name: "Light",
    colors: {
      text: "#1f2937",
      heading: "#111827",
      link: "#3b82f6",
      quote: "#4b5563",
      border: "#e5e7eb",
      background: "#ffffff",
      headingBorder: "#3b82f6",
      headingBackground: "#f3f4f6",
    },
    bodyFont: "sans",
    fontSize: 16,
    lineHeight: 1.8,
    paragraphSpacing: 1.6,
    headingStyle: "mixed",  // 新增：混合风格
    quoteStyle: "modern",
  },
  dark: {
    preset: "dark",
    name: "Dark",
    colors: {
      text: "#e5e7eb",
      heading: "#f3f4f6",
      link: "#60a5fa",
      quote: "#9ca3af",
      border: "#374151",
      background: "#111827",
      headingBorder: "#60a5fa",
      headingBackground: "#1f2937",
    },
    bodyFont: "sans",
    fontSize: 16,
    lineHeight: 1.8,
    paragraphSpacing: 1.6,
    headingStyle: "mixed",  // 新增：混合风格
    quoteStyle: "modern",
  },
  sepia: {
    preset: "sepia",
    name: "Sepia",
    colors: {
      text: "#57534e",
      heading: "#44403c",
      link: "#9a3412",
      quote: "#78716c",
      border: "#d6d3d1",
      background: "#faf7f5",
      headingBorder: "#9a3412",
      headingBackground: "#f5f5f4",
    },
    bodyFont: "serif",
    fontSize: 18,
    lineHeight: 1.9,
    paragraphSpacing: 1.8,
    headingStyle: "mixed",  // 新增：混合风格
    quoteStyle: "border",
  },
  wechat: {
    preset: "wechat",
    bodyFont: "sans",
    fontSize: 16,
    lineHeight: 1.8,
    paragraphSpacing: 1.6,
    quoteStyle: "background",
    headingStyle: "normal",
    colors: {
      text: "#3f3f3f",
      heading: "#1f2937",
      link: "#576b95",
      quote: "#666666",
      border: "#e5e7eb",
      background: "#ffffff",
      headingBorder: "#07c160",
      headingBackground: "#f7f7f7",
    },
  },
  elegant: {
    preset: "elegant",
    bodyFont: "serif",
    fontSize: 16,
    lineHeight: 1.8,
    paragraphSpacing: 1.6,
    quoteStyle: "border",
    headingStyle: "border",
    colors: {
      text: "#2c3e50",
      heading: "#1a202c",
      link: "#3498db",
      quote: "#718096",
      border: "#e2e8f0",
      background: "#ffffff",
      headingBorder: "#3498db",
      headingBackground: "#f8fafc",
    },
  },
  modern: {
    preset: "modern",
    bodyFont: "sans",
    fontSize: 15,
    lineHeight: 1.6,
    paragraphSpacing: 1.4,
    quoteStyle: "background",
    headingStyle: "background",
    colors: {
      text: "#374151",
      heading: "#1f2937",
      link: "#2563eb",
      quote: "#6b7280",
      border: "#d1d5db",
      background: "#ffffff",
      headingBorder: "#2563eb",
      headingBackground: "#f3f4f6",
    },
  },
  minimal: {
    preset: "minimal",
    bodyFont: "sans",
    fontSize: 14,
    lineHeight: 1.5,
    paragraphSpacing: 1.2,
    quoteStyle: "modern",
    headingStyle: "simple",
    colors: {
      text: "#4b5563",
      heading: "#374151",
      link: "#60a5fa",
      quote: "#9ca3af",
      border: "#e5e7eb",
      background: "#ffffff",
      headingBorder: "#60a5fa",
      headingBackground: "#f9fafb",
    },
  },
  cute: {
    preset: "cute",
    name: "可爱风格",
    colors: {
      text: "#4a5568",
      heading: "#e84393",
      link: "#3b82f6",
      quote: "#718096",
      border: "#fbb6ce",
      background: "#ffffff",
      headingBorder: "#fab1a0",
      headingBackground: "#fff5f7",
    },
    bodyFont: "sans",
    fontSize: 16,
    lineHeight: 1.8,
    paragraphSpacing: 1.6,
    headingStyle: "decorated",
    quoteStyle: "modern",
  },
  minimalist: {
    preset: "minimalist",
    name: "简约风格",
    colors: {
      text: "#2d3748",
      heading: "#1a202c",
      link: "#3182ce",
      quote: "#718096",
      border: "#e2e8f0",
      background: "#ffffff",
      headingBorder: "#4a5568",
      headingBackground: "#f7fafc",
    },
    bodyFont: "sans",
    fontSize: 16,
    lineHeight: 1.8,
    paragraphSpacing: 1.6,
    headingStyle: "minimalist",
    quoteStyle: "border",
  },
  cartoon: {
    preset: "cartoon",
    name: "卡通风格",
    colors: {
      text: "#4a5568",
      heading: "#ed64a6",
      link: "#4299e1",
      quote: "#718096",
      border: "#fbb6ce",
      background: "#ffffff",
      headingBorder: "#f687b3",
      headingBackground: "#fef6fa",
    },
    bodyFont: "sans",
    fontSize: 16,
    lineHeight: 1.8,
    paragraphSpacing: 1.6,
    headingStyle: "cartoon",
    quoteStyle: "modern",
  },
};

// 默认主题
export const defaultTheme = presetThemes.light;

export function ThemePanel({ config = defaultTheme, onChange }) {
  // 获取当前预设主题的默认配置
  const getPresetDefaults = (presetName) => {
    return presetThemes[presetName] || presetThemes.light;
  };

  // 重置为预设主题的默认配置
  const handleReset = () => {
    const defaults = getPresetDefaults(config.preset);
    onChange?.(defaults);
  };

  // 处理配置变更
  const handleChange = (key, value) => {
    if (key === "preset") {
      const defaults = getPresetDefaults(value);
      onChange?.(defaults);
      return;
    }

    if (key.startsWith("colors.")) {
      const colorKey = key.split(".")[1];
      onChange?.({
        ...config,
        colors: {
          ...config.colors,
          [colorKey]: value,
        },
      });
      return;
    }

    onChange?.({ ...config, [key]: value });
  };

  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="min-w-fit h-full bg-white p-2">
      <Tabs  className="flex-1 justify-center">
        <Tab key="basic" title="基础">
          <div className="space-y-4">
            {/* 预设主题选择 */}
            <div className="space-y-2">
              <Select
                label="预设主题"
                value={config.preset}
                onChange={(value) => handleChange("preset", value)}
                size="sm"
                startContent={<Palette className="w-4 h-4" />}
              >
                <SelectItem key="light" value="light">Light</SelectItem>
                <SelectItem key="dark" value="dark">Dark</SelectItem>
                <SelectItem key="sepia" value="sepia">Sepia</SelectItem>
                <SelectItem key="wechat" value="wechat">微信风格</SelectItem>
                <SelectItem key="elegant" value="elegant">优雅</SelectItem>
                <SelectItem key="modern" value="modern">现代</SelectItem>
                <SelectItem key="minimal" value="minimal">简约</SelectItem>
                <SelectItem key="cute" value="cute">可爱风格</SelectItem>
                <SelectItem key="minimalist" value="minimalist">简约风格</SelectItem>
                <SelectItem key="cartoon" value="cartoon">卡通风格</SelectItem>
              </Select>
            </div>

            {/* 字体设置 */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">字体设置</div>
              <div className="space-y-3">
                <RadioGroup
                  value={config.bodyFont}
                  onValueChange={(value) => handleChange("bodyFont", value)}
                  size="sm"
                  orientation="horizontal"
                >
                  <Radio value="sans">无衬线</Radio>
                  <Radio value="serif">衬线</Radio>
                </RadioGroup>
              </div>
            </div>

            {/* 字号和行高 */}
            <div className="grid grid-cols-2 gap-2">
              <Slider
                size="sm"
                label="字号"
                step={1}
                maxValue={20}
                minValue={12}
                value={config.fontSize}
                onChange={(value) => handleChange("fontSize", value)}
              />
              <Slider
                size="sm"
                label="行高"
                step={0.1}
                maxValue={2.5}
                minValue={1.2}
                value={config.lineHeight}
                onChange={(value) => handleChange("lineHeight", value)}
              />
            </div>

            {/* 段落间距 */}
            <div>
              <Slider
                size="sm"
                label="段落间距"
                step={0.1}
                maxValue={2.5}
                minValue={1}
                value={config.paragraphSpacing}
                onChange={(value) => handleChange("paragraphSpacing", value)}
              />
            </div>
          </div>
        </Tab>

        <Tab key="colors" title="颜色">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500">正文颜色</label>
                <input
                  type="color"
                  className="w-full h-8 rounded cursor-pointer"
                  value={config.colors.text}
                  onChange={(e) => handleChange("colors.text", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">标题颜色</label>
                <input
                  type="color"
                  className="w-full h-8 rounded cursor-pointer"
                  value={config.colors.heading}
                  onChange={(e) => handleChange("colors.heading", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">链接颜色</label>
                <input
                  type="color"
                  className="w-full h-8 rounded cursor-pointer"
                  value={config.colors.link}
                  onChange={(e) => handleChange("colors.link", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">引用颜色</label>
                <input
                  type="color"
                  className="w-full h-8 rounded cursor-pointer"
                  value={config.colors.quote}
                  onChange={(e) => handleChange("colors.quote", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">边框颜色</label>
                <input
                  type="color"
                  className="w-full h-8 rounded cursor-pointer"
                  value={config.colors.border}
                  onChange={(e) => handleChange("colors.border", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">背景颜色</label>
                <input
                  type="color"
                  className="w-full h-8 rounded cursor-pointer"
                  value={config.colors.background}
                  onChange={(e) => handleChange("colors.background", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">标题边框</label>
                <input
                  type="color"
                  className="w-full h-8 rounded cursor-pointer"
                  value={config.colors.headingBorder}
                  onChange={(e) => handleChange("colors.headingBorder", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">标题背景</label>
                <input
                  type="color"
                  className="w-full h-8 rounded cursor-pointer"
                  value={config.colors.headingBackground}
                  onChange={(e) => handleChange("colors.headingBackground", e.target.value)}
                />
              </div>
            </div>
          </div>
        </Tab>

        <Tab key="styles" title="样式">
          <div className="space-y-4">
            {/* 标题样式 */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Type className="w-4 h-4" />
                标题样式
              </div>
              <div className="space-y-1">
                <RadioGroup
                  value={config.headingStyle}
                  onValueChange={(value) => handleChange("headingStyle", value)}
                  size="sm"
                >
                  <Radio value="normal">默认</Radio>
                  <Radio value="border">左边框</Radio>
                  <Radio value="background">背景色</Radio>
                  <Radio value="underline">下划线</Radio>
                  <Radio value="simple">简约</Radio>
                  <Radio value="mixed">混合风格</Radio>
                  <Radio value="decorated">装饰风格</Radio>
                  <Radio value="minimalist">简约风格</Radio>
                  <Radio value="cartoon">卡通风格</Radio>
                </RadioGroup>
              </div>
            </div>

            {/* 引用样式 */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Quote className="w-4 h-4" />
                引用样式
              </div>
              <div className="space-y-1">
                <RadioGroup
                  value={config.quoteStyle}
                  onValueChange={(value) => handleChange("quoteStyle", value)}
                  size="sm"
                >
                  <Radio value="border">边框</Radio>
                  <Radio value="background">背景色</Radio>
                  <Radio value="modern">现代</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
      <div className="border-t">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleReset}
          startContent={<RotateCcw className="w-4 h-4" />}
          className="w-full"
        >
          重置为预设值
        </Button>
      </div>
    </div>
  );
}