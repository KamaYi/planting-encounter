# 字体与排版规范

## 字体选择

### 中文字体

**优先使用系统字体栈**，确保在不同平台上的最佳显示效果：

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 
             'Helvetica Neue', Helvetica, Arial, sans-serif;
```

**字体层级**：

| 层级 | 字体大小 | 行高 | 字重 | 用途 |
|------|---------|------|------|------|
| H1 | 32px | 44px | 600 | 页面主标题 |
| H2 | 28px | 40px | 600 | 区块标题 |
| H3 | 24px | 34px | 500 | 卡片标题 |
| H4 | 20px | 28px | 500 | 小节标题 |
| Body Large | 18px | 28px | 400 | 重要正文 |
| Body | 16px | 24px | 400 | 正文内容 |
| Body Small | 14px | 20px | 400 | 次要信息 |
| Caption | 12px | 16px | 400 | 辅助文字 |

### 英文字体

用于学名、技术术语等：

```css
font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, sans-serif;
```

## 文字颜色

| 用途 | 颜色 | 色值 |
|------|------|------|
| 主要文字 | 深灰 | #212121 |
| 次要文字 | 中灰 | #616161 |
| 辅助文字 | 浅灰 | #9E9E9E |
| 占位符 | 极浅灰 | #BDBDBD |
| 链接文字 | 主绿色 | #4CAF50 |
| 强调文字 | 主绿色 | #4CAF50 |

## 排版规则

### 标题层级

```
页面标题（H1）
├── 区块标题（H2）
    ├── 卡片标题（H3）
    │   └── 小节标题（H4）
    └── 正文内容（Body）
```

### 间距规范

| 元素 | 间距值 |
|------|--------|
| 页面内边距 | 20px |
| 区块间距 | 24px |
| 卡片间距 | 16px |
| 元素间距 | 12px |
| 文字行距 | 1.5倍字体大小 |

### 对齐方式

- **左对齐**：正文、列表、表单
- **居中**：标题、按钮文字、提示信息
- **右对齐**：时间、数字、次要信息

## 文字样式示例

### 植物名称
```css
font-size: 28px;
font-weight: 600;
color: #212121;
line-height: 40px;
```

### 学名
```css
font-size: 16px;
font-weight: 400;
color: #616161;
font-style: italic;
```

### 养护要点标题
```css
font-size: 20px;
font-weight: 500;
color: #4CAF50;
line-height: 28px;
```

### 正文内容
```css
font-size: 16px;
font-weight: 400;
color: #212121;
line-height: 24px;
```

### 提示文字
```css
font-size: 14px;
font-weight: 400;
color: #9E9E9E;
line-height: 20px;
```

## 特殊文字处理

### 数字强调
```css
font-family: 'SF Pro Display', -apple-system, sans-serif;
font-weight: 600;
color: #4CAF50;
```

### 标签文字
```css
font-size: 12px;
font-weight: 500;
color: #4CAF50;
background: rgba(76, 175, 80, 0.1);
padding: 4px 8px;
border-radius: 4px;
```

### 状态文字
- **成功**：绿色 (#4CAF50)
- **警告**：橙色 (#FFB74D)
- **错误**：红色 (#E57373)
- **信息**：蓝色 (#64B5F6)

## 响应式字体

在小屏幕设备上适当缩小字体：

| 屏幕宽度 | H1 | Body | Caption |
|---------|----|----|---------|
| > 375px | 32px | 16px | 12px |
| ≤ 375px | 28px | 14px | 11px |



