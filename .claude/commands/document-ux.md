---
name: document-ux
description: Document website UI/UX in detail - extract design system, interaction patterns, and user experience (no evaluation, pure observation)
---

I'll document the UI/UX of this website in comprehensive detail using the uiux-documenter agent.

Please provide:
1. **URL**: The website to document (required)
2. **Focus** (optional):
   - `design-system` - Colors, typography, spacing, components
   - `interactions` - Animations, hover effects, click responses
   - `user-flow` - User journey and experience mapping
   - `implementation` - Technical details and code patterns
   - `all` - Complete documentation (default)
3. **Output Path** (optional): Where to save the documentation
   - Default: `/docs/ux-docs/[domain]-[timestamp].md`

The documentation will include:
- 🎨 Complete design system extraction (colors, typography, spacing, components)
- 🖱️ Detailed interaction patterns (animations, transitions, micro-interactions)
- 👤 User experience flow analysis (what users see, feel, think)
- 🔧 Technical implementation observations (frameworks, CSS techniques)
- 📐 Component specifications (exact sizes, states, behaviors)
- 🧠 User perception analysis (trust indicators, cognitive load, emotions)

**No evaluation or scoring** - pure observation and documentation of how the site is built and experienced.

Example usage:
```
/document-ux https://stripe.com
/document-ux https://linear.app design-system interactions
/document-ux https://notion.so all /reports/notion-ux-study.md
```

Output: Comprehensive markdown documentation that can be used for:
- Design system replication
- Component library creation
- UX pattern reference
- Competitive analysis
- Design inspiration
