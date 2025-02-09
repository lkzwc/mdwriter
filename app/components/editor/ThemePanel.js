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
                <SelectItem key="light" value="light">Light</SelectItem>
                <SelectItem key="dark" value="dark">Dark</SelectItem>
                <SelectItem key="sepia" value="sepia">Sepia</SelectItem>
                <SelectItem key="wechat" value="wechat">微信风格</SelectItem>
                <SelectItem key="elegant" value="elegant">优雅</SelectItem>
                <SelectItem key="modern" value="modern">现代</SelectItem>
                <SelectItem key="minimal" value="minimal">简约</SelectItem>
              </Select>
            </div>
            
            <Tabs
              aria-label="主题设置"
              selectedKey={activeTab}
              onSelectionChange={setActiveTab}
              className="w-full"
            >
              <Tab key="basic" title="基础">
                <div className="space-y-4 pt-2">
                  <div>
                    <Select
                      label="正文字体"
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
                    <div className="text-sm mb-2">字体大小</div>
                    <Slider
                      size="sm"
                      step={1}
                      maxValue={20}
                      minValue={12}
                      value={config.fontSize}
                      onChange={(value) => handleChange("fontSize", value)}
                    />
                  </div>
                  <div>
                    <div className="text-sm mb-2">行高</div>
                    <Slider
                      size="sm"
                      step={0.1}
                      maxValue={2.5}
                      minValue={1.2}
                      value={config.lineHeight}
                      onChange={(value) => handleChange("lineHeight", value)}
                    />
                  </div>
                  <div>
                    <div className="text-sm mb-2">段落间距</div>
                    <Slider
                      size="sm"
                      step={0.1}
                      maxValue={2.5}
                      minValue={1}
                      value={config.paragraphSpacing}
                      onChange={(value) => handleChange("paragraphSpacing", value)}
                    />
                  </div>
                </div>
              </Tab>
              <Tab key="heading" title="标题">
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="text-sm mb-2">标题样式</div>
                    <RadioGroup
                      value={config.headingStyle}
                      onValueChange={(value) => handleChange("headingStyle", value)}
                    >
                      <Radio value="normal">默认</Radio>
                      <Radio value="border">左边框</Radio>
                      <Radio value="background">背景色</Radio>
                      <Radio value="underline">下划线</Radio>
                      <Radio value="simple">简约</Radio>
                      <Radio value="mixed">混合风格</Radio>
                    </RadioGroup>
                  </div>
                </div>
              </Tab>
              <Tab key="color" title="颜色">
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-sm">正文颜色</label>
                    <input
                      type="color"
                      value={config.colors.text}
                      onChange={(e) => handleChange("colors.text", e.target.value)}
                      className="block w-full h-8 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm">标题颜色</label>
                    <input
                      type="color"
                      value={config.colors.heading}
                      onChange={(e) => handleChange("colors.heading", e.target.value)}
                      className="block w-full h-8 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm">链接颜色</label>
                    <input
                      type="color"
                      value={config.colors.link}
                      onChange={(e) => handleChange("colors.link", e.target.value)}
                      className="block w-full h-8 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm">引用颜色</label>
                    <input
                      type="color"
                      value={config.colors.quote}
                      onChange={(e) => handleChange("colors.quote", e.target.value)}
                      className="block w-full h-8 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm">边框颜色</label>
                    <input
                      type="color"
                      value={config.colors.border}
                      onChange={(e) => handleChange("colors.border", e.target.value)}
                      className="block w-full h-8 mt-1"
                    />
                  </div>
                </div>
              </Tab>
            </Tabs>

            <div>
              <Select
                label="引用样式"
                selectedKey={config.quoteStyle}
                onSelectionChange={(key) => handleChange("quoteStyle", key)}
                size="sm"
                startContent={<Quote className="w-4 h-4" />}
              >
                <SelectItem key="border" value="border">左边框</SelectItem>
                <SelectItem key="background" value="background">背景色</SelectItem>
                <SelectItem key="modern" value="modern">现代</SelectItem>
              </Select>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              startContent={<RotateCcw className="w-4 h-4" />}
            >
              重置为预设值
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}