# 植遇 - 高保真 HTML 原型

## 项目说明

这是"植遇"植物识别与智能养护助手的高保真 HTML 原型，使用 HTML5 + Tailwind CSS + FontAwesome + Taroify 组件库实现。

## 技术栈

- **HTML5**: 语义化标签
- **Tailwind CSS**: 实用优先的 CSS 框架
- **FontAwesome**: 图标库
- **Taroify**: 组件库（Image 组件等）
- **Unsplash/Pexels**: 真实高质量图片

## Taroify 组件集成

本项目已集成 Taroify 组件库，特别是 Image 组件，提供以下功能：

### Image 组件特性

- ✅ **懒加载** (`lazyLoad`): 使用 Intersection Observer API 实现图片懒加载
- ✅ **占位符** (`placeholder`): 图片加载中显示自定义占位符
- ✅ **失败提示** (`fallback`): 图片加载失败时显示错误提示
- ✅ **填充模式** (`mode`): 支持多种图片填充模式（aspectFill, aspectFit, scaleToFill 等）
- ✅ **形状** (`shape`): 支持圆形、圆角、方形等多种形状
- ✅ **响应式**: 自动适配不同屏幕尺寸

### 使用方法

```html
<!-- 基础用法 -->
<div data-taroify-image 
     data-src="图片URL"
     data-mode="aspectFill"
     data-shape="rounded"
     style="width: 100%; height: 200px;">
</div>

<!-- 懒加载 -->
<div data-taroify-image 
     data-src="图片URL"
     data-lazy-load="true"
     data-placeholder="加载中..."
     data-fallback="加载失败"
     style="width: 100%; height: 200px;">
</div>
```

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
├── welcome.html           # 未登录/欢迎页
├── profile.html           # 个人中心
├── taroify-theme.css      # Taroify 主题配置
├── taroify-image.js       # Taroify Image 组件实现
├── specs/                 # 设计规范文档
│   ├── color-system.md   # 色彩系统
│   ├── typography.md      # 字体与排版
│   ├── components.md      # 组件库
│   └── ...
└── README.md              # 本文件
```

## 核心功能模块

1. **植物识别** (`home.html`) - 拍照/上传图片识别植物
2. **植物详情** (`detail.html`) - 展示养护要点和常见问题
3. **我的花园** (`garden.html`) - 管理植物，智能养护提醒
4. **植物百科** (`search.html`) - 搜索植物信息
5. **识别结果** (`result.html`) - 显示识别结果和置信度
6. **结果纠正** (`correct.html`) - 手动纠正识别结果
7. **未登录页** (`welcome.html`) - 欢迎页面和登录入口
8. **个人中心** (`profile.html`) - 用户信息和设置

## 设计特点

- **绿色系配色**：主色 #4CAF50，营造自然清新的视觉体验
- **Taroify 组件**：使用 Taroify Image 组件，支持懒加载、占位符、失败提示
- **移动端优化**：适配小程序和移动端
- **真实图片**：使用 Unsplash/Pexels 高质量植物图片
- **智能提醒**：我的花园模块展示浇水、施肥提醒功能
- **主题系统**：完整的 Taroify 主题配置，符合设计规范

## 主题配置

主题配置文件 `taroify-theme.css` 包含：

- **主色调**：绿色系（#4CAF50）
- **中性色**：文字、背景、边框颜色
- **组件变量**：Image 组件占位符、失败提示样式
- **圆角系统**：统一的圆角规范
- **间距系统**：统一的间距规范
- **字体系统**：统一的字体大小规范

## 使用方法

1. 打开 `index.html` 查看所有界面的预览
2. 或直接打开各个独立的 HTML 文件查看具体页面
3. 所有页面支持响应式，可在不同设备上查看
4. Image 组件自动初始化，无需手动调用

## 设计规范

详细设计规范请参考 `specs/` 目录：
- `color-system.md` - 色彩系统
- `typography.md` - 字体与排版
- `components.md` - 组件库
- `pages.md` - 页面设计
- `icons.md` - 图标系统
- `interactions.md` - 交互设计

## Taroify 组件参考

- [Taroify Image 组件文档](https://taroify.github.io/taroify.com/components/image/)
- [Taroify 官方文档](https://taroify.github.io/taroify.com/)
