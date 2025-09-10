# Bug Reports

---

## UI-01 — Long comments do not truncate (readability)
**Type:** UI / Usability  
**Severity:** Medium  
**Priority:** Medium 
**Environment:** Local dev build @ http://localhost:5173/, Chrome 129, macOS Sonoma

### Steps to Reproduce
1. Open the app.
2. Add a long comment (~150+ words).
3. Submit.

### Actual Result
The full text renders inline. Long blocks push other comments off-screen, requiring excessive scrolling.

### Expected Result
Long comments should truncate after a reasonable height/line count with a **“Read more / Show less”** control.

---

## UI-02 — Metadata & actions appear in the middle of comment content
**Type:** UI / Usability  
**Severity:** Medium  
**Priority:** Medium  
**Environment:** Local dev build @ http://localhost:5173/, Chrome 129, macOS Sonoma

### Steps to Reproduce
1. Add a comment.
2. Observe timestamp and delete button placement.
3. Add a long comment and scroll.

### Actual Result
Timestamp and delete button render inside the comment bubble, centered among text; on long comments, they’re off-screen.

### Expected Result
Metadata and actions should be consistently visible in a predictable area (e.g., header/top-right of each comment).

---

## FUNC-01 — Accidental delete on mobile due to invisible-but-tappable area
**Type:** Functional / UX (Destructive action)  
**Severity:** High 
**Priority:** High  
**Environment:** Local dev build @ http://localhost:5173/, iPhone 14 Pro Max (iOS Safari 17)

### Steps to Reproduce (Mobile)
1. Open the app on iOS Safari or Android Chrome.
2. Tap anywhere inside a comment bubble (not on a visible delete icon).
3. The delete button becomes visible.
4. A second tap near the same spot (often accidental) triggers delete.

### Actual Result
Comment is deleted immediately without confirmation. The initial tap reveals the button and the next tap hits it, causing unintended data loss.

### Expected Result
- Delete button should only be actionable when explicitly targeted (visible, consistent location).
- A confirmation step (modal/dialog) must precede deletion.

---

## DATA-01 — `childComments` not updated after adding replies (IndexedDB)
**Type:** Data Integrity / Consistency  
**Severity:** Medium (potentially High if UI or APIs rely on this field)  
**Priority:** Medium  
**Environment:** Local dev build @ http://localhost:5173/, Chrome 129, macOS Sonoma

### Steps to Reproduce
1. Add a root comment.
2. Add a child reply.
3. Inspect IndexedDB → `CommentsDB` → `comments` store.

### Actual Result
Parent record’s `childComments` array remains `[]`.

### Expected Result
- **Option A:** Keep `childComments` and append the child id on reply creation.
- **Option B:** Remove `childComments` entirely and derive children by querying `parentId`.

---
