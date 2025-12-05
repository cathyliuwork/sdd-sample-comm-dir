# Sample Project Conversions

**Examples of applying SDD to different project types**

---

## Example 1: SaaS Application (Team Collaboration Tool)

### Project Input

```markdown
Project Name: TeamChat

Project Description: A real-time team collaboration platform that enables distributed teams to communicate through organized channels, direct messages, and file sharing with persistent conversation history.

Problem: Remote teams struggle with fragmented communication across email, messaging apps, and file sharing services, leading to lost context and decreased productivity.

Solution: Unified collaboration hub with real-time messaging, organized channels, persistent history, and integrated file sharing to centralize team communication.

Target Users:
- Remote and distributed teams (5-500+ people)
- Engineering teams
- Marketing and creative teams
- Enterprise organizations needing self-hosted options

Usage Scenarios:
- Work hours: Constant background presence (8+ hours/day) for real-time collaboration
- Quick messages: 30-second rapid exchanges throughout the day
- File sharing: 2-3 times daily when sharing work materials
- Status checks: Glancing at presence indicators every 10-15 minutes

Core Features (MVP):
  1. Workspace management and member invitations
  2. Public and private channels
  3. Direct messaging (1-on-1 and groups)
  4. Message threading for organized conversations
  5. File sharing and preview
  6. Full-text message search
  7. Real-time notifications (push + email)
  8. User presence indicators (online/offline/away)
  9. Message reactions (emoji)
  10. User profiles and status

Key Business Logic:
- Message threading algorithm: Auto-link replies to parent messages based on @mentions and reply context
- Presence logic: User marked "away" after 5 minutes of inactivity, "offline" after 30 minutes
- Notification rules: @mentions always notify, @channel only during working hours (9am-6pm user timezone)

UI Product Format: Responsive web app

UI Design: Modern, professional interface inspired by Slack and Discord - clean typography, organized left sidebar for navigation, right panel for details/settings. Focus on readability for all-day use in corporate environments.

Tech Stack:
  - Frontend: React + TypeScript
  - Backend: Node.js + Express
  - Database: PostgreSQL
  - Real-time: Socket.io
  - File Storage: AWS S3
  - Auth: JWT + OAuth2
  - LLM: None (no AI features in MVP)

Deployment: Docker + Kubernetes (self-hosted option for enterprise customers)
```

### SDD Output Structure

```
specs/
├── system/
│   ├── S-00-architecture.md        # System overview
│   ├── S-01-uiux-design.md         # Design system (colors, typography, components)
│   ├── S-02-testing-strategy.md    # E2E + Integration
│   ├── S-03-database-schema.md     # PostgreSQL schema + indexes
│   ├── S-04-authentication.md      # JWT + OAuth
│   ├── S-05-realtime-messaging.md  # Socket.io architecture
│   └── S-06-file-storage.md        # S3 integration
│
└── features/
    ├── F-01-database-auth.md           # Core infrastructure
    ├── F-02-workspaces.md              # Workspace management
    ├── F-03-channels.md                # Channel CRUD
    ├── F-04-direct-messages.md         # 1-on-1 and group DMs
    ├── F-05-message-thread.md          # Threaded conversations
    ├── F-06-file-upload.md             # File sharing
    ├── F-07-search.md                  # Full-text search
    ├── F-08-notifications.md           # Push + email notifications
    ├── F-09-user-presence.md           # Online/offline status
    └── F-10-emoji-reactions.md         # Message reactions
```

**Key Decisions**:
- S-01 (UI/UX Design) defines visual language for all features with UI
- S-05 (Realtime) as system module because used by F-03, F-04, F-09
- F-05 (Threads) separate from F-03 (Channels) due to complexity
- 10 features, 7 system modules = 17 files total

---

## Example 2: CLI Tool (Package Manager)

### Project Input

```markdown
Project Name: pkgmgr

Project Description: A fast, lightweight package manager CLI tool for installing, updating, and managing software dependencies with automatic version resolution.

Problem: Developers need a performant alternative to existing package managers with better speed, simpler dependency resolution, and smaller resource footprint.

Solution: CLI tool built in Go for speed and minimal overhead, with intuitive commands and smart dependency resolution that handles version conflicts automatically.

Target Users:
- Developers using Unix-like systems (Linux, macOS)
- Systems with limited resources (embedded systems, containers)
- Teams standardizing on lightweight tooling

Core Features (MVP):
  1. Install packages from registry
  2. Update packages (all or specific versions)
  3. Uninstall packages and clean dependencies
  4. Search registry for available packages
  5. List installed packages with versions
  6. Initialize project configuration (create lock file)
  7. Lock file generation for reproducible installs
  8. Dependency graph resolution and conflict detection

UI Product Format: CLI (command-line interface)

UI Design: Clean terminal output with color-coded messages (green for success, red for errors, yellow for warnings). Progress bars for downloads, clear error messages with helpful suggestions. Unix philosophy: simple, composable tools.

Tech Stack:
  - Language: Go (for performance and single binary distribution)
  - Local Storage: SQLite for metadata caching
  - Registry: REST API integration with package repository
  - Distribution: Single binary for Linux, macOS, Windows
  - Testing: Go's testing framework + integration tests
```

### SDD Output Structure

```
specs/
├── system/
│   ├── S-00-architecture.md        # CLI architecture
│   ├── S-01-uiux-design.md         # Terminal UI design (colors, formatting, help text)
│   ├── S-02-testing-strategy.md    # Integration + unit tests
│   ├── S-03-package-registry.md    # Registry API + caching
│   └── S-04-dependency-resolution.md  # Graph resolution algorithm
│
└── features/
    ├── F-01-install-command.md         # `pkg install <name>`
    ├── F-02-update-command.md          # `pkg update [name]`
    ├── F-03-uninstall-command.md       # `pkg uninstall <name>`
    ├── F-04-search-command.md          # `pkg search <query>`
    ├── F-05-list-command.md            # `pkg list`
    ├── F-06-init-command.md            # `pkg init` (create config)
    └── F-07-version-locking.md         # Lock file management
```

**Key Decisions**:
- S-01 (UI/UX Design) defines terminal UI patterns (colors, spinners, progress bars, help formatting)
- Simplified structure (solo dev, 7 features, 5 system modules)
- Each command = one feature (clear boundaries)
- S-04 (Dependency Resolution) is complex enough for system module
- No database feature (SQLite is internal implementation detail)

---

## Example 3: React Component Library

### Project Input

```markdown
Project Name: UIKit

Project Description: A comprehensive, production-ready React component library providing 20+ accessible, themeable components with TypeScript support and interactive documentation.

Problem: Development teams waste time building common UI components from scratch and struggle to maintain consistent design and accessibility across multiple projects.

Solution: Open-source component library with built-in accessibility (WCAG 2.1 AA), theming support (light/dark mode), TypeScript definitions, and interactive Storybook documentation to accelerate UI development.

Target Users:
- Frontend developers using React
- Design-conscious engineering teams
- Companies building design systems
- Open-source community

Core Features (MVP):
  1. 20+ core components (buttons, inputs, modals, dropdowns, tables, cards)
  2. Theme system with light/dark mode support
  3. Full TypeScript definitions with inferred prop types
  4. ARIA-compliant accessibility patterns (keyboard nav, screen readers)
  5. Interactive component documentation (Storybook)
  6. Tailwind CSS integration
  7. CSS variables for easy customization
  8. Responsive design patterns built-in
  9. Component composition patterns and best practices
  10. npm package publishing and versioning

UI Product Format: Component library (for React web apps)

UI Design: Design token system with customizable themes - neutral color palette by default, supports light/dark modes, follows WCAG 2.1 AA accessibility standards. Components designed for clarity and customization.

Tech Stack:
  - Framework: React 18 + TypeScript
  - Styling: Tailwind CSS
  - Documentation: Storybook
  - Testing: Jest + React Testing Library
  - Build: Vite
  - Package Management: npm registry
  - Accessibility Testing: axe-core
```

### SDD Output Structure

```
specs/
├── system/
│   ├── S-00-architecture.md        # Component architecture
│   ├── S-01-uiux-design.md         # Design tokens (colors, typography, spacing, shadows)
│   ├── S-02-testing-strategy.md    # Storybook + Jest + a11y tests
│   ├── S-03-accessibility.md       # ARIA patterns + keyboard nav
│   └── S-04-documentation.md       # API docs generation
│
└── features/
    ├── TEMPLATE.md                    # Template for new components
    ├── F-01-button.md                 # Button component
    ├── F-02-input.md                  # Input + variants
    ├── F-03-select.md                 # Dropdown select
    ├── F-04-modal.md                  # Dialog/modal
    ├── F-05-toast.md                  # Toast notifications
    ├── F-06-dropdown.md               # Dropdown menu
    ├── F-07-tooltip.md                # Tooltip
    ├── F-08-accordion.md              # Accordion/collapsible
    ├── F-09-tabs.md                   # Tab navigation
    ├── F-10-table.md                  # Data table
    ... (F-11 to F-20 for other components)
```

**Key Decisions**:
- S-01 (UI/UX Design) defines visual foundation as design tokens: CSS variables, dark mode, theming
- Each component = one feature (consistent structure)
- S-03 (Accessibility) as system module (all components must follow)
- TEMPLATE.md crucial for consistency across 20+ components
- PRD section describes component API, not user flow

---

## Example 4: Mobile App (Fitness Tracker)

### Project Input

```markdown
Project Name: FitHub

Project Description: A mobile fitness tracking app that helps users log workouts, track nutrition, visualize progress with charts, and connect with friends for community motivation and accountability.

Problem: Fitness enthusiasts struggle to maintain motivation and track comprehensive health data across multiple disconnected apps (workout apps, calorie trackers, social apps), leading to incomplete data and abandoned fitness goals.

Solution: All-in-one fitness platform combining workout logging, nutrition tracking, progress visualization, and social accountability features in one mobile app.

Target Users:
- Fitness enthusiasts (age 18-45)
- People training for specific goals (weight loss, muscle gain, endurance)
- Users seeking community motivation
- Health-conscious professionals

Usage Scenarios:
- Gym workouts: 1-2 minute quick logging between sets (sweaty hands, bright lighting, need large touch targets)
- Meal logging: 30-second quick entry after meals (3-5 times daily)
- Progress review: 5-10 minute weekly check-in to view charts and adjust goals
- Social browsing: 5-15 minute sessions scrolling friend activity and group challenges

Core Features (MVP):
  1. Workout logging (exercises, sets, reps, weight tracking)
  2. Pre-built workout templates (beginner, intermediate, advanced)
  3. Nutrition tracking (calories, macros, food database)
  4. Progress charts (weight, strength, metrics over time)
  5. Social activity feed (friends' workouts and achievements)
  6. Friend connections and workout sharing
  7. Group fitness challenges
  8. User profile and achievement badges
  9. Push notifications for motivation reminders
  10. Offline mode for gym tracking without connectivity

Key Business Logic:
- Workout intensity score: Calculate based on (weight × reps × sets) / body weight, track progression over time
- Friend activity ranking: Rank friends by weekly workout count, reset every Monday
- Challenge completion: Auto-verify when user logs required workouts within challenge timeframe
- Nutrition macro balance: Alert user if daily macros deviate >20% from target ratio (e.g., 40/30/30 carbs/protein/fat)

UI Product Format: Mobile app (iOS and Android via React Native)

UI Design: Modern fitness aesthetic with bold accent colors and high contrast for gym visibility (bright sunlight). Large touch targets for gloved hands, swipe gestures for quick actions, card-based layouts for easy scanning. Reference: Strava's clean data visualization + Strong's workout logging UX.

Tech Stack:
  - Mobile Framework: React Native + Expo
  - Backend: Supabase (PostgreSQL + Auth + Real-time + Storage)
  - API: GraphQL (Apollo)
  - Offline Support: Redux Persist + async queue
  - Push Notifications: Expo Push + FCM/APNs
  - Charts: Victory Native
  - LLM: OpenRouter (for personalized workout suggestions and nutrition advice)

Deployment: Expo EAS Build
```

### SDD Output Structure

```
specs/
├── system/
│   ├── S-00-architecture.md        # App architecture + navigation
│   ├── S-01-uiux-design.md         # Mobile design system (iOS/Android patterns)
│   ├── S-02-testing-strategy.md    # Detox E2E + Jest unit
│   ├── S-03-database-schema.md     # Supabase schema
│   ├── S-04-authentication.md      # Supabase Auth + social login
│   ├── S-05-offline-sync.md        # Offline-first + sync logic
│   ├── S-06-graphql-api.md         # GraphQL schema + resolvers
│   └── S-07-push-notifications.md  # FCM + APNs
│
└── features/
    ├── F-01-database-auth.md           # Core infrastructure
    ├── F-02-onboarding.md              # Welcome + profile setup
    ├── F-03-workout-logging.md         # Log exercises + sets/reps
    ├── F-04-workout-templates.md       # Save/reuse workout plans
    ├── F-05-nutrition-tracking.md      # Calorie + macro logging
    ├── F-06-progress-charts.md         # Weight, strength charts
    ├── F-07-social-feed.md             # Activity feed + likes
    ├── F-08-friend-system.md           # Add friends, see their workouts
    ├── F-09-challenges.md              # Group fitness challenges
    ├── F-10-profile-settings.md        # User preferences
    └── F-11-responsive-design.md       # Tablet + landscape support
```

**Key Decisions**:
- S-01 (UI/UX Design) defines mobile-specific patterns for iOS/Android
- S-05 (Offline Sync) critical for mobile (system module)
- S-07 (Push Notifications) used by F-07, F-08, F-09 (system module)
- F-07, F-08, F-09 depend on each other (social features cluster)
- PRD sections include screen mockups/wireframes

---

## Example 5: Data Pipeline (ETL System)

### Project Input

```markdown
Project Name: AnalyticsFlow

Project Description: An automated ETL data pipeline that ingests customer data from multiple sources, transforms it for analytics, and loads it into a cloud data warehouse with scheduling, validation, and monitoring.

Problem: Analytics teams manually extract data from various APIs (Salesforce, Stripe), spend hours on transformation, and lack data quality assurance, leading to inconsistent data quality, delayed insights, and unsustainable engineering overhead.

Solution: Automated pipeline orchestrated by Airflow that handles ingestion, transformation (dbt), data quality validation (Great Expectations), and warehouse loading on scheduled intervals with comprehensive alerting.

Target Users:
- Analytics teams
- Data engineers
- Finance/Business Intelligence teams
- Organizations needing reliable analytics data

Core Features (MVP):
  1. Salesforce CRM data ingestion (daily syncs)
  2. Stripe billing data ingestion (hourly syncs)
  3. Data transformation layer (raw → staging → marts using dbt)
  4. Customer 360 unified view (merged customer data from all sources)
  5. Revenue metrics computations (MRR, ARR, churn, LTV)
  6. Data quality validation (automated checks for anomalies)
  7. Export to BI tools (Looker/Tableau data marts)
  8. Error alerting and monitoring (data quality failures, pipeline failures)

UI Product Format: Data pipeline (no user-facing UI)

UI Design: No graphical interface. Future monitoring dashboards may include Grafana for pipeline metrics visualization and Airflow UI for orchestration visibility. This slot is reserved for future monitoring/admin interfaces.

Tech Stack:
  - Orchestration: Apache Airflow (schedule and monitor DAGs)
  - Transformation: dbt (data build tool for SQL transformations)
  - Language: Python 3.10+ (custom operators and utilities)
  - Data Warehouse: Snowflake (target analytics database)
  - Staging Database: PostgreSQL (landing area for raw data)
  - Data Quality: Great Expectations (automated validation)
  - Monitoring: Grafana + Prometheus (pipeline metrics)
  - Deployment: Docker + Kubernetes (containerized execution)
```

### SDD Output Structure

```
specs/
├── system/
│   ├── S-00-architecture.md        # Pipeline architecture
│   ├── S-01-uiux-design.md         # No UI (reserved for future monitoring dashboards)
│   ├── S-02-testing-strategy.md    # Data tests + pipeline tests (Great Expectations)
│   ├── S-03-data-warehouse-schema.md  # Snowflake schema + tables
│   ├── S-04-orchestration.md       # Airflow DAG patterns
│   └── S-05-data-quality.md        # Validation + monitoring
│
└── features/
    ├── F-01-salesforce-ingestion.md    # Salesforce API → raw tables
    ├── F-02-stripe-ingestion.md        # Stripe API → raw tables
    ├── F-03-transformation-layer.md    # dbt models (raw → staging → marts)
    ├── F-04-customer-360-view.md       # Mart: unified customer data
    ├── F-05-revenue-metrics.md         # Mart: MRR, churn, LTV
    ├── F-06-dashboard-exports.md       # Export to BI tool (Looker/Tableau)
    ├── F-07-scheduling.md              # Airflow schedules + retries
    └── F-08-alerting.md                # Data quality alerts
```

**Key Decisions**:
- S-01 (UI/UX Design) is placeholder: "No UI currently. Reserved for future monitoring/BI dashboards"
  - **S-01 Content**: Uses placeholder template from S-01-uiux-design-template.md lines 36-80
  - **Actual Text**:
    ```markdown
    # S-01: UI/UX Design System

    ## Platform & Device Strategy
    **Primary Platform**: Data Pipeline (No UI currently)

    ## Design System Source
    **Status**: No user-facing graphical interface at this time.

    **Future Considerations**:
    This S-01 placeholder reserves specification slot for:
    - Monitoring dashboards (Grafana for pipeline metrics)
    - Admin interfaces (Airflow UI customization)
    - Data visualization (Looker/Tableau export design standards)

    **When UI needs arise**: Expand using Mode A or Mode B.

    ## Related Documents
    - S-00: Architecture - Data pipeline architecture
    - S-02: Testing Strategy - Data quality gates (Great Expectations)
    - S-03: Data Warehouse Schema - Snowflake schema design
    ```
- S-02 (Testing Strategy) upfront - data quality is critical for pipelines
- Each data source = one feature (F-01, F-02)
- Each mart/report = one feature (F-04, F-05)
- S-05 (Data Quality) shared validation rules
- PRD section describes data contracts, not user flows
- Tech section includes SQL queries, not API endpoints

---

## Common Patterns Across Examples

### Pattern 1: Core Infrastructure Always F-01

All examples have F-01 as foundation:
- **SaaS**: Database + Auth
- **CLI**: Registry + Local Storage
- **Library**: Core architecture
- **Mobile**: Database + Auth
- **Data**: First data source ingestion

### Pattern 2: System Modules for Cross-Cutting Concerns

| Concern | System Module | Used By |
|---------|---------------|---------|
| UI/UX Design | S-01 (ALWAYS) | ALL projects (content varies by type) |
| Testing Strategy | S-02 (ALWAYS) | ALL projects without exception |
| Authentication | S-04 | All user-facing features |
| Realtime | S-05+ | Messaging, presence, notifications |
| Offline Sync | S-05+ | All mobile CRUD features |
| Data Quality | S-04+ | All data pipeline features |

### Pattern 3: Feature Grouping

Features naturally cluster:
- **SaaS**: Messaging cluster (channels, DMs, threads)
- **CLI**: Command cluster (install, update, uninstall)
- **Library**: Component categories (inputs, overlays, navigation)
- **Mobile**: Social cluster (feed, friends, challenges)
- **Data**: Source cluster (Salesforce, Stripe, etc.)

---

## Scaling Patterns

### Small Project (<10 features)

```
specs/
├── system/ (5 files minimum)
│   ├── S-00-architecture.md
│   ├── S-01-uiux-design.md         # ALWAYS present
│   ├── S-02-testing.md             # ALWAYS present
│   ├── S-03-database.md
│   └── S-04-auth.md
└── features/ (5-8 files)
    ├── F-01 through F-08
```

**Characteristics**:
- Minimal system modules (5: S-00, S-01, S-02 mandatory + 2-3 project-specific)
- Flat feature structure
- Simple dependency graph

---

### Medium Project (10-20 features)

```
specs/
├── system/ (6-7 files)
│   ├── S-00-architecture.md
│   ├── S-01-uiux-design.md
│   ├── S-02-testing.md
│   ├── S-03-database.md
│   ├── S-04-auth.md
│   ├── S-05-api-patterns.md
│   └── S-06-state-management.md
└── features/ (12-18 files)
    ├── F-01 through F-18
```

**Characteristics**:
- Standard SDD structure (6-7 system modules)
- Some feature clustering in dependency graph
- Clear implementation waves (3-5 waves)

---

### Large Project (>20 features)

```
specs/
├── system/ (7-9 files)
└── features/
    ├── core/
    │   ├── F-01-database.md
    │   ├── F-02-auth.md
    │   └── F-03-dashboard.md
    ├── commerce/
    │   ├── F-10-products.md
    │   ├── F-11-cart.md
    │   └── F-12-checkout.md
    ├── social/
    │   ├── F-20-feed.md
    │   └── F-21-comments.md
    └── admin/
        ├── F-30-users.md
        └── F-31-analytics.md
```

**Characteristics**:
- Features grouped by domain
- More system modules (7-9)
- Complex dependency graph
- Implementation waves per domain

---

## Adaptation Checklist

When adapting SDD to your project, prepare structured project information:

**Project Definition** (required):
- [ ] Write Project Name (short identifier)
- [ ] Write Project Description (1-2 sentences capturing essence)
- [ ] Define UI Product Format (optional - web app, mobile app, responsive web, CLI, data pipeline, desktop app, browser extension, other; default: responsive web if not specified)
- [ ] List Target Users (who will use this?)
- [ ] List Core Features (5-10 MVP features)
- [ ] Define Tech Stack (or note "use suggested stack")

**Project Context** (optional but recommended):
- [ ] Describe Problem (what problem does this solve?)
- [ ] Describe Solution (how does this solve the problem?)
- [ ] Describe Usage Scenarios (when, where, and how often users engage - highly recommended for UI design decisions)
- [ ] Describe UI Design (text description, reference designs, or Figma link) - only if applicable to UI Product Format

**Architecture Planning** (then adapt to your project type):
- [ ] Identify cross-cutting concerns → system modules (S-01 always required, S-02 always required, then project-specific)
- [ ] Adapt S-01 based on UI Product Format:
  - **Web/Mobile Apps**: Full UI design system
  - **CLI Tools**: Terminal UI design
  - **Component Libraries**: Design tokens and theming
  - **Data Pipelines**: Placeholder (no UI)
  - **APIs**: API documentation design standards
- [ ] Decide on feature granularity (one screen? one endpoint? one component? one command?)
- [ ] Map dependencies (what needs what?)
- [ ] Choose structure: flat (small <10 features) vs grouped (large >20 features)
- [ ] Adapt template sections to your domain
  - **App**: User flows in PRD, API endpoints in Technical
  - **Library**: Component API in PRD, props/composition in Technical
  - **CLI**: Command syntax in PRD, algorithms in Technical
  - **Data**: Data contracts in PRD, SQL/transformations in Technical

---

## Summary

SDD works for diverse project types:

| Project Type | Key Adaptation |
|-------------|----------------|
| **SaaS/Web App** | User flows in PRD, API endpoints in Tech |
| **CLI Tool** | Command syntax in PRD, algorithms in Tech |
| **Component Library** | Component API in PRD, props/composition in Tech |
| **Mobile App** | Screen flows + navigation, offline sync |
| **Data Pipeline** | Data contracts in PRD, SQL/transformations in Tech |

**Core principle remains**: Modular specs, explicit dependencies, complete test coverage.

---

**For more examples, see [SDD-WORKFLOW-EXAMPLE.md](../playbook/SDD-WORKFLOW-EXAMPLE.md) for a complete walkthrough.**
