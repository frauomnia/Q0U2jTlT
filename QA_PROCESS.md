# Development Workflow Integration

## Early Involvement
- QA joins feature planning sessions to:
  - Clarify acceptance criteria  
  - Surface risk areas  
  - Propose test strategies  

## Shift-Left Testing
- Collaborate with developers during implementation to:
  - Define unit vs. integration test ownership  
  - Ensure testability is built in from the start  

## Quality Gates
- ✅ Acceptance criteria met  
- ✅ Manual test coverage for risk-based scenarios  
- ✅ Automated unit + integration tests (≥ agreed coverage threshold)  
- ✅ No critical/high severity bugs open before release  

## Bug Triage & Prioritization
- **High**: Breaks core functionality, data integrity, or security → must be fixed before release  
- **Medium**: Impacts important but non-critical flows → can be scheduled for the next sprint  
- **Low**: Cosmetic/minor usability issues → addressed as part of backlog grooming  

---

# Team Collaboration

## Testability Partnership
- Work with developers to expose hooks, IDs, and logs that make automation reliable and maintenance-friendly  

## Knowledge Sharing
- Share test plans and strategies with the team during sprint planning  
- Maintain lightweight documentation and testing guides for developers, PMs, and future joiners  
- Demo QA tooling and workflows so everyone can contribute to quality  

---

# Continuous Improvement

## Quality Bottlenecks
- Track flaky tests, recurring bug types, or slow feedback loops  
- Raise them in retrospectives  

## Automation Opportunities
- Expand coverage gradually: **unit → integration → E2E**  
- Automate regression suites in CI/CD pipelines  

## Feedback Loop
- Use bug reports, production incidents, and test analytics to refine both QA practices and developer workflows  
