// 全局字段映射 & 工具函数（TypeScript 版）

// 养护字段的 key 类型
export type MaintenanceKey =
  | 'light'
  | 'watering'
  | 'temperature'
  | 'humidity'
  | 'soil'
  | 'fertilizing';

// 养护字段映射的单项结构
export interface MaintenanceFieldMeta {
  label: string; // 中文展示名，如“光照”
  icon?: string; // 可选的图标，如 ☀️
}

// 养护字段映射表：所有植物共享这一份
export const MAINTENANCE_FIELD_MAP: Record<MaintenanceKey, MaintenanceFieldMeta> = {
  light: { label: '光照', icon: '☀️' },
  watering: { label: '浇水', icon: '💧' },
  temperature: { label: '温度', icon: '🌡️' },
  humidity: { label: '湿度', icon: '💨' },
  soil: { label: '土壤', icon: '🪴' },
  fertilizing: { label: '施肥', icon: '🍂' }
};

// 常见问题字段映射（简单文本即可）
export const ISSUE_FIELD_MAP = {
  issue: '问题',
  cause: '可能原因',
  solution: '解决方法'
} as const;

// 单个植物的养护信息结构（与本地 JSON 保持一致）
export type MaintenanceObject = Partial<Record<MaintenanceKey, string>>;

// 用于详情页渲染的条目结构
export interface MaintenanceEntry {
  key: MaintenanceKey;
  label: string;
  icon?: string;
  value: string;
}

/**
 * 将原始 maintenance 对象转换为可直接在前端遍历渲染的数组
 * 示例：Object.keys(maintenance) 这种写法在 TS 下类型不友好，用此函数统一处理。
 */
export function buildMaintenanceEntries(
  maintenance: MaintenanceObject
): MaintenanceEntry[] {
  if (!maintenance) return [];

  const entries: MaintenanceEntry[] = [];

  (Object.keys(maintenance) as MaintenanceKey[]).forEach((key) => {
    const value = maintenance[key];
    if (!value) return;

    const meta = MAINTENANCE_FIELD_MAP[key];
    if (!meta) return;

    entries.push({
      key,
      label: meta.label,
      icon: meta.icon,
      value
    });
  });

  return entries;
}


