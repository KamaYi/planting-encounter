/**
 * Taroify Image 组件模拟实现
 * 用于 HTML 原型中模拟 Taroify Image 组件的行为
 */

class TaroifyImage {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      src: options.src || element.dataset.src || element.getAttribute('src'),
      mode: options.mode || element.dataset.mode || 'aspectFill',
      shape: options.shape || element.dataset.shape || 'square',
      lazyLoad: options.lazyLoad !== undefined ? options.lazyLoad : element.dataset.lazyLoad === 'true',
      placeholder: options.placeholder || element.dataset.placeholder,
      fallback: options.fallback || element.dataset.fallback,
      width: options.width || element.dataset.width,
      height: options.height || element.dataset.height,
      alt: options.alt || element.getAttribute('alt') || '',
    };

    this.img = null;
    this.placeholderEl = null;
    this.fallbackEl = null;
    this.isLoaded = false;
    this.hasError = false;

    this.init();
  }

  init() {
    // 设置容器样式
    this.element.classList.add('taroify-image');
    
    // 设置形状
    if (this.options.shape === 'round') {
      this.element.classList.add('taroify-image--round');
    } else if (this.options.shape === 'rounded') {
      this.element.classList.add('taroify-image--rounded');
    } else {
      this.element.classList.add('taroify-image--square');
    }

    // 设置尺寸
    if (this.options.width) {
      this.element.style.width = typeof this.options.width === 'number' 
        ? `${this.options.width}px` 
        : this.options.width;
    }
    if (this.options.height) {
      this.element.style.height = typeof this.options.height === 'number' 
        ? `${this.options.height}px` 
        : this.options.height;
    }

    // 创建图片元素
    this.createImage();

    // 懒加载处理
    if (this.options.lazyLoad) {
      this.setupLazyLoad();
    } else {
      this.loadImage();
    }
  }

  createImage() {
    this.img = document.createElement('img');
    this.img.className = 'taroify-image__img';
    this.img.alt = this.options.alt;
    
    // 设置填充模式
    if (this.options.mode) {
      this.img.classList.add(`taroify-image--${this.options.mode}`);
    }

    this.element.appendChild(this.img);

    // 绑定事件
    this.img.addEventListener('load', () => this.onLoad());
    this.img.addEventListener('error', () => this.onError());
  }

  setupLazyLoad() {
    this.element.classList.add('taroify-image--lazy');
    
    // 显示占位符
    if (this.options.placeholder) {
      this.showPlaceholder();
    }

    // 使用 Intersection Observer 实现懒加载
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            observer.unobserve(this.element);
          }
        });
      }, {
        rootMargin: '50px'
      });

      observer.observe(this.element);
    } else {
      // 降级方案：直接加载
      this.loadImage();
    }
  }

  loadImage() {
    if (this.options.src && !this.isLoaded && !this.hasError) {
      this.img.src = this.options.src;
    }
  }

  showPlaceholder() {
    if (this.placeholderEl) return;

    this.placeholderEl = document.createElement('div');
    this.placeholderEl.className = 'taroify-image__placeholder';

    if (typeof this.options.placeholder === 'string') {
      // 文本占位符
      this.placeholderEl.innerHTML = `
        <div class="taroify-image__placeholder-icon">
          <i class="fas fa-image"></i>
        </div>
        <div class="taroify-image__placeholder-text">${this.options.placeholder}</div>
      `;
    } else if (this.options.placeholder) {
      // HTML 元素占位符
      this.placeholderEl.appendChild(this.options.placeholder);
    } else {
      // 默认占位符
      this.placeholderEl.innerHTML = `
        <div class="taroify-image__placeholder-icon taroify-image__loading">
          <i class="fas fa-spinner"></i>
        </div>
      `;
    }

    this.element.appendChild(this.placeholderEl);
  }

  showFallback() {
    if (this.fallbackEl) return;

    this.fallbackEl = document.createElement('div');
    this.fallbackEl.className = 'taroify-image__fallback';

    if (typeof this.options.fallback === 'string') {
      // 文本失败提示
      this.fallbackEl.innerHTML = `
        <div class="taroify-image__fallback-icon">
          <i class="fas fa-image"></i>
        </div>
        <div class="taroify-image__fallback-text">${this.options.fallback}</div>
      `;
    } else if (this.options.fallback) {
      // HTML 元素失败提示
      this.fallbackEl.appendChild(this.options.fallback);
    } else {
      // 默认失败提示
      this.fallbackEl.innerHTML = `
        <div class="taroify-image__fallback-icon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <div class="taroify-image__fallback-text">加载失败</div>
      `;
    }

    this.element.appendChild(this.fallbackEl);
  }

  onLoad() {
    this.isLoaded = true;
    this.element.classList.add('taroify-image--lazy-loaded');
    
    // 移除占位符
    if (this.placeholderEl) {
      this.placeholderEl.remove();
      this.placeholderEl = null;
    }

    // 触发自定义事件
    this.element.dispatchEvent(new CustomEvent('taroify-image-load', {
      detail: { image: this.img }
    }));
  }

  onError() {
    this.hasError = true;
    
    // 移除占位符
    if (this.placeholderEl) {
      this.placeholderEl.remove();
      this.placeholderEl = null;
    }

    // 显示失败提示
    this.showFallback();

    // 触发自定义事件
    this.element.dispatchEvent(new CustomEvent('taroify-image-error', {
      detail: { image: this.img }
    }));
  }
}

// 自动初始化所有带有 data-taroify-image 属性的元素
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('[data-taroify-image]');
  images.forEach(el => {
    new TaroifyImage(el);
  });
});

// 导出供手动使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TaroifyImage;
}


