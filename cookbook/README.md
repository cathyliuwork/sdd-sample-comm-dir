# SDD Template System - Usage Guide

**Version**: 1.1
**Last Updated**: 2025-11-28
**Purpose**: Complete template system for Spec-Driven Development methodology

---

## 📦 What's Included

This directory contains everything you need to apply SDD (Spec-Driven Development) methodology to any software project:

### 🎯 Core Documents

1. **[AI-USAGE-GUIDE.md](./playbook/AI-USAGE-GUIDE.md)** (Practical Guide, Must-Read!)
   - **How to guide AI tools to generate specs using SDD templates**
   - 3-step quick start
   - Complete conversation examples
   - Common issues troubleshooting
   - Best practices
   - **Use this**: Follow this guide before starting a new project
   - **中文版**: [AI-USAGE-GUIDE-ZH.md](./playbook/AI-USAGE-GUIDE-ZH.md)

2. **[SDD-TEMPLATE-PROMPT.md](./playbook/SDD-TEMPLATE-PROMPT.md)** (12,000+ words)
   - Complete AI prompt for generating specifications
   - 5-phase generation process
   - File templates for all document types
   - Quality checklist
   - **Use this**: 复制给 AI 工具，让它生成 specs

3. **[SDD-QUICK-REFERENCE.md](./playbook/SDD-QUICK-REFERENCE.md)** (1-page)
   - Single-page cheat sheet
   - Core principles, structure, and conventions
   - Quick decision trees
   - **Use this**: As a reference while writing specs manually

4. **[SDD-WORKFLOW-EXAMPLE.md](./playbook/SDD-WORKFLOW-EXAMPLE.md)** (8,000+ words)
   - Complete end-to-end example
   - "Task Manager" project from idea to full specs
   - Shows one complete feature spec (F-04)
   - **Use this**: To understand what good specs look like

### 📁 Templates

Located in `templates/` directory - **[Full Template Guide](./templates/README-TEMPLATES.md)**:

**Mandatory Foundation Templates (ALL Projects)**:

4. **[S-00-architecture-template.md](./templates/S-00-architecture-template.md)** (9.4KB)
   - Template for S-00 Architecture Overview (ALWAYS required)
   - Includes: Tech stack, design principles, architecture diagrams, security, scalability
   - Use for: System overview of any project type (web, mobile, CLI, backend, data)

5. **[S-01-uiux-design-template.md](./templates/S-01-uiux-design-template.md)** (24KB)
   - Template for S-01 UI/UX Design System (ALWAYS required)
   - Includes: Design tokens, accessibility, dark mode, Mode A (self-contained) vs Mode B (external Figma)
   - Use for:
     - **Web/Mobile**: Full design system (colors, typography, components)
     - **CLI Tools**: Terminal UI design (colors, spinners, help text)
     - **Backend/Data**: Placeholder ("No UI currently. Reserved for future dashboards")

6. **[S-02-testing-strategy-template.md](./templates/S-02-testing-strategy-template.md)** (10KB)
   - Template for S-02 Testing Strategy (ALWAYS required)
   - Includes: Test pyramid (E2E, Integration, Unit), CI/CD, coverage targets
   - Use for: Quality gates for all project types

**Project-Specific Templates (Optional)**:

7. **[S-03-database-schema-template.md](./templates/S-03-database-schema-template.md)** (5.3KB)
   - Template for database design (if project has database)
   - Includes: ERD diagrams, SQL schemas, Prisma models, RLS policies, indexes
   - Use for: Projects with PostgreSQL, MySQL, MongoDB, or other databases

8. **[F-XX-feature-template.md](./templates/F-XX-feature-template.md)** (1.8KB)
   - Template for feature specifications (F-01, F-02, F-03...)
   - Includes: Quick reference, dependencies, PRD, technical implementation, tests
   - Use for: All user-facing features and functionality

**Note**: Templates for root README.md and specs/README.md are embedded in [SDD-TEMPLATE-PROMPT.md](./playbook/SDD-TEMPLATE-PROMPT.md) (Template 3 and Template 4)

---

> ### ⚠️ IMPORTANT: S-00, S-01, S-02 Are MANDATORY for ALL Projects
>
> **Every project must have these three system modules without exception:**
>
> - **✅ S-00: Architecture Overview** - Required for all project types
> - **✅ S-01: UI/UX Design System** - Required even if project has no UI (use placeholder template)
> - **✅ S-02: Testing Strategy** - Required for all project types
>
> **Why S-01 for backend/API projects?**
> - Reserves specification slot for future UI needs (monitoring dashboards, admin interfaces)
> - Use placeholder template from S-01-uiux-design-template.md lines 36-80
> - Maintains consistent structure across all SDD projects
>
> **All other system modules (S-03+) are project-specific and optional.**

---

### 📚 Examples

Located in `examples/` directory:

8. **sample-project-conversion.md**
   - 5 different project types converted to SDD structure
   - Shows variety: SaaS app, CLI tool, Library, Mobile app, Data pipeline

---

## 🚀 Quick Start

### Option A: Let AI Generate Everything (Fastest)

**Step 1**: Copy the entire [SDD-TEMPLATE-PROMPT.md](./playbook/SDD-TEMPLATE-PROMPT.md) file

**Step 2**: Give it to your AI assistant (Claude, ChatGPT, etc.) with your project info:

```
[Paste SDD-TEMPLATE-PROMPT.md content]

---

Now use this prompt to generate specifications for my project:

Project: [Your project description]
```

**Step 3**: AI will guide you through Phase 1-5 and generate all spec files

**Time**: 10-30 minutes

---

### Option B: Use Templates Manually (More Control)

**Step 1**: Read [SDD-QUICK-REFERENCE.md](./playbook/SDD-QUICK-REFERENCE.md) (5 min)

**Step 2**: Plan your project structure:
- List all features (what users can do)
- Identify system modules (cross-cutting concerns)
- Map dependencies

**Step 3**: Copy templates from `templates/` directory:
- Start with mandatory foundation: S-00, S-01, S-02 (ALWAYS required)
- Add project-specific: S-03 (database) if needed
- Copy F-XX template for each feature
- Create root README.md and specs/README.md (use templates from SDD-TEMPLATE-PROMPT.md)

**Step 4**: Fill in each template

**Time**: 2-5 days for medium project

---

### Option C: Hybrid Approach (Recommended)

**Step 1**: Let AI generate initial structure (Option A)

**Step 2**: Review and refine:
- Check that features make sense
- Verify dependencies are correct
- Adjust priorities

**Step 3**: Manually enhance specific sections:
- Add detailed business rules
- Refine API contracts
- Expand test scenarios

**Time**: 1-2 days for medium project

---

## 📖 How to Use Each Document

### When to Use SDD-TEMPLATE-PROMPT.md

**Scenario 1**: Starting a brand new project

```
You: "I want to build [project description]"
AI with prompt: Generates complete spec structure
```

**Scenario 2**: Converting existing PRD to SDD structure

```
You: "Here's my 50-page PRD: [paste PRD]"
AI with prompt: Breaks it into modular S-XX and F-XX files
```

**Scenario 3**: Adding SDD structure to existing codebase

```
You: "I have existing code but no specs. Here's what it does: [description]"
AI with prompt: Reverse-engineers specifications from functionality
```

---

### When to Use SDD-QUICK-REFERENCE.md

**Scenario 1**: During spec writing

Keep it open in a second window as you write specs manually.

**Scenario 2**: Code reviews

Use the quality checklist section to review spec PRs.

**Scenario 3**: Onboarding new team members

Hand them this document first - it's a 5-minute introduction to SDD.

---

### When to Use SDD-WORKFLOW-EXAMPLE.md

**Scenario 1**: Learning SDD for the first time

Read this example end-to-end to see the complete process.

**Scenario 2**: Stuck on how to write a feature spec

Look at the F-04 example and copy the structure.

**Scenario 3**: Explaining SDD to stakeholders

Show them this example - it's concrete and easy to understand.

---

## 🎯 What Project Types Work with SDD?

SDD works for almost any software project:

✅ **Web Applications** (SaaS, e-commerce, dashboards)
✅ **Mobile Apps** (iOS, Android, React Native)
✅ **APIs & Backend Services** (REST, GraphQL, microservices)
✅ **CLI Tools** (command-line applications)
✅ **Libraries & SDKs** (reusable code packages)
✅ **Data Pipelines** (ETL, batch processing)
✅ **Desktop Applications** (Electron, native)

The template adapts to project size:
- **Small** (<10 features): Simplified structure
- **Medium** (10-20 features): Standard SDD
- **Large** (>20 features): Grouped features with sub-modules

---

## 🔧 Customization Tips

### Adapting for Your Tech Stack

The templates use Next.js + Supabase as examples. To adapt:

1. **Change framework references**:
   - Find: `Next.js` → Replace: `Django` / `Rails` / `Express`
   - Find: `Supabase` → Replace: `Firebase` / `AWS` / `Custom Backend`

2. **Adjust code examples**:
   - TypeScript → Python / Ruby / Go
   - React components → Django templates / Rails views

3. **Update testing tools**:
   - Playwright → Selenium / Cypress
   - Vitest → Jest / PyTest / RSpec

### Adapting for Your Team Size

**Solo Developer**:
- Simplify test sections (fewer test types)
- Combine related features
- Skip detailed API contracts (you're building both sides)

**Small Team (2-5 people)**:
- Keep standard structure
- Focus on dependency clarity
- Use implementation waves for planning

**Large Team (10+ people)**:
- Add more granular features (smaller pieces)
- Include ownership sections (who owns each feature)
- Add more detailed integration contracts

---

## 📐 Directory Structure After Using Templates

After applying SDD to your project, you'll have:

```
your-project/
├── README.md                    # ← From root-readme-template.md
│
├── specs/                       # ← Your specifications
│   ├── README.md                # ← From SDD-TEMPLATE-PROMPT.md (Template 4)
│   │
│   ├── system/                  # ← System design modules
│   │   ├── S-00-architecture.md # ← From S-00-architecture-template.md (ALWAYS)
│   │   ├── S-01-uiux-design.md  # ← From S-01-uiux-design-template.md (ALWAYS)
│   │   ├── S-02-testing-strategy.md # ← From S-02-testing-strategy-template.md (ALWAYS)
│   │   ├── S-03-database-schema.md  # ← From S-03-database-schema-template.md (if DB)
│   │   └── ...
│   │
│   ├── features/                # ← Feature specifications
│   │   ├── TEMPLATE.md          # ← Copy of F-XX-feature-template.md (for reference)
│   │   ├── F-01-*.md            # ← From F-XX-feature-template.md
│   │   ├── F-02-*.md            # ← From F-XX-feature-template.md
│   │   └── ...
│   │
│   └── archive/                 # ← (Optional) Original documents
│       └── original-prd.md
│
├── src/                         # ← Your code (implement from specs)
└── tests/                       # ← Your tests (defined in specs)
```

---

## ✅ Quality Checklist

Before considering specs "complete", verify:

### Structure
- [ ] Directory structure matches SDD template
- [ ] All files use correct naming (S-XX-*.md, F-XX-*.md)
- [ ] Both README files exist (root + specs/)

### Content
- [ ] Every S-XX file has Dependencies section
- [ ] Every F-XX file has all 5 sections (Quick Ref, Dependencies, PRD, Tech, Tests, Notes)
- [ ] All dependencies reference actual files

### Navigation
- [ ] specs/README.md has complete Feature Index table
- [ ] specs/README.md has Mermaid dependency graph
- [ ] Implementation waves defined

### Validation
- [ ] No circular dependencies
- [ ] All Mermaid diagrams render correctly
- [ ] All CRITICAL features have Tier 1 tests

---

## 🆘 Troubleshooting

### Problem: Specs are too detailed, taking forever to write

**Solution**: Use AI to generate first draft, then refine:

```
[Give AI the SDD-TEMPLATE-PROMPT.md]

Generate specs for [your project], but keep PRD sections brief (3-5 sentences).
I'll expand them later.
```

---

### Problem: Team doesn't follow specs during implementation

**Solution**: Make specs the source of truth:

1. **PR Checklist**: "Does this implement what the spec says?"
2. **Spec Reviews**: Review specs before implementation
3. **Keep Specs Updated**: If reality diverges, update the spec

---

### Problem: Too many features, dependency graph is overwhelming

**Solution**: Group features into categories:

```
specs/
└── features/
    ├── auth/
    │   ├── F-01-signup.md
    │   └── F-02-login.md
    ├── tasks/
    │   ├── F-10-task-crud.md
    │   └── F-11-task-assign.md
    └── ...
```

---

## 📊 Success Metrics

How do you know SDD is working?

**Good Signs**:
- ✅ Developers rarely ask "What should this do?"
- ✅ Code reviews focus on implementation, not requirements
- ✅ New team members productive in days, not weeks
- ✅ Features implemented in dependency order
- ✅ Fewer bugs from misunderstandings

**Warning Signs**:
- ⚠️ Specs constantly out of date
- ⚠️ Developers ignore specs and ask for verbal clarification
- ⚠️ Implementation differs significantly from spec
- ⚠️ Nobody reads the specs

**Fixes**:
- Make specs easier to read (more diagrams, less text)
- Keep specs updated (treat as living documents)
- Enforce spec-code alignment in PRs

---

## 🔗 Additional Resources

### SDD Methodology

- **Original Inspiration**: Pocket Covey project (in parent directory)
- **Related Concepts**:
  - Design-First API Development
  - Behavior-Driven Development (BDD)
  - Documentation-Driven Development

### Tools

- **Mermaid Diagram Editor**: https://mermaid.live
- **Markdown Preview**: VS Code, Obsidian, Typora
- **Spec Collaboration**: Notion, Confluence, GitHub Wiki

### Templates for Other Domains

This SDD template is general-purpose. For specialized domains:

- **API-First Projects**: Emphasize OpenAPI/Swagger specs
- **Data Projects**: Add data dictionary and schema evolution
- **ML Projects**: Add model cards and dataset specs
- **Mobile Apps**: Add screen flow diagrams

---

## 🤝 Contributing

Want to improve these templates?

1. Try them on your project
2. Note what worked / didn't work
3. Submit improvements

Common enhancements:
- Add new template variants (e.g., microservices template)
- Add more examples for different tech stacks
- Translate to other languages

---

## 📜 License

These templates are based on the Pocket Covey project structure and are provided as-is for use in any project.

---

## 🎓 Learning Path

**New to SDD? Follow this order:**

1. **Read**: [SDD-QUICK-REFERENCE.md](./playbook/SDD-QUICK-REFERENCE.md) (10 min)
2. **Study**: [SDD-WORKFLOW-EXAMPLE.md](./playbook/SDD-WORKFLOW-EXAMPLE.md) (30 min)
3. **Practice**: Use [SDD-TEMPLATE-PROMPT.md](./playbook/SDD-TEMPLATE-PROMPT.md) on a small project (1 hour)
4. **Apply**: Use on your real project (1-2 days)
5. **Refine**: Improve based on experience

---

## 💬 FAQ

**Q: Do I need to use ALL the sections in the templates?**
A: No. Templates are maximalist. Omit sections that don't apply to your project.

**Q: Can I use SDD for a project that's already built?**
A: Yes! Reverse-engineer specs from existing code. Great for onboarding or refactoring.

**Q: Is SDD only for AI-assisted development?**
A: No. SDD helps humans too. AI just makes spec generation faster.

**Q: How often should I update specs?**
A: Whenever requirements change. Specs should always reflect reality.

**Q: What if my team prefers Jira/Linear over markdown specs?**
A: You can use SDD structure in any tool. The methodology matters, not the file format.

---

**Version History**:
- **1.1** (2025-11-28): Added standalone template files (S-00, S-01, S-02, S-03, F-XX); S-00/S-01/S-02 now mandatory for ALL projects
- **1.0** (2025-11-27): Initial release based on Pocket Covey structure

---

**Need Help?**

- **🚀 开始新项目**: Read [AI-USAGE-GUIDE.md](./playbook/AI-USAGE-GUIDE.md) - 手把手教你如何让 AI 生成 specs
- **📖 Understanding SDD**: Read [SDD-QUICK-REFERENCE.md](./playbook/SDD-QUICK-REFERENCE.md)
- **👀 See It In Action**: Read [SDD-WORKFLOW-EXAMPLE.md](./playbook/SDD-WORKFLOW-EXAMPLE.md)
- **🤖 Generate Specs**: Use [SDD-TEMPLATE-PROMPT.md](./playbook/SDD-TEMPLATE-PROMPT.md)
- **📋 Copy Templates**: Use files in [templates/](./templates/) directory

---

**🎉 You're ready to start building better software with SDD!**
