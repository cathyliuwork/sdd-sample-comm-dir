# F-XX: [Feature Name]

## Quick Reference

**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed

**Priority**: CRITICAL | HIGH | MEDIUM | LOW

**Implementation Wave**: Wave [X]

**Estimated Effort**: [X] days/weeks

**Summary**: [One-sentence description]

---

## Dependencies

### Required Features
- F-XX: [Feature Name] - [Why needed]

### Required System Modules
- S-01: UI/UX Design System - [Which tokens/components]
- S-02: Testing Strategy - [Which test frameworks]
- S-03: Database Schema - [Which tables]

### External Dependencies
- [Library/Service] - [Purpose]

---

## PRD: Product Requirements

### Overview
[2-3 paragraphs describing what this feature does]

### User Stories
**As a** [user type],  
**I want to** [action],  
**So that** [benefit].

### User Flow
1. User [action]
2. System [response]
3. User sees [result]

### UI/UX Requirements
**Screens/Views**:
- [Screen Name]: [Layout description]

### Business Rules
1. **Rule Name**: [Description]

### Acceptance Criteria
- [ ] User can [action]
- [ ] Error shown when [condition]

---

## Technical Implementation

### API Endpoints

#### `POST /api/[resource]`
**Request**:
```typescript
{ field: string }
```

**Response**:
```typescript
{ success: boolean, data: {...} }
```

### Database Schema
**Tables**: [table_name]

### Frontend Components
- `ComponentName.tsx`: [Purpose]

---

## Tests

### Tier 1: E2E Test
```typescript
test('[Feature Name]', async ({ page }) => {
  await page.goto('/url');
  // Test steps
});
```

### Tier 2: Integration Tests
```typescript
describe('API', () => {
  it('works', async () => {
    // API test
  });
});
```

### Tier 3: Unit Tests
```typescript
describe('Component', () => {
  it('renders', () => {
    // Component test
  });
});
```

---

## Notes
[Implementation notes, future enhancements]

---

**Last Updated**: YYYY-MM-DD
