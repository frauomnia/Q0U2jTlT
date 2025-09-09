# Test Strategy & Planning

This document outlines the risks, priorities, and test coverage plan for the commenting system. The goal is to ensure the feature is reliable, user-friendly, and robust across different environments, while balancing fast feedback (unit/integration) with confidence in real-world use (end-to-end).

---

## Risk Assessment

### Functional risks & edge cases
- **Persistence:** comments or replies may not survive page reloads or tab switches.  
- **Data integrity:** child comments may be stored with the wrong parent ID.  
- **Validation:** empty or extremely long inputs could break logic or UI.  
- **Concurrency:** cross-tab synchronization may be inconsistent.  

### Usability / UI risks
- **Nested inputs:** reply input fields may look identical to root input, causing confusion.  
- **Discoverability:** no clear indicator that reply functionality exists.  
- **Long text handling:** long or unwrapped text (e.g., links) may overflow and break layout.  
- **Mobile delete:** delete button only appears on tap, increasing risk of accidental deletion.  
- **Metadata placement:** creation date and delete button positioned inside comment body may reduce discoverability for longer comments.  

### Priority areas
1. **UI reliability** — users must trust the system to behave predictably.  
2. **Data persistence/integrity** — comments must always remain consistent across sessions.  

---

## Test Coverage Plan

### Target
- **Unit + Integration:** maintain 80–90% coverage (statements, branches, functions, lines).  
  - *Branch coverage ensures both true/false paths of conditionals are tested (e.g., valid vs invalid input).*  
- **E2E:** focus on 2–4 critical user journeys across browsers.

---

### Unit Tests (logic-level)
- Validate input (empty, trimmed, max length).  
- Verify add/delete functions return correct output and unique IDs.  
- Ensure nested comment assignment links children to the correct parent.  

---

### Integration Tests (component + storage)
- Handlers invoke correct functions with correct arguments.  
- Comment addition/removal reflected in both UI and storage.  
- Data persists across unmount/remount (simulated reload).  
- Nested comments stored and rendered under the right parent.  
- Error handling:  
  - Empty input shows inline warning.  
- Accessibility: inputs and buttons discoverable by role/name; keyboard submit works.  

---

### E2E Tests (user journeys, real browser)
- **Happy path create & persist:** add parent comment → visible → reload → still visible.  
- **Nested reply path:** reply to parent → child visible under correct parent.  
- **Cross-browser sanity:** above flows run on Chrome, Firefox, Safari/WebKit.  
- **Cross-tab synchronization (bonus):** add in one tab, observe update in another.  
- **Accessibility (real browser):** keyboard-only add-comment journey; visible focus maintained.  
- **Negative paths:** native form validation prevents empty submit; UI remains consistent.  

