# AI Coding Tool Usage Guide

**How to Guide AI to Generate Specs Using SDD Templates**

**[中文版 Chinese Version](./AI-USAGE-GUIDE-ZH.md)**

---

## 🎯 Quick Start: 3 Steps to Complete Specs

### Step 1: Prepare Project Information

Before starting, gather the following information:

```markdown
Project Name: [Your project name]
Project Description: [1-2 sentences that capture the essence of your product]
Problem: [Optional - What problem does this solve?]
Solution: [Optional - How does this solve the problem?]
Target Users: [Who will use this product]
Usage Scenarios: [Optional - When, where, and how often users engage with the product]
Core Features: [List 5-10 MVP features]
Key Business Logic: [Optional - Pre-defined workflows, business rules, or tested AI prompts that should be prioritized during design]
UI Product Format: [Optional - web app, mobile app, responsive web, CLI, data pipeline, desktop app, browser extension, other. Default: responsive web if not specified]
UI Design: [Optional - Text description, reference designs (screenshots), or professional design specs (Figma/Sketch)]
Tech Stack:
  - Frontend: [Framework + Version]
  - Backend: [Framework + Version]
  - Database: [Type + Version]
  - LLM: [Optional - OpenRouter (default) | Claude API | OpenAI API | None]
  - Note: If uncertain, mention "use suggested stack" for proven technology recommendations
Deployment: [Optional - Platform name + optional documentation link; if not specified, AI will suggest based on tech stack]
```

**Example**:
```markdown
Project Name: BookClub - Online Reading Community
Project Description: An online platform for book lovers to create and join book clubs, share reading notes, and discuss books together.
Problem: Book enthusiasts struggle to find reading communities and coordinate discussions without scattered tools
Solution: Centralized platform that brings together book club creation, reading notes, and community discussions
Target Users: Book enthusiasts, book club organizers, corporate reading club administrators
Usage Scenarios:
  - Desktop: 30-60 minute focused reading and discussion sessions in the evening
  - Mobile: 5-10 minute quick check-ins during commute to read updates and reply to discussions
Core Features:
  - Create and join book clubs
  - Publish reading notes with Markdown support
  - Discussion forum organized by chapters
  - Reading progress tracking and checkpoints
  - Personalized book recommendations
Key Business Logic: Users can set reading pace (e.g., 1 chapter per week), and the system auto-generates milestone reminders based on book length and schedule
UI Product Format: Responsive web app (desktop + mobile)
UI Design: Modern, clean design inspired by Linear.app and Notion. Reference designs saved in /design-inspiration/
Tech Stack:
  - Frontend: Next.js 14, React 18, Tailwind CSS
  - Backend: Next.js API Routes, Prisma ORM
  - Database: PostgreSQL (via Supabase)
  - LLM: OpenRouter (for AI book recommendations based on reading history)
Deployment: Vercel + Supabase Cloud
```

---

### Step 2: Copy the Complete Prompt

Open [SDD-TEMPLATE-PROMPT.md](./SDD-TEMPLATE-PROMPT.md) and **copy the entire content** (~12,000 words).

---

### Step 3: Give Instructions to AI

Open your AI coding tool (Claude, Cursor, Windsurf, GPT, etc.) and paste the following complete prompt:

```markdown
[Paste the complete content of SDD-TEMPLATE-PROMPT.md]

---

Now, use the SDD template system above to generate complete specification documents for my project.

## My Project Information

Project Name: BookClub - Online Reading Community

Project Description: A centralized platform that brings together book lovers through club creation, reading notes, and community discussions.

Problem: Book enthusiasts struggle to find reading communities and coordinate discussions without using scattered tools like Slack, Google Docs, and Excel.

Solution: Single platform that unifies book club creation, note-taking with Markdown support, and organized chapter-based discussions.

Target Users:
- Book enthusiasts (individuals)
- Book club organizers (group leaders)
- Corporate reading club administrators

Usage Scenarios:
- Desktop: Evening reading sessions (30-60 minutes) with deep focus on discussions and note-taking
- Mobile: Morning/evening commute (5-10 minutes) for quick updates, marking progress, and brief replies
- Frequency: Daily engagement for active readers, 2-3 times per week for casual members

Core Features (MVP):
1. User registration and login (email + password)
2. Create book clubs (set books, start/end dates, reading schedule)
3. Join book clubs (public/private clubs)
4. Publish reading notes (Markdown support)
5. Discussion forum (grouped by chapters)
6. Reading progress tracking (check-in)
7. Personal profile (my notes, my clubs)
8. Book recommendations (based on interest tags)

Key Business Logic:
- Reading pace algorithm: Auto-calculate chapter deadlines based on total chapters, start date, end date
- Reminder system: Send notifications 1 day before chapter deadline if user hasn't marked progress
- Book recommendation engine: Uses OpenRouter to analyze user's completed books and suggest similar titles

UI Product Format: Responsive web app (desktop browser 8+ hours daily, mobile for quick checks)

UI Design: Modern, clean interface inspired by Linear (minimalist) and Notion (typography). Need high contrast for comfortable reading on screens.

Tech Stack:
  - Frontend: Next.js 14, React 18, Tailwind CSS
  - Backend: Next.js API Routes, Prisma ORM
  - Database: PostgreSQL (via Supabase)
  - Authentication: Supabase Auth
  - LLM: OpenRouter (for AI book recommendations)

Deployment: Vercel + Supabase Cloud

## Please Execute the Following Steps

**Phase 1-4: Planning Stage**
1. Analyze my project and complete Phase 1-4 (Requirements → System Design → Feature Decomposition → Dependency Graph)
2. Output for my review:
   - Project analysis results
   - System Modules list (S-XX files)
   - Features list (F-XX files)
   - Dependency graph (Mermaid)
   - Implementation waves

**Wait for my confirmation before proceeding to Phase 5**

I will tell you: "Confirmed, please proceed with Phase 5"

**Phase 5: File Generation**
3. Generate all spec files:
   - README.md (root directory)
   - specs/README.md (navigation file)
   - specs/system/S-00-architecture.md
   - specs/system/S-01-*.md (all system modules)
   - specs/features/F-01-*.md (all features)
   - specs/features/TEMPLATE.md

4. Each file must be complete with all required sections

## Important Requirements

- Use the complete SDD template structure
- All dependencies must be correct
- Generate Mermaid dependency graphs
- Each Feature must include: Dependencies, PRD, Technical Implementation, Tests, Notes
- Each System Module must include: Dependencies, Architecture, Technical Implementation

Now start with Phase 1, please analyze my project.
```

---

## 📝 How AI Will Respond

### Phase 1-4: AI Outputs Planning

AI will analyze your project and output something like this:

```markdown
## Phase 1: Project Analysis Complete

**Project Name**: BookClub
**Features Identified**: 8 core features
**System Modules**: 5 modules

## Phase 2: System Design Planning

**System Modules (S-XX)**:
- S-00: System Architecture Overview
- S-01: UI/UX Design System (Mode A: Self-contained design tokens)
- S-02: Testing Strategy (E2E + Integration + Unit)
- S-03: Database Schema (PostgreSQL + Prisma)
- S-04: Authentication System (Supabase Auth)
- S-05: Markdown Editor Integration

## Phase 3: Feature Decomposition

| ID | Feature Name | Priority | Dependencies |
|----|-------------|----------|--------------|
| F-01 | Database & Auth | CRITICAL | None |
| F-02 | User Profiles | HIGH | F-01 |
| F-03 | Book Club CRUD | CRITICAL | F-01, F-02 |
| F-04 | Join/Leave Clubs | HIGH | F-01, F-03 |
| F-05 | Reading Notes CRUD | CRITICAL | F-01, F-03 |
| F-06 | Discussion Forum | HIGH | F-01, F-03 |
| F-07 | Reading Progress | MEDIUM | F-01, F-03 |
| F-08 | Book Recommendations | LOW | F-01, F-03 |

## Phase 4: Dependency Graph + Implementation Waves

[Mermaid dependency graph]

**Implementation Waves**:
- Wave 1: F-01
- Wave 2: F-02, F-03
- Wave 3: F-04, F-05, F-06
- Wave 4: F-07, F-08

Please confirm if this plan meets your requirements? I will generate all spec files after confirmation.
```

---

### Your Response: Confirm or Modify

**Option A: Direct Confirmation**
```
Looks good! Please proceed with Phase 5 and generate all spec files.
```

**Option B: Request Modifications**
```
Mostly good, but I have a few changes:

1. F-06 Discussion Forum should be CRITICAL priority, it's a core feature
2. Please add a new feature: F-09 Book Search (integrate Douban API)
3. S-03 Markdown Editor can be omitted, it's an implementation detail, doesn't need a separate system module

Please update the plan and then generate files.
```

**Option C: Major Adjustments**
```
The dependencies are incorrect:

- F-05 (Reading Notes) should depend on F-03 (Book Clubs), because notes must be linked to clubs
- F-06 (Discussion Forum) should also depend on F-03

Please fix the dependencies, regenerate the dependency graph and implementation waves.
```

---

### Phase 5: AI Generates All Files

After confirmation, AI will generate files one by one:

```markdown
## Generating files...

### 1. README.md (root directory)
[Complete content]

### 2. specs/README.md
[Complete content with Feature Index table + Mermaid dependency graph]

### 3. specs/system/S-00-architecture.md
[System architecture overview with tech stack, design principles, Mermaid architecture diagram]

### 4. specs/system/S-01-database-schema.md
[Complete Prisma schema + indexes + explanations]

### 5. specs/system/S-02-authentication.md
[Supabase Auth integration approach]

... (continue generating all files)

### Finally: specs/features/TEMPLATE.md
[Reusable feature template]

---

✅ All files generated!

Please review the generated specs. Let me know if you need any modifications.
```

---

## 🔧 Common Adjustment Scenarios

### Scenario 1: Add New Feature

**Your Instruction**:
```
Please add a new feature:

F-10: Achievement System
- Users earn badges after completing reading goals
- Display on personal profile
- Dependencies: F-01, F-07 (Reading Progress)
- Priority: LOW (V2.0)

Please update specs/README.md Feature Index, add F-10 to dependency graph,
and generate specs/features/F-10-achievements.md file.
```

---

### Scenario 2: Modify Feature PRD

**Your Instruction**:
```
I need to modify the PRD section of F-05 (Reading Notes):

Original user flow:
1. User clicks "Write Note"
2. Fill title and content
3. Save

Change to:
1. User clicks "Write Note" on book club page
2. Automatically links to current book club and book
3. Select chapter (from dropdown)
4. Fill title and content (Markdown support)
5. Optional: Public/Private
6. Save

Please update the PRD section of specs/features/F-05-reading-notes.md,
and also update the Technical Implementation section's API interface (need to add chapter_id and is_public fields).
```

---

### Scenario 3: Elaborate Technical Implementation

**Your Instruction**:
```
The Technical Implementation section of specs/features/F-03-book-club-crud.md is too brief.

Please expand the following:

1. **API Endpoints**:
   - Add complete TypeScript type definitions (Request/Response)
   - Add all error codes (400, 401, 403, 404, 500)
   - Add pagination parameters (GET /api/book-clubs?page=1&limit=20)

2. **Database Schema**:
   - Add complete Prisma schema
   - Add index optimization (book_clubs table needs owner_id + created_at index)
   - Add foreign key constraints

3. **Frontend Components**:
   - Add Props definitions for BookClubList, BookClubCard, CreateBookClubModal
   - Add state management explanation (using Zustand)

Please regenerate the Technical Implementation section of F-03.
```

---

### Scenario 4: Add Test Cases

**Your Instruction**:
```
The Tests section of F-03 lacks specific test code.

Please add:

1. **Tier 1 Critical Path Test**:
   - Complete E2E test code (Playwright)
   - Test scenario: Create club → Join club → Publish note

2. **Integration Tests**:
   - API integration tests (POST /api/book-clubs)
   - Test creation success, permission validation, input validation

3. **Unit Tests**:
   - BookClubCard component test (Jest + React Testing Library)
   - useBookClubStore hook test

Please add complete Tests section with actual code for F-03.
```

---

### Important: S-01 is ALWAYS Required

**All projects must have `S-01-uiux-design.md`**, even if they currently have no UI.

**Why?**
- Design standards apply to all project types (CLI has terminal UI, APIs have documentation design)
- Reserves the slot for future UI needs (monitoring dashboards, admin panels)
- Maintains consistent structure across all SDD projects

**Content varies by project type:**
- **Web/Mobile Apps**: Full UI design system (see Scenario 5a/5b below)
- **CLI Tools**: Terminal UI design (colors, spinners, progress bars, help text formatting)
- **Component Libraries**: Design tokens and theming (CSS variables, dark mode)
- **Backend/Data Pipelines**: Simple placeholder stating "No UI currently. Reserved for future monitoring/admin interface."
- **API Services**: API documentation design standards and response formatting patterns

Even if your project has no UI today, create S-01 as a placeholder. You can always expand it later when adding monitoring dashboards or admin interfaces.

---

### Scenario 5a: Add UI/UX Design (No Professional Designer)

**Context**: Your project has UI, but you don't have a professional designer. You have some design inspiration (screenshots, URLs, keywords like "modern", "minimalist").

**Your Instruction**:
```
I need to add UI/UX Design specifications for my project.

**Project Context**:
- Type: Web app (responsive)
- Target Users: Busy professionals, age 25-45, moderate tech proficiency
- Usage Scenarios:
  - Desktop (work environment, 8+ hours/day)
  - Mobile (commute, short sessions 5-10 minutes)
  - Need quick task entry and review

**Design Inspiration** (I'll provide references in origin/ folder):
- Screenshots from Linear.app (clean, minimal UI)
- Screenshots from Notion (comfortable typography)
- Keywords: Modern, Professional, Calming, Not too colorful

**Request**:
1. Create specs/system/S-01-uiux-design.md using Mode A (Self-Contained Design)
2. Analyze my design references from origin/design-inspiration/
3. Consider my target users (busy professionals) and usage scenarios (long desktop sessions + quick mobile checks)
4. Generate complete design tokens (colors, typography, spacing, shadows)
5. Include dark mode (important for long work hours)
6. Explain design rationale - WHY each decision fits my users and scenarios
7. Provide Tailwind CSS config (I'm using Tailwind)

Please generate S-01 with all design tokens defined inline as text/CSS variables.
```

**AI Response**:
```markdown
I've created specs/system/S-01-uiux-design.md for your task management app.

Key design decisions based on your users and context:

**Colors**:
- Primary: Blue-gray (#475569) - Professional, not distracting
  - Rationale: Busy professionals need focus, bright colors cause fatigue during 8+ hour sessions
- Neutral: Warm gray scale - Reduces eye strain
  - Rationale: Desktop users in long sessions need comfortable neutrals

**Typography**:
- Base: 16px (desktop), 18px (mobile)
  - Rationale: Age 25-45 group includes early presbyopia cases, larger mobile text for commute reading
- Headings: Inter (clean, professional)
- Body: System fonts (fast loading for quick mobile sessions)

**Spacing**:
- Desktop: Generous whitespace (24px base unit)
  - Rationale: Reduces cognitive load during long work sessions
- Mobile: Compact (16px base unit)
  - Rationale: Maximize content in short 5-10 minute sessions

**Dark Mode**:
- True dark (#0f172a) with reduced contrast
  - Rationale: Essential for 8+ hour desktop work, reduces eye strain

All design tokens are in the S-01 file as inline CSS variables (no external dependencies).
```

---

### Scenario 5b: Add UI/UX Design (Professional Designer Exists)

**Context**: Your designer has created a design system in Figma. You need to reference it in specs and have AI supplement any missing aspects.

**Your Instruction**:
```
I need to add UI/UX Design specifications for my project.

**Project Context**:
- Type: Mobile app (iOS + Android)
- Target Users: Fitness enthusiasts, age 18-35, high tech proficiency
- Usage Scenarios:
  - Gym environment (bright lighting, sweaty hands, need large touch targets)
  - Outdoor running (bright sunlight, need high contrast)
  - Quick logging between sets (need fast interaction)

**Professional Design**:
Our designer has created a complete design system:
- Figma URL: https://figma.com/file/abc123/fitness-tracker-design-system
- Design tokens defined (colors, typography, components)
- Mobile-first approach

**Request**:
1. Create specs/system/S-01-uiux-design.md using Mode B (External Reference)
2. Reference the Figma design system as the source of truth
3. Review the design against our target users (fitness enthusiasts) and scenarios (gym/outdoor)
4. Supplement any missing aspects:
   - Accessibility for gym environment (large touch targets, high contrast)
   - Outdoor readability (sunlight scenarios)
   - Quick interaction patterns (fast logging)
5. Add design rationale explaining WHY design decisions fit our usage scenarios
6. Include platform-specific considerations (iOS vs Android)

Please generate S-01 that references Figma but includes inline analysis and supplements.
```

**AI Response**:
```markdown
I've created specs/system/S-01-uiux-design.md for your fitness tracking app.

**Mode B: External Reference**

**Design System Source**: https://figma.com/file/abc123/fitness-tracker-design-system
- Primary colors, typography, component library defined in Figma
- All developers should reference Figma for latest design tokens

**Context-Based Supplements** (AI-generated based on usage scenarios):

**1. Gym Environment Adaptations**:
- Minimum touch target: 48px (iOS), 56px (Android)
  - Rationale: Sweaty hands need larger targets, users logging between sets
- High contrast mode: WCAG AAA (7:1 contrast)
  - Rationale: Bright gym lighting reduces screen readability

**2. Outdoor Running Adaptations**:
- Outdoor color palette: Vibrant primaries (#FF6B35, #004E89)
  - Rationale: High contrast needed for bright sunlight scenarios
- Large typography: Minimum 18px body, 32px headings
  - Rationale: Moving users (running) need readable text at glance

**3. Quick Interaction Patterns**:
- One-tap logging: Pre-fill common exercises
  - Rationale: Users between sets need <5 second logging
- Bottom sheet modals: Fast dismiss gestures
  - Rationale: Gym users hold phone one-handed

**Platform-Specific**:
- iOS: Native bottom tab bar (familiar to iOS users)
- Android: Floating action button (Material Design standard)

All Figma design tokens are referenced externally. Supplements above are inline for AI-generated extensions.
```

---

## 🎨 Advanced Techniques

### Technique 1: Batch Generation (Avoid Timeout)

If the project is large (>20 features), generating all at once may timeout.

**Your Instruction**:
```
The project is quite large, let's generate in batches:

**Batch 1**: Generate basic architecture first
- README.md (root directory)
- specs/README.md
- All files in specs/system/ directory (S-00 to S-04)

After completing Batch 1, I'll have you continue with features.
```

After Batch 1 completes:
```
Batch 1 complete. Now generate Batch 2:

**Batch 2**: Core features (Wave 1-2)
- specs/features/F-01-database-authentication.md
- specs/features/F-02-user-profiles.md
- specs/features/F-03-book-club-crud.md

After completion, I'll continue with the next batch.
```

---

### Technique 2: Reference Existing Project

**Your Instruction**:
```
My project is similar to Pocket Covey (both have conversation systems).

Please reference Pocket Covey's specs/features/F-04-conversation-engine.md
to generate F-06-discussion-forum.md for my project.

Keep the same structure and level of detail, but adapt content for book club discussion forum:
- Discussions grouped by chapter (not by habit)
- Support replies (nested comments)
- Support likes
- Support Markdown

Please generate F-06-discussion-forum.md.
```

---

### Technique 3: Request Mermaid Diagrams

**Your Instruction**:
```
The user flow for F-05 (Reading Notes) is complex, plain text isn't intuitive enough.

Please add the following Mermaid diagrams to F-05:

1. **Sequence Diagram**:
   - Show complete flow of user creating note
   - Include: Frontend → API → Database → Markdown rendering

2. **State Diagram**:
   - Note state transitions: draft → published → archived

3. **Entity Relationship Diagram (ERD)**:
   - Show relationship between notes table and book_clubs, users, chapters

Please update F-05's PRD and Technical Implementation sections with these diagrams.
```

---

### Technique 4: Adapt to Specific Framework

**Your Instruction**:
```
My project uses tRPC instead of REST API.

Please modify the Technical Implementation section of all features:

- Change REST API endpoints to tRPC procedures
- Use tRPC's type definition style
- Add input validation (using Zod)

Example format:
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

Please first update F-03 (Book Club CRUD). After I confirm the format, you can batch update other features.
```

---

## 📊 Complete Workflow Example

### Complete Conversation Example (Condensed)

**Round 1: You give AI complete prompt + project info**
```
[Paste complete SDD-TEMPLATE-PROMPT.md]

Now generate specs for my project: BookClub (Online Reading Community)...
[Detailed project information]

Please complete Phase 1-4 first.
```

**Round 2: AI outputs planning**
```
Phase 1-4 complete:
- 8 features
- 5 system modules
- Dependency graph
- 4 implementation waves

Please confirm.
```

**Round 3: You confirm or modify**
```
Confirmed! But please change F-06 to CRITICAL priority.

After confirmation, please proceed with Phase 5 and generate all files.
```

**Round 4: AI generates all files**
```
Generating...

1. README.md [Complete]
2. specs/README.md [Complete]
3. specs/system/S-00-architecture.md [Complete]
...
13. specs/features/F-08-book-recommendations.md [Complete]

✅ All files generated!
```

**Round 5: You fine-tune details**
```
Great! But I need to modify F-05's API design:

Please add chapter_id field in POST /api/notes Request.

Please only update F-05's Technical Implementation → API Endpoints section.
```

**Round 6: AI updates specific section**
```
F-05's API design updated, added chapter_id field.

Request type is now:
```typescript
interface CreateNoteRequest {
  book_club_id: string;
  chapter_id: number;  // ← New
  title: string;
  content: string;
  is_public: boolean;
}
```

Need any other modifications?
```

**Round 7: Complete**
```
Perfect! All specs are complete. Thank you!
```

---

## 🚨 Common Issues & Troubleshooting

### Issue 1: AI-Generated Files Are Incomplete

**Symptom**: AI only generates part of the content and stops

**Solution**:
```
Please continue generating the remaining parts of F-05:
- Technical Implementation (starting from Database Schema)
- Tests
- Notes

Please output these sections completely.
```

---

### Issue 2: AI Deviates from SDD Template

**Symptom**: AI doesn't follow template structure

**Solution**:
```
Your output doesn't follow the SDD template structure.

Please regenerate F-05, strictly following the structure in
"Template 2: Feature Specification File" from SDD-TEMPLATE-PROMPT.md:

Must include these sections:
1. Quick Reference
2. Dependencies
3. PRD: Product Requirements
4. Technical Implementation
5. Tests
6. Notes

Each section must be complete. Please regenerate.
```

---

### Issue 3: Incorrect Dependencies

**Symptom**: Feature dependency declarations don't match actual requirements

**Solution**:
```
F-05 (Reading Notes) has incorrect dependencies.

Current dependencies: F-01, F-02
Correct dependencies: F-01, F-03 (must depend on Book Clubs)

Please update:
1. F-05's Dependencies section
2. specs/README.md Feature Index table
3. specs/README.md Mermaid dependency graph
4. Recalculate Implementation Waves

Please output the updated content.
```

---

### Issue 4: Tech Stack Mismatch

**Symptom**: AI uses wrong tech stack (e.g., you said Django, it used Next.js)

**Solution**:
```
Your generated code uses Next.js, but my project is Django + React.

Please regenerate all features' Technical Implementation sections:

- Backend API: Django REST Framework (not Next.js API Routes)
- Frontend: React + Vite (not Next.js)
- Use Python type hints (not TypeScript)

Example:
```python
# API Endpoint
class BookClubViewSet(viewsets.ModelViewSet):
    queryset = BookClub.objects.all()
    serializer_class = BookClubSerializer
    permission_classes = [IsAuthenticated]
```

Please regenerate starting from F-01.
```

---

## 💡 Best Practices

### ✅ Do (Recommended)

1. **Confirm in Stages**: Don't skip Phase 1-4, confirm planning before generating files
2. **Clear Priorities**: Clearly mark which are CRITICAL, HIGH, MEDIUM, LOW
3. **Provide Examples**: If you have special requirements, give AI a code example
4. **Refine Iteratively**: Generate all file frameworks first, then refine details one by one
5. **Save Progress**: Save each batch of generated files locally to avoid loss

### ❌ Don't (Avoid)

1. **Don't Request Too Much at Once**: Don't say "generate 30 complete features", it will timeout
2. **Don't Skip Templates**: Don't say "just write casually", always require following SDD templates
3. **Don't Omit Tests**: Don't say "test section can be omitted", testing is core to SDD
4. **Don't Ignore Dependencies**: Don't let AI arbitrarily define dependencies, check for reasonableness
5. **Don't Frequently Overthrow**: If problems are found in planning stage, fix immediately, don't wait until generation is complete

---

## 🎓 Learning Path

**Day 1**: Understand SDD
- Read [SDD-QUICK-REFERENCE.md](./SDD-QUICK-REFERENCE.md) (10 min)
- Read [SDD-WORKFLOW-EXAMPLE.md](./SDD-WORKFLOW-EXAMPLE.md) (30 min)

**Day 2**: Practice with Small Project
- Use this guide's method to have AI generate specs for a simple project (1 hour)
- Suggested projects: Todo App, Blog, URL Shortener (5-8 features)

**Day 3**: Apply to Real Project
- Use on your actual project (2-4 hours)
- Generate while adjusting, document issues encountered

**Day 4**: Optimize & Iterate
- Based on Day 3 experience, regenerate parts of specs
- Add details, improve test cases

---

## 📚 Related Documentation

- [SDD-TEMPLATE-PROMPT.md](./SDD-TEMPLATE-PROMPT.md) - Complete AI Prompt (must-read)
- [SDD-QUICK-REFERENCE.md](./SDD-QUICK-REFERENCE.md) - Quick reference card
- [SDD-WORKFLOW-EXAMPLE.md](./SDD-WORKFLOW-EXAMPLE.md) - Complete example
- [README.md](./README.md) - Usage guide
- [AI-USAGE-GUIDE-ZH.md](./AI-USAGE-GUIDE-ZH.md) - Chinese version

---

## 🆘 Need Help?

**When encountering issues**:

1. First check if AI really received the complete SDD-TEMPLATE-PROMPT.md
2. Clearly tell AI what's wrong and request regeneration of that part
3. Reference Pocket Covey's actual spec files as standard
4. If AI keeps deviating, restart conversation and re-paste prompt

---

**🎉 Now you've mastered how to guide AI tools to generate high-quality specs using SDD templates!**

Start your first project now!
