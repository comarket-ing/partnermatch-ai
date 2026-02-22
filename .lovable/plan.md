
# US 4.2: JMA Agreement Library and Signing

## Overview
Add a new "Agreements" view to the platform -- a library of verified Joint Marketing Agreement (JMA) templates that users can browse, customize, and send to partners for approval, all within the platform UI.

## What will be built

### 1. New navigation item
- Add "Agreements" tab to the sidebar and mobile nav in `AppLayout.tsx` (icon: `FileText` from lucide)
- Wire it up in `Index.tsx` with the new page component

### 2. Mock data (`mockData.ts`)
New interfaces and data:
- **AgreementTemplate** -- id, title, category (e.g. "Co-Webinar", "Content Swap", "Lead Sharing"), description, clauses count, lastUpdated, popularity
- **Agreement** -- id, templateId, partnerName, status ("draft" | "pending_review" | "sent" | "signed" | "expired"), createdAt, sentAt, signedAt, expiresAt
- 3-4 template records and 4-5 agreement records with realistic B2B data

### 3. Agreements page (`src/pages/Agreements.tsx`)
Two-tab layout using the existing Tabs component:

**Tab 1 -- "Templates" (library)**
- Grid of glass-style cards, each showing: template title, category pill, clause count, popularity indicator, "Use Template" button
- Clicking "Use Template" opens a Dialog/Sheet for customization (see step 4)

**Tab 2 -- "My Agreements"**
- List of agreements the user has created/sent
- Each row: partner name, template used, status badge (color-coded: draft=gray, pending=amber, sent=blue, signed=green, expired=red), dates
- Clicking a row opens a detail side panel (same pattern as Discovery detail panel)
- Empty state with illustration text when no agreements exist

### 4. Template customization flow (Dialog on desktop, Bottom Sheet on mobile)
- Header with template name
- Partner selector (dropdown with existing partner candidates from mock data)
- Editable fields: agreement title, custom terms textarea, validity period (date picker or simple select)
- Privacy toggle: "Include account-level data"
- Two action buttons: "Save as Draft", "Send for Approval"
- On "Send for Approval" -- toast notification confirming the agreement was sent, agreement added to "My Agreements" with status "sent"

### 5. Status badge component
- Reusable `AgreementStatusBadge` component using the existing Badge UI component with color variants per status

### 6. Role-based behavior
- Admin role sees an extra "Manage Templates" section (placeholder) in the Templates tab
- Manager role sees only the standard library and their own agreements

## Technical details

### Files to create
- `src/pages/Agreements.tsx` -- main page with tabs, template grid, agreements list
- `src/components/AgreementStatusBadge.tsx` -- small status badge component
- `src/components/AgreementCustomizeDialog.tsx` -- template customization dialog/sheet

### Files to modify
- `src/data/mockData.ts` -- add `AgreementTemplate` and `Agreement` interfaces + mock data
- `src/components/AppLayout.tsx` -- add "Agreements" nav item
- `src/pages/Index.tsx` -- add Agreements to view switcher, pass `userRole` prop

### Patterns followed
- Apple-style glassmorphism cards (`.glass` utility class)
- Framer Motion entry animations (same stagger pattern as Discovery)
- Bottom Sheet on mobile / Side panel on desktop for details (same pattern as Discovery)
- Responsive grid layout with `grid-cols-1 sm:grid-cols-2` 
- Existing color tokens and spacing conventions
