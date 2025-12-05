# 植遇 - 高保真 HTML 原型

## 项目说明

这是"植遇"植物识别与智能养护助手的高保真 HTML 原型，使用 HTML5 + Tailwind CSS + FontAwesome 实现。

## 技术栈

- **HTML5**: 语义化标签
- **Tailwind CSS**: 实用优先的 CSS 框架
- **FontAwesome**: 图标库
- **Unsplash/Pexels**: 真实高质量图片

## 文件结构

```
design/
├── index.html              # 主入口页面（所有界面预览）
├── home.html              # 首页 - 植物识别
├── detail.html            # 植物详情页
├── garden.html            # 我的花园（含智能养护提醒）
├── search.html            # 植物百科搜索页
├── result.html            # 识别结果页
├── correct.html           # 纠正识别结果页
├── assets/                # 资源文件夹
│   ├── images/           # 图片资源
│   └── styles/           # 额外样式文件
└── README.md              # 本文件
```

## 核心功能模块

1. **植物识别** (`home.html`) - 拍照/上传图片识别植物
2. **植物详情** (`detail.html`) - 展示养护要点和常见问题
3. **我的花园** (`garden.html`) - 管理植物，智能养护提醒
4. **植物百科** (`search.html`) - 搜索植物信息
5. **识别结果** (`result.html`) - 显示识别结果和置信度
6. **结果纠正** (`correct.html`) - 手动纠正识别结果

## 设计特点

- **绿色系配色**：主色 #4CAF50，营造自然清新的视觉体验
- **暗黑主题优先**：支持暗黑模式
- **移动端优化**：适配小程序和移动端
- **真实图片**：使用 Unsplash/Pexels 高质量植物图片
- **智能提醒**：我的花园模块展示浇水、施肥提醒功能

## 使用方法

1. 打开 `index.html` 查看所有界面的预览
2. 或直接打开各个独立的 HTML 文件查看具体页面
3. 所有页面支持响应式，可在不同设备上查看

## 设计规范

详细设计规范请参考：
- `color-system.md` - 色彩系统
- `typography.md` - 字体与排版
- `components.md` - 组件库
- `pages.md` - 页面设计
- `icons.md` - 图标系统
- `interactions.md` - 交互设计
