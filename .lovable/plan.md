

# Implement "Open Manager" -- Template Management Panel

## Overview
Build the admin-only Template Manager that opens when clicking the "Open Manager" button in the Agreements view. This will be a full-screen dialog/sheet where admins can view, edit, add, and archive agreement templates.

## What will be built

### 1. Template Manager Dialog (`src/components/TemplateManagerDialog.tsx`)
A Dialog (reusing existing `Dialog` component) containing:

- **Header**: Title "Manage Templates" with a close button
- **Action bar**: "Add Template" button at the top
- **Template list**: Each template shown as an editable card/row with:
  - Title (inline-editable Input)
  - Category (editable Select dropdown)
  - Description (editable Textarea)
  - Clauses count (editable number Input)
  - Popularity display (read-only)
  - Last updated date (auto-set on save)
  - Action buttons: "Save" and "Archive" (archive = remove from list with toast confirmation)

### 2. Add New Template flow
- Clicking "Add Template" inserts a new blank template card at the top of the list in edit mode
- User fills in title, category, description, clauses count
- "Save" adds it to the local state; "Cancel" removes the blank card

### 3. State management
- Templates managed via `useState` in `Agreements.tsx`, lifted from the static `agreementTemplates` import
- The manager dialog receives `templates` + `onUpdate` callback
- All changes are local (mock) -- no backend

### 4. Wire up the "Open Manager" button
- Add `managerOpen` state to `Agreements.tsx`
- Connect the existing "Open Manager" button to open the dialog

## Technical details

### Files to create
- `src/components/TemplateManagerDialog.tsx` -- the manager dialog with CRUD UI

### Files to modify
- `src/pages/Agreements.tsx` -- add `managerOpen` state, make `agreementTemplates` mutable via state, render `TemplateManagerDialog`, pass props

### UI patterns
- Apple-style glassmorphism dialog (same `DialogContent` component)
- Framer Motion entry animations
- Toast notifications on save/archive
- Responsive: scrollable content area inside dialog
