# UI/UX Analyzer Agent

Comprehensive website UI/UX analysis agent powered by Claude and Playwright MCP. Automatically evaluates accessibility (WCAG 2.1), responsive design, visual design, user experience, and performance.

## Features

- ✅ **Accessibility Audits**: WCAG 2.1 AA/AAA compliance checking
- 📱 **Responsive Testing**: Multi-viewport analysis (Desktop, Tablet, Mobile)
- 🎨 **Visual Design Analysis**: Color palette, typography, spacing system extraction
- 🖱️ **UX Evaluation**: Navigation, interactions, forms, and usability patterns
- ⚡ **Performance Insights**: Core Web Vitals and loading performance
- 📊 **Comparative Analysis**: Side-by-side website comparisons
- 📄 **Comprehensive Reports**: Detailed markdown reports with actionable recommendations

## Architecture

This agent comes in two flavors:

### 1. Simple Agent (Markdown)

Located at [`.claude/agents/uiux-analyzer.md`](/.claude/agents/uiux-analyzer.md)

- Use directly in Claude Code
- Invoked via natural language or `/analyze-ux` slash command
- No installation required
- Perfect for quick, one-off analyses

### 2. Advanced Agent (TypeScript SDK)

This directory contains the full TypeScript implementation:

```
agents/uiux-analyzer/
├── agent.ts                 # Main agent orchestration
├── index.ts                 # Public API exports
├── src/
│   ├── types/
│   │   └── analysis.ts      # TypeScript type definitions
│   ├── tools/
│   │   ├── playwright-tools.ts    # Playwright MCP wrappers
│   │   └── analysis-tools.ts      # Analysis algorithms
│   └── utils/
│       └── report-generator.ts    # Markdown report generator
├── examples/
│   ├── analyze-website.ts         # Single site analysis
│   ├── compare-websites.ts        # Comparative analysis
│   └── batch-analyze.ts           # Batch processing
├── package.json
├── tsconfig.json
└── README.md (this file)
```

## Installation

### Prerequisites

1. **Claude Code** with Playwright MCP enabled
2. **Node.js** >= 18.0.0
3. **Anthropic API Key**

### Setup

```bash
# Navigate to agent directory
cd agents/uiux-analyzer

# Install dependencies
npm install

# Build TypeScript
npm run build

# Set API key (if not already set globally)
export ANTHROPIC_API_KEY="your-api-key-here"
```

### Playwright MCP Configuration

Ensure Playwright MCP is enabled in your Claude settings ([`../../.claude/settings.json`](/.claude/settings.json)):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  },
  "permissions": {
    "allow": [
      "mcp__playwright__browser_navigate",
      "mcp__playwright__browser_close",
      "mcp__playwright__browser_wait_for",
      "mcp__playwright__browser_click",
      "mcp__playwright__browser_snapshot",
      "mcp__playwright__browser_take_screenshot"
    ]
  }
}
```

## Usage

### Method 1: Claude Code (Simple)

Just ask Claude to analyze a website:

```
Can you analyze the UI/UX of https://example.com?
```

Or use the slash command:

```
/analyze-ux https://example.com
```

### Method 2: TypeScript SDK (Advanced)

#### Single Website Analysis

```typescript
import { analyzeWebsiteUX, generateReport } from "./index";

const result = await analyzeWebsiteUX({
  url: "https://example.com",
  focusAreas: ["accessibility", "responsive", "ux"],
  viewports: [
    { name: "Desktop", width: 1920, height: 1080 },
    { name: "Mobile", width: 375, height: 667 },
  ],
});

await generateReport(result, "./reports/example-com.md");
```

#### Comparative Analysis

```typescript
import { compareWebsites } from "./index";

const comparison = await compareWebsites([
  "https://yoursite.com",
  "https://competitor1.com",
  "https://competitor2.com",
]);

console.log(comparison);
```

#### Batch Analysis

```typescript
import { batchAnalyzeWebsites } from "./index";

const urls = [
  "https://site1.com",
  "https://site2.com",
  "https://site3.com",
];

const results = await batchAnalyzeWebsites(urls, {
  focusAreas: ["accessibility"],
});

results.forEach((result) => {
  console.log(`${result.url}: ${result.scores.accessibility}/100`);
});
```

### Method 3: CLI Examples

Run pre-built examples:

```bash
# Analyze a single website
npm run dev https://example.com

# Compare multiple websites
ts-node examples/compare-websites.ts https://site1.com https://site2.com

# Batch analyze
ts-node examples/batch-analyze.ts
```

## API Reference

### `analyzeWebsiteUX(request: AnalysisRequest): Promise<AnalysisResult>`

Analyze a single website.

**Parameters:**
- `url` (required): Website URL to analyze
- `focusAreas` (optional): Array of focus areas: `["accessibility", "responsive", "visual", "ux", "performance", "all"]`
- `viewports` (optional): Array of viewport configurations
- `outputPath` (optional): Directory for screenshots/snapshots
- `outputFormat` (optional): `"detailed"` or `"summary"`

**Returns:** `AnalysisResult` with scores, findings, and recommendations

### `batchAnalyzeWebsites(urls: string[], options?): Promise<AnalysisResult[]>`

Analyze multiple websites in parallel.

**Parameters:**
- `urls`: Array of URLs
- `options`: Same as `AnalysisRequest` (applied to all URLs)

**Returns:** Array of `AnalysisResult`

### `compareWebsites(urls: string[], options?): Promise<string>`

Generate comparative analysis report.

**Returns:** Markdown comparison report

### `generateReport(result: AnalysisResult, outputPath?): Promise<string>`

Generate markdown report from analysis result.

**Returns:** Markdown string

## Analysis Dimensions

### 1. Accessibility (WCAG 2.1)

- **Color Contrast**: Checks all text meets 4.5:1 ratio (AA) or 7:1 (AAA)
- **Heading Hierarchy**: Validates proper H1-H6 structure
- **Keyboard Navigation**: Tests tab order and focus indicators
- **Form Labels**: Ensures all inputs have associated labels
- **ARIA Attributes**: Validates proper semantic markup
- **Image Alt Text**: Checks all images have meaningful descriptions

**Score:** 0-100 (based on WCAG violations)

### 2. Responsive Design

- **Viewport Compatibility**: Tests Desktop (1920×1080), Tablet (768×1024), Mobile (375×667)
- **Touch Targets**: Validates 44×44px minimum for interactive elements
- **Typography Scaling**: Checks font sizes across viewports
- **Layout Adaptation**: Detects horizontal scroll and broken layouts
- **Breakpoint Effectiveness**: Analyzes media query coverage

**Score:** 0-100 (based on layout issues)

### 3. Visual Design

- **Color Palette**: Extracts and documents color system
- **Typography System**: Identifies font families, sizes, weights
- **Spacing Consistency**: Detects spacing grid (4px, 8px, custom)
- **Component Patterns**: Documents UI components and variants

**Score:** 0-100 (based on consistency)

### 4. User Experience

- **Navigation**: Clarity, depth, search functionality
- **Interactions**: Button states, feedback, loading indicators
- **Forms**: Labels, validation, error messages
- **Content**: Hierarchy, scannability, CTAs

**Score:** 0-100 (based on usability issues)

### 5. Performance

- **Core Web Vitals**: FCP, LCP, TBT (when available)
- **Resource Loading**: Network analysis
- **Console Errors**: JavaScript error detection

**Score:** 0-100 (based on metrics)

## Report Structure

Generated markdown reports include:

```markdown
# UI/UX Analysis Report

## Executive Summary
- Overall score and category breakdown
- Issue counts by severity

## 1. Accessibility Audit
- Critical/High/Medium/Low issues
- WCAG criterion references
- Specific fix recommendations

## 2. Responsive Design Analysis
- Viewport testing results
- Touch target evaluation
- Layout issue documentation

## 3. Visual Design Assessment
- Extracted design system
- Color palette, typography, spacing
- Consistency analysis

## 4. User Experience Evaluation
- Navigation assessment
- Interaction patterns
- Content usability

## 5. Performance Analysis
- Metrics and insights

## Recommendations by Priority
- 🔴 Critical (Fix Immediately)
- 🟡 High Priority (Fix Soon)
- 🟢 Medium Priority (Nice to Have)
- 🔵 Low Priority (Future Enhancement)

## Appendix
- Testing environment details
- Evidence (screenshots, snapshots)
- Next steps checklist
```

## Scoring Methodology

**Accessibility (0-100)**
- 100: WCAG AAA compliance
- 85-99: WCAG AA compliance
- 60-84: Significant violations
- <60: Critical violations

**Other Categories**
- Similar severity-based deductions
- Critical: -20 points
- High: -10 points
- Medium: -5 points
- Low: -2 points

**Overall Rating**
- 90-100: Excellent
- 80-89: Good
- 70-79: Fair
- 60-69: Poor
- <60: Critical

## Extending the Agent

### Add Custom Analysis Tools

```typescript
// src/tools/custom-analyzer.ts
export class CustomAnalyzer {
  analyzeCustomMetric(data: any) {
    // Your custom analysis logic
    return {
      score: 85,
      issues: [],
    };
  }
}
```

### Add Custom Report Sections

```typescript
// src/utils/report-generator.ts
private static generateCustomSection(result: AnalysisResult): string {
  return `## Custom Analysis\n\n...`;
}
```

### Customize System Prompt

Edit the `buildSystemPrompt()` function in [`agent.ts`](agent.ts) to add domain-specific instructions.

## Troubleshooting

### Playwright MCP Not Working

1. Check MCP server is running: `npx @modelcontextprotocol/server-playwright`
2. Verify permissions in `.claude/settings.json`
3. Restart Claude Code

### TypeScript Build Errors

```bash
npm run clean
npm install
npm run build
```

### Analysis Hangs

- Increase timeout in `PlaywrightToolManager` config
- Check website is accessible
- Verify network connectivity

## Examples

See [`examples/`](examples/) directory for complete working examples:

- [`analyze-website.ts`](examples/analyze-website.ts): Single site analysis with full reporting
- [`compare-websites.ts`](examples/compare-websites.ts): Competitive analysis
- [`batch-analyze.ts`](examples/batch-analyze.ts): Bulk processing

## Contributing

This agent is part of the [devconfig](../../) repository. Contributions welcome!

1. Add new analysis dimensions in `src/tools/analysis-tools.ts`
2. Extend report formats in `src/utils/report-generator.ts`
3. Add new examples in `examples/`
4. Update types in `src/types/analysis.ts`

## License

MIT

## Related

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [Playwright MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/playwright)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev - Learn Accessibility](https://web.dev/learn/accessibility/)

---

Built with ❤️ using Claude Agent SDK and Playwright MCP
