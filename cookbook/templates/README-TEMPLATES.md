# SDD File Templates

This directory contains ready-to-use template files for the SDD (Spec-Driven Development) methodology.

---

## 📁 Available Templates

### Mandatory Foundation Templates (ALL Projects)

**These three templates are REQUIRED for every project without exception:**

#### 1. [S-00-architecture-template.md](./S-00-architecture-template.md) (9.4KB)
**File Name**: `S-00-architecture.md`
**Purpose**: 30,000 ft system overview
**Dependencies**: None (foundation document)
**Used By**: All system modules (S-01+) and all features

**Content Includes**:
- System Overview (2-3 paragraphs describing what the system does)
- Architecture Diagram (Mermaid diagram showing key components)
- Tech Stack (Frontend, Backend, Infrastructure, Development Tools)
- Design Principles (with rationale and implementation)
- Key Architectural Decisions (alternatives, trade-offs)
- Data Flow (user request flow, background processes)
- Security Considerations (authentication, authorization, data protection)
- Scalability & Performance (expected load, scaling strategy, monitoring)
- Deployment Architecture (environments, CI/CD, database migrations)
- Integration Points (third-party services, external APIs)

**When to Use**:
- ALWAYS create as first file in `specs/system/`
- For any new project (web, mobile, CLI, backend, data pipeline)

---

#### 2. [S-01-uiux-design-template.md](./S-01-uiux-design-template.md) (24KB)
**File Name**: `S-01-uiux-design.md`
**Purpose**: Design language and visual standards
**Dependencies**: None (defines visual foundation)
**Used By**: All features with user-facing interfaces

**Content Includes**:
- Platform Strategy (web, mobile, CLI, API)
- Target Users & Usage Context (user personas, scenarios, accessibility needs)
- Design System Modes:
  - **Mode A (Self-Contained)**: AI-generated design tokens (colors, typography, spacing, shadows)
  - **Mode B (External Reference)**: Links to Figma/design system + AI supplements
- Component Patterns (buttons, forms, navigation, cards)
- Accessibility Standards (WCAG compliance, keyboard nav, screen readers)
- Dark Mode (color schemes, toggle implementation)
- CLI-Specific Design (for CLI tools: terminal colors, spinners, help text)
- Design Rationale (WHY each decision fits target users and scenarios)
- Production-Ready Tokens (Tailwind config, CSS variables)

**When to Use**:
- **Web/Mobile Apps**: Full UI design system (colors, typography, components, accessibility)
- **CLI Tools**: Terminal UI design (colors, spinners, progress bars, help text formatting)
- **Component Libraries**: Design tokens and theming system (CSS variables, dark mode)
- **Backend/Data Pipelines**: Simple placeholder stating "No UI currently. Reserved for future monitoring/admin interface."
- **API Services**: API documentation design standards and response formatting patterns

**IMPORTANT**: ALL projects must have this file, even if no UI currently exists. Use placeholder content for backend projects.

---

#### 3. [S-02-testing-strategy-template.md](./S-02-testing-strategy-template.md) (10KB)
**File Name**: `S-02-testing-strategy.md`
**Purpose**: Quality assurance and test pyramid
**Dependencies**: None (defines quality gates upfront)
**Used By**: All features (testing requirements)

**Content Includes**:
- Test Pyramid (Tier 1: E2E, Tier 2: Integration, Tier 3: Unit)
- Tier 1: Critical Path E2E Tests (5-10 key user journeys, Playwright/Cypress)
- Tier 2: Integration Tests (API endpoints, database, third-party integrations)
- Tier 3: Unit Tests (business logic, components, utilities)
- Testing Frameworks (with rationale for each tier)
- CI/CD Integration (pre-commit hooks, PR checks, deployment gates)
- Coverage Targets (overall 80%, critical paths 100%, business logic 90%)
- Test Data Management (fixtures, factories, seeding)
- Manual Testing Checklist (browser/device matrix, accessibility)
- Performance Testing (load tests, benchmarks)
- Security Testing (OWASP checks, dependency scanning)

**When to Use**:
- ALWAYS create as third file in `specs/system/`
- For any project type (web, CLI, backend, data pipeline)
- Adapt content based on project (e.g., data pipelines use Great Expectations)

---

### Project-Specific Templates (Optional)

**These templates are used when applicable to your project:**

#### 4. [S-03-database-schema-template.md](./S-03-database-schema-template.md) (5.3KB)
**File Name**: `S-03-database-schema.md` (or S-04+, depending on your numbering)
**Purpose**: Complete data model and relationships
**Dependencies**: None (foundational data structure)
**Used By**: All features that read/write data

**Content Includes**:
- Entity Relationship Diagram (Mermaid ERD)
- Tables (PostgreSQL CREATE TABLE statements with constraints)
- Prisma Schema (ORM schema definition for Prisma users)
- Indexes (performance optimization)
- Row-Level Security Policies (RLS for Supabase/PostgreSQL)
- Relationships & Foreign Keys (one-to-many, many-to-many)
- Database Triggers & Functions (business logic enforcement)
- Migration Strategy (versioning, rollback plan)
- Data Seeding (initial data, test fixtures)

**When to Use**:
- Projects with database (SQL or NoSQL)
- Typically numbered S-03 or S-04 (after S-00, S-01, S-02)
- Skip for projects without persistent data storage

---

#### 5. [F-XX-feature-template.md](./F-XX-feature-template.md) (1.8KB)
**File Name**: `F-XX-[feature-name].md` (e.g., `F-04-task-management.md`)
**Purpose**: Complete specification for single user-facing feature
**Dependencies**: Varies (typically depends on S-01, S-02, S-03, F-01)
**Used By**: Implementation team, QA team

**Content Includes**:
- Quick Reference (status, priority, one-sentence summary)
- Dependencies (required system modules and features)
- PRD: Product Requirements
  - User Stories (As a... I want to... So that...)
  - User Flows (step-by-step interaction)
  - UI Mockups/Wireframes (for UI features)
  - Business Rules (validation, constraints)
  - Acceptance Criteria (definition of done)
- Technical Implementation
  - API Endpoints (request/response schemas)
  - Database Changes (new tables, columns, indexes)
  - Frontend Components (component tree, state management)
  - State Management (global state, local state)
  - AI Prompts (for AI-powered features)
- Tests
  - Tier 1: E2E Test (critical user path)
  - Tier 2: Integration Tests (API, database)
  - Tier 3: Unit Tests (business logic, components)
- Notes (edge cases, future enhancements, known limitations)

**When to Use**:
- For every user-facing feature
- For every independent functionality
- Number sequentially (F-01, F-02, F-03...)
- F-01 is always core infrastructure (database + auth)

---

## 🚀 How to Use These Templates

### Option A: Copy Template Files Directly

**For New Projects:**

1. **Create directory structure**:
   ```bash
   mkdir -p specs/system specs/features
   ```

2. **Copy mandatory templates**:
   ```bash
   # Copy S-00 Architecture
   cp sdd-template/templates/S-00-architecture-template.md \
      specs/system/S-00-architecture.md

   # Copy S-01 UI/UX Design
   cp sdd-template/templates/S-01-uiux-design-template.md \
      specs/system/S-01-uiux-design.md

   # Copy S-02 Testing Strategy
   cp sdd-template/templates/S-02-testing-strategy-template.md \
      specs/system/S-02-testing-strategy.md
   ```

3. **Copy optional templates as needed**:
   ```bash
   # If project has database
   cp sdd-template/templates/S-03-database-schema-template.md \
      specs/system/S-03-database-schema.md

   # For each feature
   cp sdd-template/templates/F-XX-feature-template.md \
      specs/features/F-01-database-auth.md
   ```

4. **Fill in placeholders**:
   - Replace `[Project Name]` with your project name
   - Replace `[Module Name]` with specific module name
   - Replace `[Feature Name]` with specific feature name
   - Update dates (`YYYY-MM-DD`)
   - Fill in all content sections

---

### Option B: Use with AI Tools

**Give AI the template file + your context:**

**Example Prompt for S-00**:
```
I'm starting a new project. Use the template from
sdd-template/templates/S-00-architecture-template.md

Project Context:
- Name: TaskFlow
- Type: Web application (Next.js + Supabase)
- Purpose: Team task management with AI assistance
- Users: Small teams (5-20 people)
- Key features: Tasks, Projects, AI suggestions, Reports

Please generate specs/system/S-00-architecture.md with:
- Complete tech stack section (use Next.js 14, Supabase, OpenAI)
- Design principles relevant to team collaboration
- Key decision: Why Supabase over Firebase
- Security considerations for team data
- Scalability plan for 100+ teams
```

**Example Prompt for S-01**:
```
Use the template from sdd-template/templates/S-01-uiux-design-template.md

Project Context:
- Type: Mobile app (React Native)
- Target Users: Fitness enthusiasts, age 18-35
- Usage Scenarios:
  - Gym environment (bright lighting, sweaty hands)
  - Outdoor running (bright sunlight)
  - Quick logging between sets (<5 seconds)

Design Inspiration: Linear.app (clean, minimal)

Please generate specs/system/S-01-uiux-design.md using Mode A
(self-contained design tokens). Consider:
- Large touch targets for gym environment
- High contrast for outdoor readability
- Quick interaction patterns
- Dark mode for indoor workouts
```

**Example Prompt for Features**:
```
Use the template from sdd-template/templates/F-XX-feature-template.md

Feature: Task Assignment (F-05)

Dependencies:
- F-01: Database & Authentication
- F-03: Task Management
- S-01: UI/UX Design
- S-03: Database Schema

Requirements:
- Users can assign tasks to team members
- Email notification when assigned
- Assignee can accept/reject assignment
- Show assigned tasks in dashboard

Please generate complete F-05-task-assignment.md with:
- User stories for assigner and assignee
- User flow diagram
- API endpoints (assign, accept, reject)
- Database changes (assignee_id column, assignments table)
- Complete E2E test scenario
```

---

## 📋 Template Checklist for New Projects

Use this checklist when starting a new project:

### Phase 1: Mandatory Foundation (Always Required)
- [ ] Copy S-00-architecture-template.md → `specs/system/S-00-architecture.md`
- [ ] Copy S-01-uiux-design-template.md → `specs/system/S-01-uiux-design.md`
- [ ] Copy S-02-testing-strategy-template.md → `specs/system/S-02-testing-strategy.md`
- [ ] Fill in S-00: Tech stack, design principles, architecture diagram
- [ ] Fill in S-01: Design tokens OR external Figma reference
- [ ] Fill in S-02: Test pyramid, frameworks, critical paths

### Phase 2: Project-Specific System Modules (If Applicable)
- [ ] If database needed: Copy S-03-database-schema-template.md → `specs/system/S-03-database-schema.md`
- [ ] If authentication needed: Create `S-04-authentication.md` (use S-XX general pattern)
- [ ] If API patterns needed: Create `S-05-api-architecture.md`
- [ ] Fill in all project-specific modules

### Phase 3: Feature Specifications
- [ ] Copy F-XX-feature-template.md → `specs/features/F-01-database-auth.md`
- [ ] Create F-02, F-03, F-04... for each feature
- [ ] Fill in PRD section (user stories, flows, acceptance criteria)
- [ ] Fill in Technical Implementation (API, database, frontend)
- [ ] Fill in Tests section (Tier 1, 2, 3)

### Phase 4: Documentation
- [ ] Create `specs/README.md` (use template from SDD-TEMPLATE-PROMPT.md)
- [ ] Create root `README.md` (use template from SDD-TEMPLATE-PROMPT.md)
- [ ] Update feature index table in `specs/README.md`
- [ ] Add dependency graph (Mermaid) in `specs/README.md`

---

## 🎯 Which Template for Which File?

| File Path | Template to Use | Required? |
|-----------|-----------------|-----------|
| `specs/system/S-00-architecture.md` | S-00-architecture-template.md | ✅ ALWAYS |
| `specs/system/S-01-uiux-design.md` | S-01-uiux-design-template.md | ✅ ALWAYS |
| `specs/system/S-02-testing-strategy.md` | S-02-testing-strategy-template.md | ✅ ALWAYS |
| `specs/system/S-03-database-schema.md` | S-03-database-schema-template.md | If database |
| `specs/system/S-04-authentication.md` | (Use general S-XX pattern) | If auth needed |
| `specs/system/S-05+*.md` | (Use general S-XX pattern) | Project-specific |
| `specs/features/F-01-*.md` | F-XX-feature-template.md | ✅ Core infra |
| `specs/features/F-02+*.md` | F-XX-feature-template.md | All features |
| `specs/README.md` | Template 4 from SDD-TEMPLATE-PROMPT.md | ✅ ALWAYS |
| `README.md` (root) | Template 3 from SDD-TEMPLATE-PROMPT.md | ✅ ALWAYS |

---

## 🔄 Adapting Templates to Project Types

### Web/Mobile Apps
**Use all templates as-is**:
- S-00: Full tech stack (frontend + backend)
- S-01: Complete UI design system (Mode A or B)
- S-02: E2E (Playwright) + Integration + Unit
- S-03: Database schema (PostgreSQL/Supabase)
- F-XX: User flows with UI mockups

### CLI Tools
**Adapt templates**:
- S-00: CLI architecture, command structure
- S-01: **Terminal UI design** (colors, spinners, progress bars, help text formatting)
- S-02: Integration tests (command execution) + Unit tests
- S-03: Local storage (SQLite) OR skip if no persistence
- F-XX: Each command = one feature (e.g., F-01-install, F-02-update)

### Component Libraries
**Adapt templates**:
- S-00: Component architecture, build system
- S-01: **Design tokens only** (CSS variables, theming, dark mode)
- S-02: Storybook + Jest + Accessibility tests
- S-03: Skip (no database)
- F-XX: Each component = one feature (e.g., F-01-button, F-02-input)

### Backend/Data Pipelines
**Adapt templates**:
- S-00: Pipeline architecture, data flow
- S-01: **Placeholder only** ("No UI currently. Reserved for future monitoring dashboards.")
- S-02: Data quality tests (Great Expectations) + Integration tests
- S-03: Data warehouse schema (Snowflake/BigQuery)
- F-XX: Each pipeline/transformation = one feature

### API Services
**Adapt templates**:
- S-00: API architecture, microservices diagram
- S-01: **API documentation design standards** (OpenAPI formatting, response patterns)
- S-02: Integration tests (endpoint testing) + Contract tests
- S-03: Database schema OR skip if stateless
- F-XX: Each endpoint group = one feature

---

## 💡 Template Customization Tips

### Adding Custom Sections to S-00

**For Microservices Architecture**:
```markdown
## Microservices Architecture

### Service 1: User Service
- Responsibilities: User CRUD, authentication
- Tech Stack: Node.js + Express
- Database: PostgreSQL (users table)
- Communication: REST API + RabbitMQ events

### Service 2: Order Service
- Responsibilities: Order management, payments
- Tech Stack: Python + FastAPI
- Database: PostgreSQL (orders table)
- Communication: gRPC + Kafka events
```

**For Mobile Apps (Add Platform Details)**:
```markdown
## Platform-Specific Considerations

### iOS
- Minimum Version: iOS 15.0
- Target Devices: iPhone, iPad
- Special Features: Face ID, Push Notifications (APNs)
- Distribution: TestFlight → App Store

### Android
- Minimum SDK: API 26 (Android 8.0)
- Target Devices: Phones (5"-7"), Tablets (8"+)
- Special Features: Fingerprint, Push Notifications (FCM)
- Distribution: Internal Testing → Google Play
```

### Adding Custom Sections to S-01

**For Responsive Design**:
```markdown
## Responsive Breakpoints

### Mobile (< 640px)
- Base font size: 16px
- Layout: Single column
- Navigation: Bottom tab bar
- Touch targets: 48px minimum

### Tablet (640px - 1024px)
- Base font size: 16px
- Layout: 2-column grid
- Navigation: Side drawer
- Touch targets: 44px minimum

### Desktop (> 1024px)
- Base font size: 14px
- Layout: 3-column grid
- Navigation: Top nav + sidebar
- Click targets: 32px minimum
```

**For Animation Guidelines**:
```markdown
## Motion Design

### Animation Principles
- **Duration**: 200ms (fast), 300ms (standard), 500ms (slow)
- **Easing**: ease-out (entrances), ease-in (exits), ease-in-out (transitions)
- **Reduce Motion**: Respect `prefers-reduced-motion` media query

### Common Animations
- **Button Hover**: Scale 1.05, duration 200ms
- **Modal Enter**: Fade in + slide up, duration 300ms
- **Page Transition**: Fade, duration 200ms
```

### Adding Custom Sections to F-XX

**For AI-Powered Features**:
```markdown
## AI Prompts

### System Prompt
```
You are a helpful task management assistant. Help users:
1. Break down large tasks into subtasks
2. Estimate task duration based on complexity
3. Suggest task prioritization using Eisenhower matrix
```

### User Prompt Template
```
Task: {task_title}
Description: {task_description}
Context: {user_context}

Please suggest 3-5 actionable subtasks.
```

### Fallback Behavior
- If API fails: Show cached suggestions from previous similar task
- If no cache: Show generic subtasks ("Research", "Plan", "Execute", "Review")
```

---

## 📚 Related Documentation

- **[SDD-TEMPLATE-PROMPT.md](../playbook/SDD-TEMPLATE-PROMPT.md)**: Complete AI prompt for generating all specs
- **[SDD-WORKFLOW-EXAMPLE.md](../playbook/SDD-WORKFLOW-EXAMPLE.md)**: Full example of Task Manager project
- **[SDD-QUICK-REFERENCE.md](../playbook/SDD-QUICK-REFERENCE.md)**: 1-page cheat sheet
- **[AI-USAGE-GUIDE.md](../playbook/AI-USAGE-GUIDE.md)**: How to guide AI tools to use these templates
- **[examples/sample-project-conversion.md](../examples/sample-project-conversion.md)**: 5 project type examples

---

## 🎓 Learning Path

**New to SDD?**

1. **Start here**: Read [SDD-QUICK-REFERENCE.md](../playbook/SDD-QUICK-REFERENCE.md) (5 minutes)
2. **See it in action**: Read [SDD-WORKFLOW-EXAMPLE.md](../playbook/SDD-WORKFLOW-EXAMPLE.md) (20 minutes)
3. **Try it yourself**: Use templates with AI ([AI-USAGE-GUIDE.md](../playbook/AI-USAGE-GUIDE.md))
4. **Deep dive**: Read [SDD-TEMPLATE-PROMPT.md](../playbook/SDD-TEMPLATE-PROMPT.md) (full methodology)

**Using AI to Generate Specs?**

1. Read [AI-USAGE-GUIDE.md](../playbook/AI-USAGE-GUIDE.md) first (must-read!)
2. Copy [SDD-TEMPLATE-PROMPT.md](../playbook/SDD-TEMPLATE-PROMPT.md) to your AI tool
3. Follow the 3-step quick start guide
4. Review AI output against quality checklist

---

## ✅ Quality Checklist

Before considering a spec complete:

**S-00 Architecture**:
- [ ] Tech stack completely specified (framework versions, hosting)
- [ ] Architecture diagram shows all major components
- [ ] At least 2 design principles with rationale
- [ ] At least 1 key architectural decision documented
- [ ] Security section addresses auth, data protection, compliance

**S-01 UI/UX Design**:
- [ ] Platform strategy defined (web, mobile, CLI, backend placeholder)
- [ ] Target users and usage scenarios documented
- [ ] Mode A: All design tokens defined (colors, typography, spacing, shadows)
- [ ] Mode B: External design system linked + AI supplements added
- [ ] Dark mode addressed (full implementation OR "not applicable")
- [ ] Accessibility standards specified (WCAG level, keyboard nav)
- [ ] Design rationale explains WHY choices fit users/scenarios

**S-02 Testing Strategy**:
- [ ] Test pyramid shows all three tiers (E2E, Integration, Unit)
- [ ] At least 5 critical path E2E tests identified
- [ ] Testing frameworks specified for each tier
- [ ] CI/CD integration defined (pre-commit, PR checks, deployment gates)
- [ ] Coverage targets set (overall, critical paths, business logic)

**S-03 Database Schema** (if applicable):
- [ ] ERD diagram shows all tables and relationships
- [ ] All tables have CREATE TABLE statements
- [ ] Indexes defined for performance-critical queries
- [ ] RLS policies defined (for Supabase/PostgreSQL)
- [ ] Migration strategy documented

**F-XX Feature Spec**:
- [ ] Dependencies section lists all required S-XX and F-XX
- [ ] At least 1 user story in PRD section
- [ ] User flow documented (text OR diagram)
- [ ] Acceptance criteria clear and testable
- [ ] API endpoints documented (request/response)
- [ ] Database changes specified (if any)
- [ ] Frontend components listed (if UI feature)
- [ ] Tests section has all three tiers (E2E, Integration, Unit)

---

**Version**: 2.0
**Last Updated**: 2025-11-28
**Changelog**:
- **2.0** (2025-11-28): Complete rewrite with standalone template files (S-00, S-01, S-02, S-03, F-XX)
- **1.0** (2025-11-27): Initial version referencing inline templates in SDD-TEMPLATE-PROMPT.md
