---
name: analyze-ux
description: Analyze website UI/UX using Playwright - checks accessibility, responsive design, visual design, and usability
---

I'll analyze the UI/UX quality of the website using the uiux-analyzer agent with Playwright automation.

Please provide:
1. **URL**: The website to analyze (required)
2. **Focus Areas** (optional): Choose from:
   - `accessibility` - WCAG 2.1 compliance audit
   - `responsive` - Multi-viewport responsive design testing
   - `visual` - Design system and visual consistency
   - `ux` - User experience and interaction patterns
   - `all` - Comprehensive analysis (default)
3. **Viewports** (optional): Specific screen sizes to test
   - Default: Desktop (1920×1080), Tablet (768×1024), Mobile (375×667)
4. **Output Location** (optional): Where to save the report
   - Default: `/docs/ux-analysis/[domain]-[timestamp].md`

The analysis will include:
- ✅ Accessibility audit (WCAG compliance)
- 📱 Responsive design evaluation across viewports
- 🎨 Visual design assessment and design system extraction
- 🖱️ User experience and interaction pattern analysis
- 📊 Comprehensive report with prioritized recommendations

Example usage:
```
/analyze-ux https://example.com
/analyze-ux https://example.com accessibility responsive
/analyze-ux https://mysite.com all /reports/my-analysis.md
```
