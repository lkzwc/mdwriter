'use client'

import { Type, Maximize2, Settings, Palette } from 'lucide-react'
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Drawer,
  DrawerHeader,
  DrawerBody,
} from '@heroui/react'

export function ThemePanel({ theme, onThemeChange, config, onConfigChange }) {
  const handleColorChange = (colorType, value) => {
    onConfigChange({ ...config, [colorType]: value });
  };

  return (
    <>
      <DrawerHeader className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-primary" />
          <span className="text-lg font-semibold">Markdown 样式配置</span>
        </div>
      </DrawerHeader>
      <DrawerBody className="p-6">
        <div className="space-y-6">
          {/* 主题选择 */}
          <Card>
            <CardHeader>
                预设主题
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-2">
                {['典雅', '现代', '杂志', '创意', '商务'].map((themeName) => (
                  <Button
                    key={themeName}
                    variant={theme === themeName ? 'primary' : 'outline'}
                    onClick={() => onThemeChange(themeName)}
                  >
                    {themeName}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* 字体设置 */}
          <Card>
            <CardHeader>
                字体设置
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <Select
                    label="字体"
                    placeholder="请选择字体"
                    selectedKey={config.fontFamily}
                    onSelectionChange={(key) => onConfigChange({ ...config, fontFamily: key })}
                  >
                    <SelectItem key="system-ui">系统默认</SelectItem>
                    <SelectItem key="serif">宋体</SelectItem>
                    <SelectItem key="sans-serif">黑体</SelectItem>
                  </Select>
                </div>
                <div>
                  <label className="label">字号 ({config.fontSize}px)</label>
                  <Slider
                    min={12}
                    max={20}
                    value={config.fontSize}
                    onChange={(value) => onConfigChange({ ...config, fontSize: value })}
                  />
                </div>
                <div>
                  <label className="label">行高 ({config.lineHeight})</label>
                  <Slider
                    min={1.4}
                    max={2.2}
                    step={0.1}
                    value={config.lineHeight}
                    onChange={(value) => onConfigChange({ ...config, lineHeight: value })}
                  />
                </div>
                <div>
                  <label className="label">字体颜色</label>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* 背景与链接颜色设置 */}
          <Card>
            <CardHeader>
                颜色设置
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <label className="label">背景颜色</label>
                  {/* <ColorPicker value={config.backgroundColor} onChange={(value) => handleColorChange('backgroundColor', value)} /> */}
                </div>
                <div>
                  <label className="label">链接颜色</label>
                  {/* <ColorPicker value={config.linkColor} onChange={(value) => handleColorChange('linkColor', value)} /> */}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* 间距设置 */}
          <Card>
            <CardHeader>
                间距设置
            </CardHeader>
            <CardBody>
              <ButtonGroup>
                {['紧凑', '适中', '宽松'].map((spacing) => (
                  <Button
                    key={spacing}
                    variant={config.spacing === spacing ? 'primary' : 'outline'}
                    onClick={() => onConfigChange({ ...config, spacing: spacing })}
                  >
                    {spacing}
                  </Button>
                ))}
              </ButtonGroup>
            </CardBody>
          </Card>
        </div>
      </DrawerBody>
    </>
  )
}