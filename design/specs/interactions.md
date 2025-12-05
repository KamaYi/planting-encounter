# 交互设计规范

## 交互动效

### 页面转场

#### 进入动画
```css
/* 从右侧滑入 */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
duration: 300ms
easing: cubic-bezier(0.4, 0.0, 0.2, 1)
```

#### 退出动画
```css
/* 向左侧滑出 */
@keyframes slideOutLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}
duration: 250ms
```

### 元素动画

#### 卡片点击反馈
```css
.card:active {
  transform: scale(0.98);
  transition: transform 0.1s;
}
```

#### 按钮点击反馈
```css
.button:active {
  transform: scale(0.95);
  background-color: #388E3C; /* 深绿色 */
  transition: all 0.1s;
}
```

#### 列表项进入
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.list-item {
  animation: fadeInUp 0.3s ease-out;
  animation-fill-mode: both;
}

/* 延迟显示 */
.list-item:nth-child(1) { animation-delay: 0.1s; }
.list-item:nth-child(2) { animation-delay: 0.2s; }
.list-item:nth-child(3) { animation-delay: 0.3s; }
```

## 加载状态

### 识别加载

```
[旋转的叶子图标] 识别中...

动画：
- 图标旋转：1s linear infinite
- 文字闪烁：opacity 0.5-1, 1s ease-in-out infinite
```

### 数据加载

```
骨架屏：
┌─────────────────────────────┐
│  [灰色矩形 - 图片]          │
│  [灰色矩形 - 标题]          │
│  [灰色矩形 - 内容]          │
└─────────────────────────────┘

动画：shimmer 效果
```

### 下拉刷新

```
下拉时显示：
[旋转图标] 正在刷新...

松手后：
[✓] 刷新成功
```

## 反馈机制

### 操作反馈

| 操作 | 反馈方式 | 持续时间 |
|------|---------|---------|
| 点击按钮 | 颜色变化 + 轻微缩放 | 100ms |
| 长按 | 震动反馈（移动端） | - |
| 滑动 | 跟随手指移动 | - |
| 成功操作 | Toast 提示 | 2s |
| 错误操作 | Toast 提示 + 图标 | 3s |

### Toast 提示

```
位置：底部居中
动画：从下往上滑入，淡出
样式：
- 背景：rgba(0, 0, 0, 0.8)
- 文字：白色
- 圆角：8px
- 内边距：12px 20px
```

### 确认对话框

```
触发：删除、重要操作
动画：缩放进入 (scale 0.9 → 1.0)
遮罩：半透明黑色背景
```

## 手势交互

### 滑动操作

- **左滑删除**：列表项左滑显示删除按钮
- **下拉刷新**：页面顶部下拉刷新数据
- **上拉加载**：列表底部上拉加载更多

### 长按操作

- **长按卡片**：显示操作菜单（编辑、删除）
- **长按图片**：保存图片或查看大图

## 状态管理

### 按钮状态

```
默认 → 悬停 → 按下 → 加载 → 完成/禁用

状态变化：
- 颜色渐变
- 图标变化（加载时显示 spinner）
- 文字变化（"识别中..."）
```

### 输入框状态

```
默认 → 聚焦 → 输入中 → 验证 → 成功/错误

状态指示：
- 边框颜色变化
- 右侧图标显示（✓ 或 ✕）
- 错误提示文字
```

## 微交互

### 识别进度

```
进度条动画：
- 从 0% 平滑增长到实际值
- 使用 ease-out 缓动
- 显示百分比文字
```

### 添加成功

```
动画序列：
1. 按钮文字变为 "✓ 已添加"
2. 轻微弹跳效果 (scale 1.0 → 1.1 → 1.0)
3. 0.5s 后恢复原状
```

### 删除确认

```
动画序列：
1. 卡片向左滑出
2. 其他卡片向上补位
3. 显示 Toast "已删除"
```

## 性能优化

### 动画性能

- 使用 `transform` 和 `opacity` 进行动画（GPU 加速）
- 避免动画 `width`、`height`、`margin` 等属性
- 限制同时进行的动画数量

### 交互响应

- 点击反馈延迟 < 100ms
- 页面转场时间 250-300ms
- 加载状态立即显示（< 50ms）

## 无障碍设计

### 可访问性

- 所有交互元素最小触摸区域：44x44px
- 提供文字标签和提示
- 支持键盘导航
- 颜色对比度符合 WCAG AA 标准

### 错误处理

- 网络错误：友好提示 + 重试按钮
- 识别失败：提供手动选择选项
- 数据为空：显示空状态和引导



