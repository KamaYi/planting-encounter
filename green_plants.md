**“植遇”植物识别与智能养护助手 V1.0 需求文档**

- **版本**：V1.0
- **日期**：2024 年 5 月 20 日
- **目标**：定义以纯前端实现的最小可行产品（MVP）核心需求，快速上线验证市场。


## 一、项目概述

- **项目名称**：植遇

- **项目定位**：
  面向家庭园艺新手、阳台种植爱好者的轻量化、辅助决策型工具。核心价值并非成为最全的植物百科全书，而是成为用户身边最靠谱的“养护顾问”，解决“认得出但养不活”的核心痛点。

- **核心价值**：
  - **精准识别（增强版）**：结合第三方 API 与本地纠错机制，提供比单纯通用识别更贴近园艺场景的结果（如将“印度榕”关联为“黑金刚”）。
  - **可执行的养护指导**：提供清晰、可操作、非笼统的养护步骤和提醒。
  - **零负担的智能提醒**：根据植物习性，生成个性化的浇水、施肥日历。

- **本期边界（V1.0）**：
  - **技术栈**：采用 Taro 框架开发，实现微信小程序端，并预留多端扩展能力。
  - **数据层**：采用 **Supabase** 作为后端数据库服务，将 `data_collection.json` 中的植物数据迁移至 Supabase PostgreSQL 数据库，通过 Supabase REST API 或 JavaScript SDK 进行数据查询与交互。
  - **核心目标**：跑通“识别 - 养护 - 提醒”核心闭环，验证用户对“准确性”和“养护提醒”的需求强度。


## 二、功能需求详述（V1.0）

### 1. 核心模块：植物识别与养护查询

- **功能描述**：
  用户拍照或从相册选择图片，应用调用第三方 API 识别，并展示结果与养护信息。

- **流程与规则**：
  - **图片上传**：支持拍照、相册选择，需提供图片裁剪 / 预览界面。
  - **调用第三方 API**：将图片发送至百度 AI 等植物识别 API。
    - 注意：API 密钥必须通过安全方式调用（如使用云函数），不可硬编码在前端。
  - **结果展示**：
    - 显示识别出的植物名称（取 `result` 中 `score` 最高项）。
    - 显示识别置信度（视觉化展示，如进度条）。
    - 直接展示与该植物名称绑定的本地养护知识（见下文“本地知识库”设计）。
  - **准确性反馈与本地纠正（核心差异化功能）**：
    - 在结果页提供“结果不准？”按钮。
    - 点击后，允许用户从本地植物列表中选择正确名称。
    - 用户选择后，系统在本地建立并存储一条“图片特征 / 第三方识别结果 -> 用户修正名称”的映射规则。
    - 下次遇到相同或高度相似的识别结果时，优先采用用户修正后的名称展示。

### 2. 核心模块：智能养护提醒

- **功能描述**：
  用户可将识别后的植物“认领”至“我的花园”，系统根据该植物习性，自动生成浇水、施肥提醒。

- **流程与规则**：
  - **添加至我的花园**：在识别结果页，提供“加入我的花园”按钮。
  - **编辑植物信息**：用户可自定义植物昵称、记录购买 / 种植日期。
  - **生成提醒**：
    - 从本地养护知识中，读取“浇水频率”“施肥频率”等关键周期信息。
    - 根据用户设定的起始日期，自动在本地生成未来的提醒日程。
    - 示例：知识库定义“绿萝：浇水周期 - 7 天”，用户 3 月 1 日添加，则系统自动创建 3 月 8 日、15 日… 的浇水提醒。
  - **提醒通知**：
    利用小程序订阅消息或本地通知 API，在提醒日向用户发送服务通知。

### 3. 辅助模块：我的花园与知识库

- **功能描述**：
  作为应用的“个人数据中心”，管理用户的所有植物和本地知识。

- **子功能**：
  - **我的花园**：
    以列表或卡片形式展示用户添加的所有植物，展示植物照片、昵称、下次浇水 / 施肥时间。可点击进入详情页查看完整养护指南或删除植物。
  - **植物知识库（Supabase 数据库）**：
    - **数据源**：`data_collection.json` 文件中的数据已迁移至 Supabase `plants` 表。
    - **内容**：包含常见室内 / 园艺植物的精确养护数据（当前约 40+ 种，可随时扩展）。
    - **关键设计**：
      - `common_name` 字段存储植物常见名称数组，支持别名查询
      - `maintenance` 字段统一存储养护信息（light, watering, temperature 等），与前端 `MAINTENANCE_FIELD_MAP` 映射表配合使用
      - `common_issues` 字段存储常见问题及原因
    - **查询方式**：通过 Supabase SDK 或 REST API 进行查询，支持按名称、别名、学名模糊搜索。

- **数据库数据结构示例**（Supabase `plants` 表）：

```json
{
  "id": "uuid-here",
  "scientific_name": "印度榕 (Ficus elastica)",
  "common_name": ["黑金刚", "印度橡皮树"],
  "maintenance": {
    "light": "喜明亮散射光，忌暴晒，耐半阴",
    "watering": "见干见湿，冬季控水",
    "temperature": "18-30℃，冬季需 10℃ 以上",
    "humidity": "适中，干燥时可喷水增湿",
    "soil": "疏松肥沃、排水良好的营养土",
    "fertilizing": "生长季每月一次稀薄液肥"
  },
  "common_issues": [
    { "issue": "掉叶子", "cause": "温度过低、浇水过多或环境突变" },
    { "issue": "叶面无光泽", "cause": "光照不足或叶面积灰未清理" }
  ]
}
```

- **用户纠正映射**：
  - 用户纠正记录存储在 Supabase `user_corrections` 表中
  - 同时在前端本地存储中缓存一份 `correctionMap`，用于离线场景下的快速匹配
  - 纠正记录格式：`{"api_result": "印度榕", "corrected_plant_id": "uuid"}`

- **数据同步策略**：
  - 首次查询时从 Supabase 获取数据，并缓存至本地
  - 定期（如每周）检查 Supabase 数据更新，增量同步
  - 离线场景下优先使用本地缓存数据


## 三、非功能需求

- **性能**：图片上传识别流程，在良好网络下应在 3 秒内完成并展示结果。
- **兼容性**：兼容主流 Android 与 iOS 系统，适配不同屏幕尺寸。
- **用户体验**：
  - 首次使用需有清晰的任务引导，重点说明“纠正”功能的价值。
  - 识别功能需联网，但“我的花园”和已获取的养护信息应可离线查看。
  - 视觉设计清新、自然、亲和，符合园艺主题。


## 四、技术选型建议（Taro + Supabase）

### 4.1 前端技术栈

- **UI 框架**：推荐使用与 Taro 兼容性良好的 UI 库，如 Taro UI 或 NutUI，加速开发。
- **状态管理**：V1.0 功能较简单，优先使用 Taro 自带的状态管理或 Context API。若复杂度增加，可考虑 Zustand 或 Redux。
- **本地存储**：使用 `Taro.setStorageSync` 系列 API，用于缓存用户花园数据、纠正映射表等。
- **定时提醒**：利用 `Taro.createBackgroundAudioManager` 模拟后台，或依赖小程序订阅消息（需用户授权）。
- **地图选型（若未来需要）**：使用 Taro 官方地图组件或接入腾讯 / 高德地图小程序 SDK。

### 4.2 后端数据层：Supabase

- **数据库服务**：采用 **Supabase**（基于 PostgreSQL）作为后端数据库服务。
  - **优势**：
    - 提供开箱即用的 REST API 和 JavaScript SDK，无需自建后端服务
    - 支持实时订阅（Realtime），便于后续扩展实时功能
    - 内置 Row Level Security (RLS) 权限控制
    - 支持存储（Storage）服务，可用于植物图片存储
    - 免费 tier 足够 V1.0 阶段使用

- **数据迁移方案**：
  - 将 `data_collection.json` 中的植物数据导入 Supabase `plants` 表
  - 表结构设计见下文“数据库设计”章节

- **API 调用方式**：
  - 使用 `@supabase/supabase-js` SDK 在小程序中调用（需配置 Supabase 项目 URL 和 anon key）
  - 或通过 Supabase REST API 直接请求（适合简单查询场景）

- **数据查询策略**：
  - **植物百科查询**：通过 `common_name`、`scientific_name` 字段进行模糊搜索
  - **识别结果匹配**：根据第三方 API 返回的植物名称，在 Supabase 中查询对应的养护信息
  - **本地缓存**：首次查询后，将常用植物数据缓存至本地，减少网络请求

### 4.3 数据库设计（Supabase）

#### 4.3.1 核心表：`plants`（植物知识库）

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| `id` | `uuid` | 主键 | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| `scientific_name` | `text` | 学名（如 "印度榕 (Ficus elastica)"） | NOT NULL |
| `common_name` | `jsonb` | 常见名称数组（如 ["黑金刚", "印度橡皮树"]） | NOT NULL |
| `maintenance` | `jsonb` | 养护信息对象（包含 light, watering, temperature 等字段） | NOT NULL |
| `common_issues` | `jsonb` | 常见问题数组（包含 issue, cause 等字段） | |
| `created_at` | `timestamptz` | 创建时间 | DEFAULT now() |
| `updated_at` | `timestamptz` | 更新时间 | DEFAULT now() |

**索引设计**：
- 在 `common_name` 字段上创建 GIN 索引，支持 JSONB 数组查询
- 在 `scientific_name` 上创建普通索引，支持模糊搜索

**示例 SQL 建表语句**：

```sql
-- 创建 plants 表
CREATE TABLE plants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scientific_name TEXT NOT NULL,
  common_name JSONB NOT NULL,
  maintenance JSONB NOT NULL,
  common_issues JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 创建索引
CREATE INDEX idx_plants_common_name ON plants USING GIN (common_name);
CREATE INDEX idx_plants_scientific_name ON plants USING gin_trgm_ops (scientific_name);

-- 启用 pg_trgm 扩展（用于模糊搜索）
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

#### 4.3.2 辅助表：`user_corrections`（用户纠正映射表）

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| `id` | `uuid` | 主键 | PRIMARY KEY |
| `user_id` | `text` | 用户标识（小程序 openid 或临时 ID） | |
| `api_result` | `text` | 第三方 API 返回的原始识别结果 | NOT NULL |
| `corrected_plant_id` | `uuid` | 用户纠正后的植物 ID（关联 plants 表） | REFERENCES plants(id) |
| `created_at` | `timestamptz` | 创建时间 | DEFAULT now() |

**说明**：用于存储用户对识别结果的纠正记录，后续可用于优化识别准确率。

#### 4.3.3 数据迁移脚本（将 JSON 导入 Supabase）

```javascript
// scripts/migrate-to-supabase.js
// 将 data_collection.json 导入 Supabase

import { createClient } from '@supabase/supabase-js';
import plantData from '../data_collection.json';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // 使用 service_role key 以绕过 RLS
);

async function migratePlants() {
  const plants = Object.entries(plantData).map(([key, value]) => ({
    scientific_name: value.scientific_name,
    common_name: value.common_name,
    maintenance: value.maintenance,
    common_issues: value.common_issues || []
  }));

  const { data, error } = await supabase
    .from('plants')
    .insert(plants);

  if (error) {
    console.error('迁移失败:', error);
  } else {
    console.log(`成功导入 ${plants.length} 条植物数据`);
  }
}

migratePlants();
```

### 4.4 前端集成 Supabase

**安装依赖**：

```bash
npm install @supabase/supabase-js
```

**创建 Supabase 客户端**：

```typescript
// utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**查询植物数据示例**：

```typescript
// 根据名称搜索植物
async function searchPlantByName(name: string) {
  const { data, error } = await supabase
    .from('plants')
    .select('*')
    .or(`common_name.cs.{${name}},scientific_name.ilike.%${name}%`)
    .limit(10);

  if (error) {
    console.error('查询失败:', error);
    return [];
  }
  return data;
}
```


## 五、核心风险与应对

- **第三方 API 准确性风险**：
  通过“本地纠正”和“别名映射”机制缓解，这是产品差异化的起点。
- **数据同步与缓存策略**：
  - 本地存储空间有限（约 10 MB），需设定“我的花园”植物数量上限（如 50 盆）
  - 植物知识库数据存储在 Supabase，前端仅缓存常用植物数据（如最近查询的 20-30 种）
  - 网络异常时，优先使用本地缓存，保证基本功能可用
- **养护知识的权威性**：
  V1.0 的本地知识库内容必须由园艺专家审核或来自权威资料，这是建立信任的基石。可在“关于我们”中注明知识来源。
- **冷启动问题**：
  初期本地纠正映射表为空，需在 UI 上鼓励首批用户积极纠正，可设计“贡献者感谢”等轻度激励。


## 六、成功指标（KPI）

- **用户活跃指标**：次周留存率、人均每周使用识别次数。
- **核心功能渗透率**：使用“加入我的花园”功能的用户比例、使用“结果纠正”功能的用户比例。
- **用户反馈**：通过小程序反馈入口收集用户对“识别准确性”和“养护建议实用性”的直接评价。


## 七、结论

V1.0 版本完全可行。它以极低的成本（纯前端）验证了最核心的商业假设：用户是否愿意为“更精准的识别结果”和“省心的个性化养护提醒”而使用并留存下来。
后续版本的所有规划（社区、电商、自建数据库）都应基于 V1.0 验证成功后所获取的数据和用户反馈来有序推进。
