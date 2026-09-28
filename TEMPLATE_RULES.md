# Template Project Rules

This project is a reusable base/template for creating new client or company projects.

The existing codebase provides the **technical foundation and design structure**. When creating a new project from this template, adapt the content and branding to the new company while preserving the existing architecture unless a change is explicitly requested.

---

## 1. Core Principle

**Adapt the existing project; do not redesign it by default.**

When the user asks to change content, company information, or a page:

- Reuse the existing page structure.
- Reuse existing components.
- Reuse existing layout patterns.
- Reuse existing responsive behavior.
- Reuse existing animations.
- Reuse existing spacing and typography.
- Reuse existing UI patterns.

Do not redesign the page unless the user explicitly asks for a redesign.

Small styling adjustments are acceptable when necessary to make new content fit naturally.

---

# 2. Content Replacement Rule

When the user says something like:

> "Change the About page to GMF profiles."

Interpret this as:

1. Inspect the existing About page.
2. Identify what the existing sections are intended to represent.
3. Replace the existing project/company content with the new company's information.
4. Preserve the existing layout and component structure.
5. Use the company information provided in the project documentation.
6. Do not invent company information.
7. Correct obvious spelling and grammar mistakes when converting supplied information into professional website copy.
8. Do not change unrelated pages.

The same principle applies to:

- Home / Landing page
- About
- Services
- Products
- Pricing
- Contact
- Portfolio
- Certifications
- Training
- Facilities
- FAQ
- Footer
- Navbar
- Dashboard content

---

# 3. "Change X to Y" Interpretation

When the user gives a short instruction such as:

> "Change the About page to GMF profile."

or:

> "Also change the services page to GMF services."

or:

> "Change the landing page content to GMF."

Do not ask for unnecessary clarification if the required information already exists in:

- `PROJECT_PLAN.md`
- `CLAUDE.md`
- other project documentation
- existing company information files
- the current conversation

First inspect the relevant documentation and existing page.

Only ask the user when important information is genuinely missing.

---

# 4. Layout Preservation

Unless explicitly requested otherwise:

**DO NOT:**

- redesign the page
- change the overall layout
- change section order
- replace the page architecture
- create a completely new design
- introduce a new design system
- replace existing components unnecessarily
- change navigation structure
- change routing
- change responsive breakpoints unnecessarily
- add unnecessary animations
- remove existing animations
- change global styling unnecessarily

The default goal is:

```text
Existing Layout
       +
New Company Content
       =
New Project
```

Not:

```text
Existing Layout
       ↓
Completely New Design
```

---

# 5. Styling Changes

The project may receive new branding later.

Therefore, when replacing content:

### Preserve

- layout
- component hierarchy
- spacing
- typography scale
- responsive behavior
- cards
- buttons
- navigation
- section structure

### Potentially change later

- colors
- brand colors
- logos
- imagery
- icons
- decorative elements

Do not spend significant effort redesigning these unless the user specifically requests it.

If a new text block is longer than the original, prefer natural wrapping rather than redesigning the section.

---

# 6. Company Information Source

Company-specific information must come from the project documentation or information explicitly provided by the user.

Do not invent:

- company history
- certifications
- employees
- statistics
- clients
- projects
- addresses
- phone numbers
- emails
- services
- awards
- claims of experience
- partnerships
- facilities
- technical capabilities

If information is unavailable, use neutral wording or ask the user if the missing information is essential.

---

# 7. Professional Copy Rule

When converting rough notes into website content:

- Correct obvious spelling errors.
- Correct obvious grammar errors.
- Improve readability.
- Keep the original meaning.
- Do not exaggerate claims.
- Do not invent marketing claims.
- Do not change factual numbers.
- Do not change company names.
- Do not change contact information.

For example:

User provides:

```text
to profice quality of techical training with the adaption of advance technology
```

Website copy may become:

```text
To provide quality technical training through the adoption of advanced technology.
```

The meaning should remain the same.

---

# 8. Existing Components First

Before creating a new component, check whether an existing component can represent the content.

For example:

```text
Existing:
ServiceCard
       ↓
Reuse for:
GMF Training Service
```

Do not create:

```text
GMFServiceCard
```

unless the existing component genuinely cannot support the requirement.

Prefer reusable components over project-specific duplicates.

---

# 9. Data and Content Architecture

Follow the existing project's architecture.

If the project separates content/data from JSX, maintain that pattern.

For example:

```text
src/
├── data/
├── components/
├── sections/
└── pages/
```

Do not move everything into a different architecture just because another approach may be preferable.

Architecture changes should only happen when explicitly requested or when required for functionality.

---

# 10. React Rules

For React pages:

- Preserve existing routing.
- Preserve existing page/component hierarchy.
- Preserve existing hooks and API architecture.
- Do not change authentication unless requested.
- Do not change API behavior unless requested.
- Do not change state management unnecessarily.
- Do not install packages unless required.
- Do not rewrite working components unnecessarily.

When changing a page, inspect the page and its directly related components first.

Avoid reading the entire repository unless necessary.

---

# 11. Laravel Rules

For Laravel:

- Preserve the existing API architecture.
- Preserve authentication architecture.
- Preserve Sanctum configuration.
- Preserve role/authorization structure.
- Preserve error handling.
- Preserve reusable middleware.
- Preserve API response conventions.
- Do not modify database structure for a content-only request.
- Do not modify authentication for a frontend content request.

When a backend change is requested, inspect the relevant controller, model, migration, route, middleware, and related code before modifying anything.

---

# 12. Database Rules

A new project created from this template must use a new database.

Never assume the copied project should continue using the original project's database.

Check:

```text
.env
DB_DATABASE
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
```

For a new project:

1. Create a new `.env`.
2. Set the new database name.
3. Generate a new Laravel application key.
4. Clear Laravel cached configuration.
5. Run migrations against the new database.
6. Review seeders for old project data.

Never copy production credentials or secrets from the original project.

---

# 13. Environment Rules

`.env` is project-specific.

Do not copy the previous project's `.env` into a new project.

Keep:

```text
.env.example
```

as the reusable template.

Create a new:

```text
.env
```

for every project.

After changing `.env`, use:

```bash
php artisan optimize:clear
```

during local development to ensure Laravel is using the current configuration.

---

# 14. Git Rules

Each new project created from this template must have its own Git repository.

When copying the template:

```text
Old project
    ↓
Copy
    ↓
New project
    ↓
Delete .git
    ↓
git init
    ↓
New remote repository
```

Never push the new project to the original project's Git repository.

Before the first commit, check for:

```text
.git
.env
node_modules
vendor
dist
old project-specific files
old project-specific assets
old project-specific database data
```

---

# 15. Old Project References

When creating a new project from this template, search for the old project's name and branding.

For example:

```text
editorial
Editorial
EDITORIAL
editorial-web
editorial-backend
```

Review all matches.

Replace them when they represent project-specific information.

Do not blindly replace occurrences inside:

- dependencies
- third-party packages
- generated files
- unrelated technical identifiers

Review each match before changing it.

---

# 16. Scope Control

Only modify what the user requested.

If the user says:

> "Change About page to GMF profile."

Do:

```text
About page
Related content/data
Necessary assets
```

Do not automatically change:

```text
Dashboard
Authentication
Backend
Database
Routing
Global CSS
Other pages
```

unless the requested change requires it.

---

# 17. Avoid Unrequested Refactoring

Do not use a content change as an opportunity to:

- refactor unrelated code
- rename components
- reorganize folders
- replace libraries
- upgrade dependencies
- rewrite working logic
- change coding style throughout the project

If you notice a separate improvement, mention it after completing the requested task rather than implementing it automatically.

---

# 18. Verification

After making changes:

1. Check that the requested content appears correctly.
2. Check that old company-specific content was removed where appropriate.
3. Check that the existing layout remains intact.
4. Check responsive behavior if the change affects text length.
5. Check for obvious JSX/JavaScript errors.
6. Run the project's existing lint/build/test command when practical.
7. Report which files were changed.
8. Mention any issues that could not be verified.

---

# 19. Minimal Prompt Philosophy

The user should be able to give short instructions.

Examples:

```text
Change the About page to GMF company profile.
```

```text
Also update the Services page using GMF services from the project docs.
```

```text
Change the Contact section to GMF contact information.
```

```text
Update the footer to GMF.
```

```text
Replace the landing page content with GMF content.
Keep the existing design.
```

The assistant should automatically apply these template rules.

---

# 20. Default Decision Rule

When uncertain about whether to change the design:

**Keep the existing design.**

When uncertain about whether to create a new component:

**Reuse the existing component.**

When uncertain about whether to modify an unrelated file:

**Do not modify it.**

When uncertain about company information:

**Check project documentation before asking the user.**

When uncertain about whether a claim is factual:

**Do not invent it.**

When a user explicitly requests a redesign:

**Then the existing layout-preservation rule no longer applies to that requested area.**

---

# Final Principle

This template is intended to provide:

**Reusable technical foundation + reusable UI structure + replaceable company content.**

The default workflow is:

```text
New Company Information
        ↓
Existing Template
        ↓
Replace Content
        ↓
Preserve Layout
        ↓
Verify
        ↓
New Project
```

The goal is to avoid rebuilding the same technical and UI foundation for every new project while still allowing each project to have its own company content and branding.
