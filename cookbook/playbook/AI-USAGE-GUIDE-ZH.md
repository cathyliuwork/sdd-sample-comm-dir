# AI Coding Tool 使用指南

**如何指导 AI 根据 SDD 模版开发 Specs**

---

## 🎯 快速开始：3 步生成完整 Specs

### Step 1: 准备项目信息

在开始之前，准备好以下信息：

```markdown
项目名称：[你的项目名]
项目描述：[1-2 句话概括产品的核心价值]
问题：[可选 - 这个产品要解决什么问题？]
解决方案：[可选 - 如何解决这个问题？]
目标用户：[谁会使用这个产品]
使用场景：[可选 - 用户在何时、何地、多久使用一次产品]
核心功能：[列出 5-10 个 MVP 功能]
关键业务逻辑：[可选 - 预定义的工作流程、业务规则或经过测试的 AI 提示词，在设计阶段应优先参考]
UI 产品形态：[可选 - Web 应用、移动应用、响应式网页、命令行、数据管道、桌面应用、浏览器插件、其他。默认：未指定时为响应式网页]
UI 设计：[可选 - 文字描述、参考设计（其他应用截图）、或专业设计稿（Figma/Sketch）]
技术栈：
  - 前端：[框架 + 版本]
  - 后端：[框架 + 版本]
  - 数据库：[类型 + 版本]
  - LLM：[可选 - OpenRouter（默认）| Claude API | OpenAI API | 无]
  - 提示：如不确定技术栈，可以说"使用默认方案"，AI 会建议经过验证的技术组合
部署：[可选 - 平台名称 + 可选文档链接；如未指定，AI 会根据技术栈建议]
```

**示例**：
```markdown
项目名称：BookClub - 在线读书会
项目描述：为读书爱好者提供一个集创建读书会、分享笔记、讨论书籍于一体的在线社区平台。
问题：读书爱好者难以找到志同道合的读书社群，讨论散落在微信群和各种工具中
解决方案：统一的平台，整合读书会创建、笔记分享和社区讨论功能
目标用户：读书爱好者，读书会组织者，企业读书俱乐部管理员
使用场景：
  - 桌面端：晚上 30-60 分钟专注阅读和讨论
  - 移动端：通勤时 5-10 分钟快速查看更新和回复讨论
核心功能：
  - 创建和加入读书会
  - 发布带 Markdown 支持的读书笔记
  - 按章节组织的讨论区
  - 阅读进度追踪和打卡
  - 个性化书籍推荐
关键业务逻辑：用户可以设置阅读节奏（例如每周 1 章），系统根据书籍长度和进度自动生成里程碑提醒
UI 产品形态：响应式 Web 应用（桌面 + 手机）
UI 设计：现代简洁设计，参考 Linear.app（极简风格）和 Notion（排版）。需要高对比度便于屏幕长时间阅读
技术栈：
  - 前端：Next.js 14, React 18, Tailwind CSS
  - 后端：Next.js API Routes, Prisma ORM
  - 数据库：PostgreSQL (via Supabase)
  - LLM：OpenRouter（用于基于阅读历史的 AI 书籍推荐）
部署：Vercel + Supabase Cloud
```

---

### Step 2: 复制完整 Prompt

打开 [SDD-TEMPLATE-PROMPT.md](./SDD-TEMPLATE-PROMPT.md)，**复制全部内容**（约 12,000 字）。

---

### Step 3: 给 AI 下达指令

打开你的 AI 编程工具（Claude、Cursor、Windsurf、GPT 等），粘贴以下完整 prompt：

```markdown
[粘贴 SDD-TEMPLATE-PROMPT.md 的完整内容]

---

现在，请使用上面的 SDD 模版系统，为我的项目生成完整的 specification 文档。

## 我的项目信息

项目名称：BookClub - 在线读书会

项目描述：为读书爱好者提供集创建读书会、分享笔记、讨论书籍于一体的在线社区平台。

问题：读书爱好者难以找到志同道合的读书社群，讨论散落在微信群、Google Docs 和各种工具中

解决方案：统一平台，整合读书会创建、Markdown 笔记、按章节讨论等功能

目标用户：
- 读书爱好者（个人）
- 读书会组织者（小组长）
- 企业读书俱乐部管理员

使用场景：
- 桌面端：晚间阅读时段（30-60 分钟），深度讨论和笔记
- 移动端：早晚通勤（5-10 分钟），快速查看更新、标记进度、简短回复
- 使用频率：活跃读者每天使用，普通成员每周 2-3 次

核心功能（MVP）：
1. 用户注册和登录（邮箱 + 密码）
2. 创建读书会（设置书籍、开始/结束日期、阅读计划）
3. 加入读书会（公开/私密读书会）
4. 发布读书笔记（支持 Markdown）
5. 讨论区（按章节分组）
6. 阅读进度追踪（打卡签到）
7. 个人主页（我的笔记、我的读书会）
8. 推荐书单（基于兴趣标签）

关键业务逻辑：
- 阅读节奏算法：根据总章节数、开始日期、结束日期自动计算章节截止时间
- 提醒系统：如用户未标记进度，在章节截止日期前 1 天发送通知
- 书籍推荐引擎：使用 OpenRouter 分析用户已完成书籍并推荐相似书名

UI 产品形态：响应式 Web 应用（桌面浏览器日常使用 8+ 小时，手机快速浏览）

UI 设计：现代简洁设计，参考 Linear（极简风格）和 Notion（排版舒适）。需高对比度便于长时间屏幕阅读

技术栈：
  - 前端：Next.js 14, React 18, Tailwind CSS
  - 后端：Next.js API Routes, Prisma ORM
  - 数据库：PostgreSQL (via Supabase)
  - 认证：Supabase Auth
  - LLM：OpenRouter（用于 AI 书籍推荐）

部署：Vercel + Supabase Cloud

## 请按照以下步骤执行

**Phase 1-4: 规划阶段**
1. 分析我的项目，完成 Phase 1-4（需求理解 → 系统设计 → 功能分解 → 依赖图）
2. 输出给我查看：
   - 项目分析结果
   - System Modules 列表（S-XX 文件）
   - Features 列表（F-XX 文件）
   - 依赖关系图（Mermaid）
   - 实现波次（Implementation Waves）

**等待我确认后，再进行 Phase 5**

我会告诉你："确认，请继续 Phase 5"

**Phase 5: 文件生成**
3. 生成所有 spec 文件：
   - README.md（根目录）
   - specs/README.md（导航文件）
   - specs/system/S-00-architecture.md
   - specs/system/S-01-*.md（所有系统模块）
   - specs/features/F-01-*.md（所有功能）
   - specs/features/TEMPLATE.md

4. 每个文件都要完整，包含所有必需章节

## 重要要求

- 使用 SDD 模版的完整结构
- 所有依赖关系必须正确
- 生成 Mermaid 依赖图
- 每个 Feature 必须包含：Dependencies, PRD, Technical Implementation, Tests, Notes
- 每个 System Module 必须包含：Dependencies, Architecture, Technical Implementation

现在开始 Phase 1，请分析我的项目。
```

---

## 📝 AI 会如何响应

### Phase 1-4: AI 会输出规划

AI 会分析你的项目，然后输出类似这样的内容：

```markdown
## Phase 1: 项目分析完成

**项目名称**: BookClub
**功能识别**: 8 个核心功能
**系统模块**: 5 个模块

## Phase 2: 系统设计规划

**System Modules (S-XX)**:
- S-00: 系统架构总览
- S-01: 数据库 Schema（PostgreSQL + Prisma）
- S-02: 认证系统（Supabase Auth）
- S-03: Markdown 编辑器集成
- S-04: 测试策略

## Phase 3: 功能分解

| ID | 功能名称 | 优先级 | 依赖 |
|----|---------|--------|------|
| F-01 | 数据库 & 认证 | CRITICAL | 无 |
| F-02 | 用户个人资料 | HIGH | F-01 |
| F-03 | 读书会 CRUD | CRITICAL | F-01, F-02 |
| F-04 | 加入/退出读书会 | HIGH | F-01, F-03 |
| F-05 | 读书笔记 CRUD | CRITICAL | F-01, F-03 |
| F-06 | 讨论区 | HIGH | F-01, F-03 |
| F-07 | 阅读进度追踪 | MEDIUM | F-01, F-03 |
| F-08 | 推荐书单 | LOW | F-01, F-03 |

## Phase 4: 依赖图 + 实现波次

[Mermaid 依赖图]

**Implementation Waves**:
- Wave 1: F-01
- Wave 2: F-02, F-03
- Wave 3: F-04, F-05, F-06
- Wave 4: F-07, F-08

请确认这个规划是否符合你的需求？确认后我将生成所有 spec 文件。
```

---

### 你的响应：确认或修改

**选项 A: 直接确认**
```
看起来不错！请继续 Phase 5，生成所有 spec 文件。
```

**选项 B: 提出修改**
```
基本可以，但我有几点修改：

1. F-06 讨论区应该是 CRITICAL 优先级，这是核心功能
2. 请添加一个新功能：F-09 书籍搜索（集成豆瓣 API）
3. S-03 Markdown 编辑器可以省略，这是实现细节，不需要单独的系统模块

请更新规划后，再生成文件。
```

**选项 C: 大幅调整**
```
依赖关系有问题：

- F-05（读书笔记）应该依赖 F-03（读书会），因为笔记必须关联到读书会
- F-06（讨论区）也应该依赖 F-03

请修正依赖关系，重新生成依赖图和实现波次。
```

---

### Phase 5: AI 生成所有文件

确认后，AI 会逐个生成文件：

```markdown
## 正在生成文件...

### 1. README.md（根目录）
[完整内容]

### 2. specs/README.md
[完整内容，包含 Feature Index 表格 + Mermaid 依赖图]

### 3. specs/system/S-00-architecture.md
[系统架构总览，包含技术栈、设计原则、Mermaid 架构图]

### 4. specs/system/S-01-database-schema.md
[完整的 Prisma schema + 索引 + 说明]

### 5. specs/system/S-02-authentication.md
[Supabase Auth 集成方案]

... （继续生成所有文件）

### 最后：specs/features/TEMPLATE.md
[可复用的功能模版]

---

✅ 所有文件生成完成！

请检查生成的 specs，如有需要修改的地方，随时告诉我。
```

---

## 🔧 常见调整场景

### 场景 1: 添加新功能

**你的指令**：
```
请添加一个新功能：

F-10: 成就系统
- 用户完成阅读目标后获得徽章
- 显示在个人主页
- 依赖：F-01, F-07（阅读进度追踪）
- 优先级：LOW（V2.0）

请更新 specs/README.md 的 Feature Index，添加 F-10 到依赖图，
并生成 specs/features/F-10-achievements.md 文件。
```

---

### 场景 2: 修改某个功能的 PRD

**你的指令**：
```
我需要修改 F-05（读书笔记）的 PRD 部分：

原本的用户流程：
1. 用户点击"写笔记"
2. 填写标题和内容
3. 保存

修改为：
1. 用户在读书会页面点击"写笔记"
2. 自动关联当前读书会和书籍
3. 选择章节（从下拉菜单）
4. 填写标题和内容（支持 Markdown）
5. 可选：公开/私密
6. 保存

请更新 specs/features/F-05-reading-notes.md 的 PRD 部分，
同时更新 Technical Implementation 部分的 API 接口（需要增加 chapter_id 和 is_public 字段）。
```

---

### 场景 3: 细化 Technical Implementation

**你的指令**：
```
specs/features/F-03-book-club-crud.md 的 Technical Implementation 部分太简略了。

请扩充以下内容：

1. **API Endpoints**：
   - 补充完整的 TypeScript 类型定义（Request/Response）
   - 添加所有错误码（400, 401, 403, 404, 500）
   - 添加分页参数（GET /api/book-clubs?page=1&limit=20）

2. **Database Schema**：
   - 添加完整的 Prisma schema
   - 添加索引优化（book_clubs 表需要 owner_id + created_at 索引）
   - 添加外键约束

3. **Frontend Components**：
   - 添加 BookClubList, BookClubCard, CreateBookClubModal 的 Props 定义
   - 添加状态管理说明（使用 Zustand）

请重新生成 F-03 的 Technical Implementation 章节。
```

---

### 场景 4: 添加测试用例

**你的指令**：
```
F-03 的 Tests 部分缺少具体的测试代码。

请补充：

1. **Tier 1 Critical Path Test**：
   - 完整的 E2E 测试代码（Playwright）
   - 测试场景：创建读书会 → 加入读书会 → 发布笔记

2. **Integration Tests**：
   - API 集成测试（POST /api/book-clubs）
   - 测试创建成功、权限验证、输入验证

3. **Unit Tests**：
   - BookClubCard 组件测试（Jest + React Testing Library）
   - useBookClubStore hook 测试

请为 F-03 补充完整的 Tests 章节，包含实际代码。
```

---

### 重要：S-01 始终是必需的

**所有项目都必须有 `S-01-uiux-design.md`**，即使当前没有 UI。

**为什么？**
- 设计标准适用于所有项目类型（CLI 有终端 UI，API 有文档设计）
- 为未来的 UI 需求预留位置（监控仪表板、管理面板）
- 在所有 SDD 项目中保持一致的结构

**内容因项目类型而异：**
- **Web/Mobile 应用**: 完整的 UI 设计系统（见下面的场景 5a/5b）
- **CLI 工具**: 终端 UI 设计（颜色、加载动画、进度条、帮助文本格式）
- **组件库**: 设计令牌和主题系统（CSS 变量、深色模式）
- **后端/数据管道**: 简单的占位符，说明"当前无 UI。为未来的监控/管理界面预留。"
- **API 服务**: API 文档设计标准和响应格式模式

即使你的项目今天没有 UI，也要创建 S-01 作为占位符。稍后添加监控仪表板或管理界面时，你总是可以扩展它。

---

### 场景 5a: 添加 UI/UX 设计（无专业设计师）

**情境**：你的项目有 UI，但没有专业设计师。你有一些设计灵感（截图、URL、关键词如"现代"、"极简"）。

**你的指令**：
```
我需要为项目添加 UI/UX 设计规范。

**项目背景**：
- 类型：Web 应用（响应式）
- 目标用户：忙碌的专业人士，年龄 25-45 岁，中等技术水平
- 使用场景：
  - 桌面端（工作环境，每天 8+ 小时）
  - 移动端（通勤时间，短会话 5-10 分钟）
  - 需要快速输入和查看任务

**设计灵感**（我会在 origin/ 文件夹提供参考）：
- Linear.app 的截图（简洁、极简的 UI）
- Notion 的截图（舒适的排版）
- 关键词：现代、专业、平静、不要太多彩色

**请求**：
1. 创建 specs/system/S-01-uiux-design.md，使用模式 A（自包含设计）
2. 分析我在 origin/design-inspiration/ 中的设计参考
3. 考虑我的目标用户（忙碌的专业人士）和使用场景（长时间桌面会话 + 快速移动端查看）
4. 生成完整的设计令牌（颜色、排版、间距、阴影）
5. 包含深色模式（对长时间工作很重要）
6. 解释设计理由 - 为什么每个决策适合我的用户和场景
7. 提供 Tailwind CSS 配置（我在使用 Tailwind）

请生成 S-01，所有设计令牌都以文本/CSS 变量的形式内联定义。
```

**AI 回复**：
```markdown
我已为你的任务管理应用创建了 specs/system/S-01-uiux-design.md。

基于你的用户和使用场景的关键设计决策：

**颜色**：
- 主色：蓝灰色 (#475569) - 专业，不分散注意力
  - 理由：忙碌的专业人士需要专注，鲜艳颜色在 8+ 小时会话中会导致疲劳
- 中性色：温暖的灰阶 - 减少眼睛疲劳
  - 理由：长时间桌面用户需要舒适的中性色

**排版**：
- 基础字号：16px（桌面），18px（移动）
  - 理由：25-45 岁年龄段包括早期老花眼病例，移动端通勤阅读需要更大字体
- 标题：Inter（简洁、专业）
- 正文：系统字体（快速加载，适合快速移动会话）

**间距**：
- 桌面端：宽松留白（24px 基础单位）
  - 理由：减少长时间工作会话中的认知负荷
- 移动端：紧凑（16px 基础单位）
  - 理由：在 5-10 分钟短会话中最大化内容

**深色模式**：
- 真正的深色 (#0f172a)，降低对比度
  - 理由：8+ 小时桌面工作必不可少，减少眼睛疲劳

所有设计令牌都在 S-01 文件中以内联 CSS 变量形式定义（无外部依赖）。
```

---

### 场景 5b: 添加 UI/UX 设计（有专业设计师）

**情境**：你的设计师在 Figma 中创建了设计系统。你需要在规范中引用它，并让 AI 补充任何缺失的方面。

**你的指令**：
```
我需要为项目添加 UI/UX 设计规范。

**项目背景**：
- 类型：移动应用（iOS + Android）
- 目标用户：健身爱好者，年龄 18-35 岁，高技术水平
- 使用场景：
  - 健身房环境（明亮照明，手出汗，需要大触摸目标）
  - 户外跑步（强烈阳光，需要高对比度）
  - 组间快速记录（需要快速交互）

**专业设计**：
我们的设计师创建了完整的设计系统：
- Figma URL：https://figma.com/file/abc123/fitness-tracker-design-system
- 已定义设计令牌（颜色、排版、组件）
- 移动优先方法

**请求**：
1. 创建 specs/system/S-01-uiux-design.md，使用模式 B（外部引用）
2. 引用 Figma 设计系统作为真实来源
3. 根据我们的目标用户（健身爱好者）和场景（健身房/户外）审查设计
4. 补充任何缺失的方面：
   - 健身房环境的可访问性（大触摸目标、高对比度）
   - 户外可读性（阳光场景）
   - 快速交互模式（快速记录）
5. 添加设计理由，解释为什么设计决策适合我们的使用场景
6. 包含平台特定考虑因素（iOS vs Android）

请生成 S-01，引用 Figma 但包含内联分析和补充。
```

**AI 回复**：
```markdown
我已为你的健身追踪应用创建了 specs/system/S-01-uiux-design.md。

**模式 B：外部引用**

**设计系统来源**：https://figma.com/file/abc123/fitness-tracker-design-system
- 主色、排版、组件库在 Figma 中定义
- 所有开发人员应参考 Figma 获取最新设计令牌

**基于场景的补充**（AI 根据使用场景生成）：

**1. 健身房环境适配**：
- 最小触摸目标：48px（iOS），56px（Android）
  - 理由：手出汗需要更大目标，用户在组间记录
- 高对比模式：WCAG AAA（7:1 对比度）
  - 理由：明亮的健身房照明降低屏幕可读性

**2. 户外跑步适配**：
- 户外调色板：鲜艳主色 (#FF6B35, #004E89)
  - 理由：强烈阳光场景需要高对比度
- 大字体：最小 18px 正文，32px 标题
  - 理由：移动用户（跑步）需要一眼就能读懂的文本

**3. 快速交互模式**：
- 一键记录：预填充常见运动
  - 理由：组间用户需要 <5 秒记录
- 底部表单模态：快速关闭手势
  - 理由：健身房用户单手持手机

**平台特定**：
- iOS：原生底部标签栏（iOS 用户熟悉）
- Android：浮动操作按钮（Material Design 标准）

所有 Figma 设计令牌都是外部引用。上述补充是 AI 生成扩展的内联内容。
```

---

## 🎨 高级技巧

### 技巧 1: 分批生成（避免超时）

如果项目很大（>20 features），一次性生成可能超时。

**你的指令**：
```
项目比较大，我们分批生成：

**第一批**：先生成基础架构
- README.md（根目录）
- specs/README.md
- specs/system/ 目录下的所有文件（S-00 到 S-04）

生成完第一批后，我会让你继续生成 features。
```

生成完第一批后：
```
第一批完成。现在请生成第二批：

**第二批**：核心功能（Wave 1-2）
- specs/features/F-01-database-authentication.md
- specs/features/F-02-user-profiles.md
- specs/features/F-03-book-club-crud.md

生成完后，我会继续下一批。
```

---

### 技巧 2: 参考现有项目

**你的指令**：
```
我的项目和 Pocket Covey 有些类似（都有对话系统）。

请参考 Pocket Covey 的 specs/features/F-04-conversation-engine.md，
为我的项目生成 F-06-discussion-forum.md。

保持相同的结构和详细程度，但内容要适配读书会讨论区：
- 讨论按章节分组（而不是习惯分组）
- 支持回复（嵌套评论）
- 支持点赞
- 支持 Markdown

请生成 F-06-discussion-forum.md。
```

---

### 技巧 3: 要求生成 Mermaid 图表

**你的指令**：
```
F-05（读书笔记）的用户流程比较复杂，纯文字不够直观。

请为 F-05 添加以下 Mermaid 图表：

1. **Sequence Diagram**（时序图）：
   - 展示用户创建笔记的完整流程
   - 包括：Frontend → API → Database → Markdown 渲染

2. **State Diagram**（状态图）：
   - 笔记的状态转换：draft → published → archived

3. **Entity Relationship Diagram**（ER 图）：
   - 展示 notes 表和 book_clubs, users, chapters 的关系

请更新 F-05 的 PRD 和 Technical Implementation 部分，加入这些图表。
```

---

### 技巧 4: 要求符合特定框架

**你的指令**：
```
我的项目使用 tRPC 而不是 REST API。

请修改所有 features 的 Technical Implementation 部分：

- 将 REST API endpoints 改为 tRPC procedures
- 使用 tRPC 的类型定义风格
- 添加 input validation（使用 Zod）

示例格式：
```typescript
export const bookClubRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        bookTitle: z.string(),
        startDate: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Implementation
    }),
});
```

请先更新 F-03（读书会 CRUD），我确认格式后，你再批量更新其他 features。
```

---

## 📊 完整工作流示例

### 完整对话示例（精简版）

**第 1 轮：你给 AI 完整 Prompt + 项目信息**
```
[粘贴 SDD-TEMPLATE-PROMPT.md 全文]

现在为我的项目生成 specs：BookClub（在线读书会）...
[项目详细信息]

请先完成 Phase 1-4。
```

**第 2 轮：AI 输出规划**
```
Phase 1-4 完成：
- 8 个功能
- 5 个系统模块
- 依赖图
- 4 个实现波次

请确认。
```

**第 3 轮：你确认或修改**
```
确认！但请将 F-06 改为 CRITICAL 优先级。

确认后请继续 Phase 5，生成所有文件。
```

**第 4 轮：AI 生成所有文件**
```
生成中...

1. README.md [完成]
2. specs/README.md [完成]
3. specs/system/S-00-architecture.md [完成]
...
13. specs/features/F-08-book-recommendations.md [完成]

✅ 所有文件生成完成！
```

**第 5 轮：你微调细节**
```
很好！但我需要修改 F-05 的 API 设计：

请在 POST /api/notes 的 Request 中添加 chapter_id 字段。

请只更新 F-05 的 Technical Implementation → API Endpoints 部分。
```

**第 6 轮：AI 更新特定部分**
```
已更新 F-05 的 API 设计，添加了 chapter_id 字段。

Request 类型现在是：
```typescript
interface CreateNoteRequest {
  book_club_id: string;
  chapter_id: number;  // ← 新增
  title: string;
  content: string;
  is_public: boolean;
}
```

还需要其他修改吗？
```

**第 7 轮：完成**
```
完美！所有 specs 已完成。谢谢！
```

---

## 🚨 常见问题排查

### 问题 1: AI 生成的文件不完整

**现象**：AI 只生成了一部分内容就停止了

**解决方案**：
```
请继续生成 F-05 的剩余部分：
- Technical Implementation（从 Database Schema 开始）
- Tests
- Notes

请完整输出这些章节。
```

---

### 问题 2: AI 偏离了 SDD 模版

**现象**：AI 没有按照模版结构生成

**解决方案**：
```
你的输出没有遵循 SDD 模版的结构。

请重新生成 F-05，严格按照 SDD-TEMPLATE-PROMPT.md 中的
"Template 2: Feature Specification File" 结构：

必须包含这些章节：
1. Quick Reference
2. Dependencies
3. PRD: Product Requirements
4. Technical Implementation
5. Tests
6. Notes

每个章节都要完整。请重新生成。
```

---

### 问题 3: 依赖关系不对

**现象**：Feature 的依赖声明和实际需求不匹配

**解决方案**：
```
F-05（读书笔记）的依赖不对。

当前依赖：F-01, F-02
正确依赖：F-01, F-03（必须依赖读书会）

请更新：
1. F-05 的 Dependencies 章节
2. specs/README.md 的 Feature Index 表格
3. specs/README.md 的 Mermaid 依赖图
4. 重新计算 Implementation Waves

请输出更新后的内容。
```

---

### 问题 4: 技术栈不匹配

**现象**：AI 使用了错误的技术栈（比如你说 Django，它用了 Next.js）

**解决方案**：
```
你生成的代码使用了 Next.js，但我的项目是 Django + React。

请重新生成所有 features 的 Technical Implementation 部分：

- Backend API: Django REST Framework（不是 Next.js API Routes）
- Frontend: React + Vite（不是 Next.js）
- 使用 Python 类型提示（不是 TypeScript）

示例：
```python
# API Endpoint
class BookClubViewSet(viewsets.ModelViewSet):
    queryset = BookClub.objects.all()
    serializer_class = BookClubSerializer
    permission_classes = [IsAuthenticated]
```

请从 F-01 开始重新生成。
```

---

## 💡 最佳实践

### ✅ Do（推荐做法）

1. **分阶段确认**：不要跳过 Phase 1-4，先确认规划再生成文件
2. **明确优先级**：清楚标注哪些是 CRITICAL、HIGH、MEDIUM、LOW
3. **提供示例**：如果有特殊需求，给 AI 一个代码示例
4. **逐个精化**：先生成所有文件框架，再逐个精化细节
5. **保存进度**：每生成一批文件，保存到本地，避免丢失

### ❌ Don't（避免做法）

1. **不要一次性要求太多**：不要说"生成 30 个完整的 features"，会超时
2. **不要跳过模版**：不要说"随便写写就行"，一定要求遵循 SDD 模版
3. **不要省略测试**：不要说"测试部分可以省略"，测试是 SDD 的核心
4. **不要忽略依赖**：不要让 AI 随意定义依赖，要检查合理性
5. **不要频繁推翻重来**：如果规划阶段就发现问题，立即修正，不要等生成完才推翻

---

## 🎓 学习路径

**第 1 天**：理解 SDD
- 阅读 [SDD-QUICK-REFERENCE.md](./SDD-QUICK-REFERENCE.md)（10 分钟）
- 阅读 [SDD-WORKFLOW-EXAMPLE.md](./SDD-WORKFLOW-EXAMPLE.md)（30 分钟）

**第 2 天**：小项目练手
- 用本指南的方法，让 AI 为一个简单项目生成 specs（1 小时）
- 项目建议：Todo App、Blog、URL Shortener（5-8 个功能）

**第 3 天**：实际项目应用
- 用在你的真实项目上（2-4 小时）
- 边生成边调整，记录遇到的问题

**第 4 天**：优化迭代
- 根据第 3 天的经验，重新生成部分 specs
- 补充细节，完善测试用例

---

## 📚 相关文档

- [SDD-TEMPLATE-PROMPT.md](./SDD-TEMPLATE-PROMPT.md) - 完整的 AI Prompt（必读）
- [SDD-QUICK-REFERENCE.md](./SDD-QUICK-REFERENCE.md) - 快速参考卡
- [SDD-WORKFLOW-EXAMPLE.md](./SDD-WORKFLOW-EXAMPLE.md) - 完整示例
- [README.md](./README.md) - 使用指南

---

## 🆘 需要帮助？

**遇到问题时**：

1. 先检查 AI 是否真的收到了完整的 SDD-TEMPLATE-PROMPT.md
2. 明确告诉 AI 哪里不对，要求重新生成那部分
3. 参考 Pocket Covey 的实际 specs 文件作为标准
4. 如果 AI 持续偏离，重新开始对话，重新粘贴 prompt

---

**🎉 现在你已经掌握了如何让 AI 工具使用 SDD 模版生成高质量的 specs！**

开始你的第一个项目吧！
