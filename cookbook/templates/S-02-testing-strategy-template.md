# S-02: Testing Strategy

## Quick Reference

- **Purpose**: Complete testing approach and quality assurance framework
- **Scope**: Test pyramid, frameworks, critical paths, CI/CD integration
- **Dependencies**: None (defines quality gates for all features)
- **Used By**: All features (F-01 through F-XX)

---

## Testing Philosophy

[2-3 paragraphs describing the project's approach to quality assurance]

**Example**:
> We follow the test pyramid approach: many unit tests, fewer integration tests, and carefully selected E2E tests for critical user paths. Our goal is 80% overall code coverage with 100% coverage of business logic and critical paths. We prioritize fast feedback loops and test reliability over exhaustive coverage.

---

## Test Pyramid

### Tier 1: Critical Path E2E Tests
**Coverage Target**: [X]% of user journeys (e.g., 5-10 critical paths)  
**Framework**: [e.g., Playwright, Cypress, Selenium]  
**Run Time**: [e.g., ~5 minutes for full suite]  
**When to Run**: Pre-deployment, nightly builds

**Purpose**: Ensure core user flows work end-to-end in real browser environment

**Critical Paths**:

1. **[Path Name]**: [e.g., User Signup → Email Verification → First Login]
   - **Steps**:
     1. Navigate to signup page
     2. Fill form with valid data
     3. Submit and receive verification email
     4. Click verification link
     5. Log in with credentials
   - **Expected Outcome**: User lands on dashboard with welcome message

2. **[Path Name]**: [e.g., Create Task → Assign → Complete → Archive]
   - **Steps**: [...]
   - **Expected Outcome**: [...]

**Configuration**:
```typescript
// playwright.config.ts example
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },
});
```

---

### Tier 2: Integration Tests
**Coverage Target**: [X]% of API endpoints (e.g., 80%+)  
**Framework**: [e.g., Jest, Vitest, Supertest]  
**Run Time**: [e.g., ~2 minutes]  
**When to Run**: Every commit (CI), pre-deploy

**Purpose**: Verify component interactions, API contracts, database operations

**Test Areas**:

#### API Endpoint Testing
- **Authentication endpoints**: Login, signup, logout, refresh token
- **CRUD operations**: Create, read, update, delete for each resource
- **Business logic endpoints**: Complex operations, calculations
- **Error handling**: Invalid inputs, unauthorized access, not found

**Example Test**:
```typescript
describe('POST /api/tasks', () => {
  it('creates task with valid data', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ title: 'Test Task', priority: 'high' });
    
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });

  it('rejects unauthorized request', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' });
    
    expect(response.status).toBe(401);
  });
});
```

#### Database Integration
- **Schema validation**: Ensure migrations applied correctly
- **Constraints**: Foreign keys, unique constraints, null checks
- **RLS Policies**: Row-Level Security works as expected (if using Supabase/PostgreSQL)

#### External Service Mocking
- **Payment API**: Mock Stripe/payment provider
- **Email**: Mock email sending service
- **AI/ML APIs**: Mock OpenAI or similar services

---

### Tier 3: Unit Tests
**Coverage Target**: [X]% of functions/components (e.g., 80%+)  
**Framework**: [e.g., Jest, Vitest, React Testing Library]  
**Run Time**: [e.g., < 30 seconds]  
**When to Run**: Every save (watch mode), every commit

**Purpose**: Verify individual units work in isolation

**Test Areas**:

#### Business Logic Functions
```typescript
// utils/calculateDiscount.test.ts
describe('calculateDiscount', () => {
  it('applies 10% discount for orders over $100', () => {
    expect(calculateDiscount(150)).toBe(135);
  });

  it('applies no discount for orders under $100', () => {
    expect(calculateDiscount(50)).toBe(50);
  });
});
```

#### React Components
```typescript
// components/TaskCard.test.tsx
describe('TaskCard', () => {
  it('renders task title', () => {
    render(<TaskCard task={{ id: '1', title: 'Test Task' }} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onComplete when complete button clicked', () => {
    const onComplete = jest.fn();
    render(<TaskCard task={mockTask} onComplete={onComplete} />);
    
    fireEvent.click(screen.getByRole('button', { name: /complete/i }));
    expect(onComplete).toHaveBeenCalledWith(mockTask.id);
  });
});
```

#### State Management
- **Zustand stores**: Test actions and selectors
- **Context providers**: Test state updates
- **Custom hooks**: Test behavior and edge cases

---

## Testing Frameworks

### E2E Testing
- **Framework**: [Playwright / Cypress / etc.]
- **Browser Coverage**: [Chromium, Firefox, Safari]
- **Configuration**: [`playwright.config.ts`]
- **Run Command**: `npm run test:e2e`
- **CI Command**: `npm run test:e2e:ci` (headless mode)

### Integration Testing
- **Framework**: [Jest / Vitest / etc.]
- **Database**: [Use test database, reset between tests]
- **Configuration**: [`vitest.config.ts`]
- **Run Command**: `npm run test:integration`

### Unit Testing
- **Framework**: [Jest / Vitest / etc.]
- **Configuration**: [`vitest.config.ts`]
- **Run Command**: `npm run test:unit`
- **Watch Mode**: `npm run test:watch`

### Code Coverage
- **Tool**: [c8, Istanbul, built-in coverage]
- **Report**: `npm run test:coverage`
- **Output**: [HTML report in `coverage/` directory]

---

## CI/CD Integration

### Pre-commit Hooks (via Husky/Lefthook)
```bash
# .husky/pre-commit
npm run lint        # ESLint checks
npm run type-check  # TypeScript type checking
npm run test:unit   # Fast unit tests only (~30s)
```

### Pull Request Checks (GitHub Actions / GitLab CI)
```yaml
# .github/workflows/test.yml
- name: Run Tests
  run: |
    npm run lint
    npm run type-check
    npm run test:unit
    npm run test:integration
    npm run test:e2e
    npm run test:coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

### Pre-deployment (Staging/Production)
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ E2E critical paths pass
- ✅ Code coverage meets threshold (e.g., 80%)
- ✅ Smoke tests in staging environment

### Post-deployment
- **Smoke Tests**: Verify critical endpoints respond
- **Health Checks**: Monitor system health for 15 minutes
- **Rollback Trigger**: Automatic rollback if error rate > 5%

---

## Test Data Strategy

### Test Fixtures
**Location**: `/tests/fixtures/` or `/tests/mocks/`

**Example**:
```typescript
// tests/fixtures/users.ts
export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
};

export const mockAdmin = {
  id: 'admin-123',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
};
```

### Database Seeding
- **Tool**: [Prisma seed, custom seed scripts]
- **Test DB**: Separate database for testing
- **Reset Strategy**: Reset database before each integration test suite
- **Seed Command**: `npm run db:seed:test`

### Mock Data Generation
- **Library**: [Faker.js, MSW for API mocking]
- **Usage**: Generate realistic data for tests
- **Example**:
```typescript
import { faker } from '@faker-js/faker';

const randomUser = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
};
```

---

## Coverage Targets

### Overall Coverage
- **Target**: [e.g., 80% overall]
- **Enforcement**: Fail CI if coverage drops below threshold
- **Report**: Available in PR comments via codecov/coveralls

### By Type
- **Critical Paths** (Tier 1 E2E): 100% of identified critical user journeys
- **Business Logic**: [e.g., 90%+ coverage]
- **API Endpoints**: [e.g., 85%+ coverage]
- **UI Components**: [e.g., 70%+ coverage]
- **Utility Functions**: [e.g., 90%+ coverage]

### Coverage Enforcement
```json
// vitest.config.ts
coverage: {
  statements: 80,
  branches: 75,
  functions: 80,
  lines: 80,
  thresholds: {
    enforceThresholds: true
  }
}
```

---

## Test Organization

### Directory Structure
```
tests/
├── e2e/                    # End-to-end tests
│   ├── auth.spec.ts
│   ├── tasks.spec.ts
│   └── ...
├── integration/            # Integration tests
│   ├── api/
│   │   ├── tasks.test.ts
│   │   └── users.test.ts
│   └── db/
│       └── migrations.test.ts
├── unit/                   # Unit tests
│   ├── components/
│   ├── utils/
│   └── hooks/
├── fixtures/               # Test data
│   ├── users.ts
│   └── tasks.ts
└── helpers/                # Test utilities
    ├── setup.ts
    └── mockServer.ts
```

### Naming Conventions
- **E2E Tests**: `*.spec.ts` (e.g., `user-signup.spec.ts`)
- **Integration Tests**: `*.test.ts` (e.g., `api-tasks.test.ts`)
- **Unit Tests**: `*.test.ts` or `*.test.tsx` (e.g., `TaskCard.test.tsx`)

---

## Quality Gates

### Definition of Done (DoD)
A feature is considered complete when:
- [ ] All acceptance criteria met
- [ ] Unit tests written and passing (80%+ coverage for new code)
- [ ] Integration tests for API endpoints
- [ ] E2E test added if modifying critical path
- [ ] Code reviewed and approved
- [ ] No linting errors
- [ ] TypeScript type checks pass
- [ ] Documentation updated

### Merge Requirements
- ✅ All CI checks pass
- ✅ Code review approved by 1+ team member
- ✅ No decrease in overall code coverage
- ✅ E2E tests pass for affected critical paths

---

## Related Documents

- **All Features** (F-XX): Each feature spec includes Tests section
- **S-00**: Architecture Overview
- **CI/CD Pipeline Configuration**: `.github/workflows/`, `vercel.json`, etc.

---

## Notes

### Testing Best Practices
- **Fast Feedback**: Unit tests run in < 30s
- **Test Isolation**: Each test independent, no shared state
- **Descriptive Names**: Test names describe what is being tested
- **One Assertion**: Each test verifies one behavior (when possible)
- **Avoid Implementation Details**: Test behavior, not implementation

### Future Improvements
- [ ] Add visual regression testing (Percy, Chromatic)
- [ ] Implement mutation testing (Stryker)
- [ ] Add performance testing (Lighthouse CI)
- [ ] Contract testing for external APIs (Pact)

### Known Issues
- [Any testing gaps or challenges]
- [Flaky tests being addressed]

---

**Last Updated**: YYYY-MM-DD
**Version**: 1.0
