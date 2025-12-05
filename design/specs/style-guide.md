# 完整样式指南

## 快速参考

### 颜色速查

```css
/* 主色 */
--primary: #4CAF50;
--primary-light: #66BB6A;
--primary-dark: #388E3C;

/* 背景 */
--bg-page: #F5F5F5;
--bg-card: #FFFFFF;
--bg-input: #FFFFFF;

/* 文字 */
--text-primary: #212121;
--text-secondary: #616161;
--text-hint: #9E9E9E;

/* 边框 */
--border-light: #E0E0E0;
--border-medium: #BDBDBD;
```

### 间距速查

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-xxl: 24px;
```

### 圆角速查

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
```

## CSS 变量定义

```css
:root {
  /* 颜色系统 */
  --color-primary: #4CAF50;
  --color-primary-light: #66BB6A;
  --color-primary-dark: #388E3C;
  --color-success: #4CAF50;
  --color-warning: #FFB74D;
  --color-error: #E57373;
  --color-info: #64B5F6;
  
  --color-bg-page: #F5F5F5;
  --color-bg-card: #FFFFFF;
  --color-bg-input: #FFFFFF;
  
  --color-text-primary: #212121;
  --color-text-secondary: #616161;
  --color-text-hint: #9E9E9E;
  --color-text-disabled: #BDBDBD;
  
  --color-border-light: #E0E0E0;
  --color-border-medium: #BDBDBD;
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-xxl: 24px;
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* 阴影 */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);
  --shadow-primary: 0 2px 8px rgba(76, 175, 80, 0.3);
  
  /* 字体 */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 
                 'Helvetica Neue', Helvetica, Arial, sans-serif;
  
  /* 字号 */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-xxl: 24px;
  --font-size-title: 28px;
  --font-size-h1: 32px;
  
  /* 行高 */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* 动画 */
  --transition-fast: 0.1s;
  --transition-normal: 0.3s;
  --transition-slow: 0.5s;
  
  --easing-default: cubic-bezier(0.4, 0.0, 0.2, 1);
  --easing-in: cubic-bezier(0.4, 0.0, 1, 1);
  --easing-out: cubic-bezier(0.0, 0.0, 0.2, 1);
}
```

## 常用样式类

### 按钮样式

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 44px;
}

.btn-primary {
  background: var(--color-primary);
  color: #FFFFFF;
  box-shadow: var(--shadow-primary);
}

.btn-primary:active {
  background: var(--color-primary-dark);
  transform: scale(0.95);
}

.btn-secondary {
  background: var(--color-bg-card);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
```

### 卡片样式

```css
.card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
}
```

### 输入框样式

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  background: var(--color-bg-input);
  transition: border-color var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
}
```

## 响应式设计

### 断点定义

```css
/* 小屏手机 */
@media (max-width: 375px) {
  --font-size-h1: 28px;
  --font-size-md: 14px;
  --spacing-xl: 16px;
}

/* 大屏手机 */
@media (min-width: 376px) {
  --font-size-h1: 32px;
  --font-size-md: 16px;
  --spacing-xl: 20px;
}
```

## 设计检查清单

### 视觉检查

- [ ] 颜色使用符合规范
- [ ] 字体大小和行高合适
- [ ] 间距统一规范
- [ ] 圆角使用一致
- [ ] 阴影效果自然

### 交互检查

- [ ] 按钮有明确的点击反馈
- [ ] 加载状态清晰可见
- [ ] 错误提示友好明确
- [ ] 动画流畅不卡顿
- [ ] 触摸区域足够大（≥44px）

### 内容检查

- [ ] 文字清晰易读
- [ ] 图标含义明确
- [ ] 空状态有引导
- [ ] 错误提示有帮助性

## 设计资源

### 设计工具

- **Figma** - 推荐用于 UI 设计
- **Sketch** - 备选方案
- **Adobe XD** - 备选方案

### 资源文件

- 设计稿源文件（.fig / .sketch）
- 图标文件（SVG）
- 图片资源（植物图片库）

## 更新日志

### v1.0 (2024-01-XX)

- 初始设计规范制定
- 完成色彩系统定义
- 完成组件库设计
- 完成页面设计稿



