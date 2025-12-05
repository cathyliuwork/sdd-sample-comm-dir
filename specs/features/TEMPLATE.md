# F-XX: [功能名称]

**Version**: 1.0
**Last Updated**: YYYY-MM-DD
**Priority**: CRITICAL | HIGH | MEDIUM | LOW
**Status**: ✅ Spec Complete / 🚧 In Progress / ❌ Not Started

---

## Quick Reference

**What**: [一句话描述该功能是什么]

**Why**: [说明为什么需要这个功能，它解决什么问题或提供什么价值]

**Dependencies**:
- F-0Y: [依赖的功能名称]
- S-0X: [依赖的系统模块名称]

**Used By**:
- F-0Z: [被哪些功能使用]

**Implementation Status**:
- [ ] PRD 已文档化
- [ ] 技术设计已完成
- [ ] 测试已定义
- [ ] 实施已开始
- [ ] 实施已完成
- [ ] 测试已通过
- [ ] 已部署到生产环境

---

## Dependencies

### Required Features
- [F-0Y: 功能名称](./F-0Y-feature.md) - [为什么需要这个依赖]

### Required System Modules
- [S-0X: 模块名称](../system/S-0X-module.md) - [为什么需要这个依赖]

### Frontend Dependencies
- [组件库/框架名称] - [版本号和用途]

### Backend Dependencies
- [API/服务名称] - [版本号和用途]

### External Services
- [第三方 API/服务名称] - [用途]

---

## PRD: Product Requirements

**Source**: [如果从现有文档转换，引用原始文档和行号]

### Overview

[详细描述用户将体验到什么功能，包括使用场景和核心价值]

### User Flow

**步骤 1**: [操作名称]
- 用户: [用户执行什么操作]
- 系统: [系统如何响应]

**步骤 2**: [操作名称]
- 用户: [用户执行什么操作]
- 系统: [系统如何响应]

**步骤 3**: [操作名称]
- 用户: [用户执行什么操作]
- 系统: [系统如何响应]

... 继续所有步骤 ...

### UI Components

**组件 1: [组件名称]**
- **位置**: [组件出现在哪里]
- **用途**: [组件的作用]
- **元素**:
  - [输入框/按钮/显示元素 1]
  - [输入框/按钮/显示元素 2]
  - [输入框/按钮/显示元素 3]

**组件 2: [组件名称]**
- **位置**: [组件出现在哪里]
- **用途**: [组件的作用]
- **元素**:
  - [元素列表]

... 重复所有 UI 组件 ...

### Business Rules

1. **规则 1**: [约束或业务逻辑]
   - 示例: "每个用户最多创建 3 个活跃项目"

2. **规则 2**: [约束或业务逻辑]
   - 示例: "邮箱必须验证后才能访问该功能"

3. **规则 3**: [约束或业务逻辑]
   - 示例: "数据提交后 24 小时内可以编辑"

### Acceptance Criteria

- [ ] 用户可以 [执行操作 1]
- [ ] 系统阻止 [无效操作]
- [ ] [数据/状态] 正确 [存储/显示/更新]
- [ ] 错误处理对 [边界情况] 有效
- [ ] 响应时间在 [性能要求] 以内
- [ ] 界面在移动端和桌面端均正常显示

---

## Technical Implementation

**Source**: [如果从现有文档转换，引用原始文档和行号]

### API Endpoints

**端点 1: [HTTP METHOD] /api/path**

**Purpose**: [该端点的作用]

**Request**:
```typescript
interface RequestBody {
  field1: string;
  field2: number;
  field3?: boolean; // 可选字段
  // ... 所有请求字段
}

// Query Parameters (如果适用)
interface QueryParams {
  page?: number;
  limit?: number;
  filter?: string;
}
```

**Response** (Success - 200):
```typescript
interface SuccessResponse {
  data: {
    field1: string;
    field2: number;
    field3: boolean;
  };
  message: string;
}
```

**Response** (Error - 400):
```typescript
interface ErrorResponse {
  error: string;
  code: string;
  details?: Record<string, string>;
}
```

**Error Codes**:
- `ERROR_CODE_1`: [错误描述和处理方式]
- `ERROR_CODE_2`: [错误描述和处理方式]

**示例请求**:
```bash
curl -X POST /api/path \
  -H "Content-Type: application/json" \
  -d '{"field1":"value","field2":123}'
```

... 重复所有端点 ...

### Database Schema

**表 1: table_name**

```sql
CREATE TABLE table_name (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  field1 VARCHAR(255) NOT NULL,
  field2 INTEGER DEFAULT 0,
  field3 TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_table_user_id ON table_name(user_id);
CREATE INDEX idx_table_created_at ON table_name(created_at DESC);

-- RLS 策略（如果适用）
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "用户可以查看自己的记录"
  ON table_name FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "用户可以插入自己的记录"
  ON table_name FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Prisma Schema**:
```prisma
model TableName {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  field1    String   @db.VarChar(255)
  field2    Int      @default(0)
  field3    String?  @db.Text
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // 关联关系
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([createdAt(sort: Desc)])
  @@map("table_name")
}
```

... 重复所有表 ...

### Frontend Components

**组件 1: ComponentName**

**文件路径**: `src/components/path/ComponentName.tsx`

**Props**:
```typescript
interface ComponentNameProps {
  prop1: string;
  prop2?: number;
  onAction: (data: DataType) => void;
  className?: string;
}
```

**State**:
```typescript
const [state1, setState1] = useState<Type>(initialValue);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**关键函数**:
- `handleAction()`: [功能描述]
- `fetchData()`: [功能描述]
- `validateInput()`: [功能描述]

**实现示例**:
```typescript
'use client';

import { useState } from 'react';

interface ComponentNameProps {
  prop1: string;
  prop2?: number;
  onAction: (data: DataType) => void;
}

export default function ComponentName({
  prop1,
  prop2 = 0,
  onAction
}: ComponentNameProps) {
  const [state1, setState1] = useState<Type>(initialValue);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      // 业务逻辑
      const result = await apiCall();
      onAction(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-wrapper">
      {/* 组件结构 */}
      <button onClick={handleAction} disabled={loading}>
        {loading ? '处理中...' : '确认'}
      </button>
    </div>
  );
}
```

... 重复所有组件 ...

### State Management

[如果使用 Redux/Zustand/Context，定义状态形状和操作]

**使用 Zustand 示例**:
```typescript
import { create } from 'zustand';

interface FeatureState {
  field1: Type;
  field2: Type;
  actions: {
    updateField1: (value: Type) => void;
    resetState: () => void;
  };
}

const useFeatureStore = create<FeatureState>((set) => ({
  field1: initialValue,
  field2: initialValue,
  actions: {
    updateField1: (value) => set({ field1: value }),
    resetState: () => set({ field1: initialValue, field2: initialValue }),
  },
}));

export default useFeatureStore;
```

### Prompt Engineering

[如果是 AI 驱动的功能，定义提示词模板]

**提示词模板**:
```
System Message:
[你的角色和指导方针]

User Message (Round 1):
[初始提示给用户]

Assistant Response Structure:
[期望的响应格式]

... 继续多轮对话 ...
```

---

## Tests

**Source**: [如果从现有文档转换，引用原始文档和行号]

### Tier 1 Critical Path Test

**测试名称**: `[功能名称] - 正常路径`

**描述**: [该测试验证什么]

**前置条件**:
- [必须存在的状态/数据]
- [必须存在的配置]

**测试步骤**:
1. [操作步骤 1]
2. [操作步骤 2]
3. [操作步骤 3]
4. [操作步骤 4]

**预期结果**:
- [断言 1]
- [断言 2]
- [断言 3]

**失败影响**: ❌ **阻止部署** (Tier 1 测试必须通过)

---

### E2E Tests

**测试 1: [测试名称]**
```typescript
import { test, expect } from '@playwright/test';

test('[功能名称] - [场景描述]', async ({ page }) => {
  // Arrange - 准备测试数据
  await setupTestData();

  // Act - 执行操作
  await page.goto('/path');
  await page.fill('[data-testid="input-field"]', 'test value');
  await page.click('[data-testid="submit-button"]');

  // Assert - 验证结果
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="result"]')).toHaveText('Expected');
});
```

**测试 2: [错误处理场景]**
```typescript
test('[功能名称] - 错误处理', async ({ page }) => {
  await page.goto('/path');
  await page.click('[data-testid="submit-button"]');

  // 验证错误提示
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="error-message"]')).toContainText('必填字段');
});
```

... 重复所有 E2E 场景 ...

---

### Integration Tests

**测试 1: API 集成**
```typescript
import { describe, it, expect } from '@jest/globals';

describe('API Endpoint - POST /api/path', () => {
  it('应该成功处理有效请求', async () => {
    const response = await fetch('/api/path', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field1: 'value', field2: 123 })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toMatchObject({
      data: { field1: 'value', field2: 123 },
      message: expect.any(String)
    });
  });

  it('应该拒绝无效请求', async () => {
    const response = await fetch('/api/path', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invalid: 'data' })
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBeDefined();
  });
});
```

**测试 2: 数据库集成**
```typescript
describe('Database Operations', () => {
  it('应该正确存储和检索数据', async () => {
    const testData = { field1: 'value', field2: 123 };

    // 插入数据
    const created = await prisma.tableName.create({ data: testData });
    expect(created.id).toBeDefined();

    // 检索数据
    const retrieved = await prisma.tableName.findUnique({
      where: { id: created.id }
    });
    expect(retrieved).toMatchObject(testData);
  });
});
```

... 重复所有集成测试 ...

---

### Unit Tests

**测试 1: 组件逻辑**
```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';

describe('ComponentName Logic', () => {
  it('应该正确处理用户输入', () => {
    const { result } = renderHook(() => useComponentLogic());

    act(() => {
      result.current.updateValue('test');
    });

    expect(result.current.value).toBe('test');
    expect(result.current.isValid).toBe(true);
  });

  it('应该验证无效输入', () => {
    const { result } = renderHook(() => useComponentLogic());

    act(() => {
      result.current.updateValue('');
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.error).toBe('字段不能为空');
  });
});
```

**测试 2: 工具函数**
```typescript
describe('Utility Functions', () => {
  it('应该正确格式化数据', () => {
    const input = { raw: 'data' };
    const output = formatData(input);

    expect(output).toEqual({ formatted: 'DATA' });
  });
});
```

... 重复所有单元测试 ...

---

## Notes

### Future Enhancements

- [潜在改进 1]: [描述和优先级]
- [潜在改进 2]: [描述和优先级]
- [潜在改进 3]: [描述和优先级]

### Known Limitations

- [限制 1]: [描述和可能的解决方案]
- [限制 2]: [描述和可能的解决方案]

### References

- [外部文档链接]
- [设计灵感来源]
- [相关技术文档]
- [API 参考文档]

---

**Related Documents**:
- [S-00: 系统架构概览](../system/S-00-architecture.md)
- [F-XX: 相关功能](./F-XX-feature.md)
