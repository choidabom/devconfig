/**
 * Markdown Report Generator
 *
 * Generates comprehensive UI/UX analysis reports in markdown format
 */

import {
  AnalysisResult,
  Finding,
  Recommendation,
  CategoryScores,
  DesignSystem,
  ComparisonResult,
} from "../types/analysis";
import { ScoreCalculator } from "../tools/analysis-tools";

export class ReportGenerator {
  /**
   * Generate complete analysis report
   */
  static generateReport(result: AnalysisResult): string {
    const sections = [
      this.generateHeader(result),
      this.generateExecutiveSummary(result),
      this.generateAccessibilitySection(result),
      this.generateResponsiveSection(result),
      this.generateVisualDesignSection(result),
      this.generateUXSection(result),
      this.generatePerformanceSection(result),
      this.generateRecommendations(result),
      this.generateAppendix(result),
    ];

    return sections.filter(Boolean).join("\n\n---\n\n");
  }

  /**
   * Generate report header
   */
  private static generateHeader(result: AnalysisResult): string {
    const url = new URL(result.url);
    const domain = url.hostname.replace("www.", "");

    return `# UI/UX Analysis Report: ${domain}

**Analysis Date**: ${new Date(result.timestamp).toLocaleString()}
**URL**: ${result.url}
**Analyst**: Claude (uiux-analyzer agent)`;
  }

  /**
   * Generate executive summary
   */
  private static generateExecutiveSummary(result: AnalysisResult): string {
    const rating = ScoreCalculator.getRating(result.overallScore);
    const criticalIssues = result.findings.filter((f) => f.severity === "critical").length;
    const highIssues = result.findings.filter((f) => f.severity === "high").length;

    return `## Executive Summary

${result.summary}

**Overall Score**: ${result.overallScore}/100 (${rating})

**Category Scores**
| Category | Score | Rating |
|----------|-------|--------|
| Accessibility | ${result.scores.accessibility}/100 | ${ScoreCalculator.getRating(result.scores.accessibility)} |
| Responsive Design | ${result.scores.responsive}/100 | ${ScoreCalculator.getRating(result.scores.responsive)} |
| Visual Design | ${result.scores.visual}/100 | ${ScoreCalculator.getRating(result.scores.visual)} |
| User Experience | ${result.scores.ux}/100 | ${ScoreCalculator.getRating(result.scores.ux)} |
| Performance | ${result.scores.performance}/100 | ${ScoreCalculator.getRating(result.scores.performance)} |

**Issue Summary**
- 🚨 Critical: ${criticalIssues}
- ⚠️ High Priority: ${highIssues}
- ℹ️ Medium Priority: ${result.findings.filter((f) => f.severity === "medium").length}
- 💡 Low Priority: ${result.findings.filter((f) => f.severity === "low").length}`;
  }

  /**
   * Generate accessibility audit section
   */
  private static generateAccessibilitySection(result: AnalysisResult): string {
    const findings = result.findings.filter((f) => f.category === "accessibility");

    if (findings.length === 0) {
      return `## 1. Accessibility Audit (WCAG 2.1)

✅ **Excellent accessibility!** No major issues found.

**Accessibility Score**: ${result.scores.accessibility}/100`;
    }

    const critical = findings.filter((f) => f.severity === "critical");
    const high = findings.filter((f) => f.severity === "high");
    const medium = findings.filter((f) => f.severity === "medium");

    let section = `## 1. Accessibility Audit (WCAG 2.1)\n\n`;

    if (critical.length > 0) {
      section += `### Critical Issues 🚨 (Must Fix)\n\n`;
      critical.forEach((finding, idx) => {
        section += this.formatFinding(finding, idx + 1);
      });
      section += "\n";
    }

    if (high.length > 0) {
      section += `### High Priority ⚠️\n\n`;
      high.forEach((finding, idx) => {
        section += this.formatFinding(finding, idx + 1);
      });
      section += "\n";
    }

    if (medium.length > 0) {
      section += `### Medium Priority ℹ️\n\n`;
      medium.forEach((finding, idx) => {
        section += this.formatFinding(finding, idx + 1);
      });
      section += "\n";
    }

    section += `**Accessibility Score**: ${result.scores.accessibility}/100\n`;

    return section;
  }

  /**
   * Generate responsive design section
   */
  private static generateResponsiveSection(result: AnalysisResult): string {
    const findings = result.findings.filter((f) => f.category === "responsive");

    let section = `## 2. Responsive Design Analysis\n\n`;

    if (findings.length === 0) {
      section += `✅ **Excellent responsive design!** Layout adapts well across all viewports.\n\n`;
    } else {
      section += `### Viewport Testing Results\n\n`;

      // Group findings by viewport if location contains viewport info
      const viewportFindings = this.groupByViewport(findings);

      Object.entries(viewportFindings).forEach(([viewport, vpFindings]) => {
        const icon = vpFindings.some((f) => f.severity === "critical")
          ? "🚨"
          : vpFindings.length > 0
          ? "⚠️"
          : "✅";

        section += `#### ${viewport} ${icon}\n\n`;
        vpFindings.forEach((finding) => {
          section += `- **${finding.title}**: ${finding.description}\n`;
        });
        section += "\n";
      });
    }

    section += `**Responsive Score**: ${result.scores.responsive}/100\n`;

    return section;
  }

  /**
   * Generate visual design section
   */
  private static generateVisualDesignSection(result: AnalysisResult): string {
    let section = `## 3. Visual Design Assessment\n\n`;

    if (result.designSystem) {
      section += this.formatDesignSystem(result.designSystem);
    }

    const findings = result.findings.filter((f) => f.category === "visual");

    if (findings.length > 0) {
      section += `### Design Consistency Issues\n\n`;
      findings.forEach((finding) => {
        section += `- **${finding.title}**: ${finding.description}\n`;
      });
      section += "\n";
    }

    section += `**Visual Design Score**: ${result.scores.visual}/100\n`;

    return section;
  }

  /**
   * Generate UX evaluation section
   */
  private static generateUXSection(result: AnalysisResult): string {
    const findings = result.findings.filter((f) => f.category === "ux");

    let section = `## 4. User Experience Evaluation\n\n`;

    if (findings.length === 0) {
      section += `✅ **Excellent user experience!** No major usability issues found.\n\n`;
    } else {
      const categories = this.groupByUXCategory(findings);

      Object.entries(categories).forEach(([category, categoryFindings]) => {
        section += `### ${category}\n\n`;
        categoryFindings.forEach((finding) => {
          section += `- **${finding.title}** (${finding.severity})\n`;
          section += `  ${finding.description}\n`;
          if (finding.impact) {
            section += `  *Impact*: ${finding.impact}\n`;
          }
          section += "\n";
        });
      });
    }

    section += `**UX Score**: ${result.scores.ux}/100\n`;

    return section;
  }

  /**
   * Generate performance section
   */
  private static generatePerformanceSection(result: AnalysisResult): string {
    const findings = result.findings.filter((f) => f.category === "performance");

    let section = `## 5. Performance Analysis\n\n`;

    if (findings.length === 0) {
      section += `✅ **Good performance!** No major performance issues detected.\n\n`;
    } else {
      findings.forEach((finding) => {
        section += `- **${finding.title}**: ${finding.description}\n`;
      });
      section += "\n";
    }

    section += `**Performance Score**: ${result.scores.performance}/100\n`;

    return section;
  }

  /**
   * Generate recommendations section
   */
  private static generateRecommendations(result: AnalysisResult): string {
    const byPriority = {
      critical: result.recommendations.filter((r) => r.priority === "critical"),
      high: result.recommendations.filter((r) => r.priority === "high"),
      medium: result.recommendations.filter((r) => r.priority === "medium"),
      low: result.recommendations.filter((r) => r.priority === "low"),
    };

    let section = `## Recommendations by Priority\n\n`;

    if (byPriority.critical.length > 0) {
      section += `### 🔴 Critical (Fix Immediately)\n\n`;
      byPriority.critical.forEach((rec, idx) => {
        section += this.formatRecommendation(rec, idx + 1);
      });
    }

    if (byPriority.high.length > 0) {
      section += `### 🟡 High Priority (Fix Soon)\n\n`;
      byPriority.high.forEach((rec, idx) => {
        section += this.formatRecommendation(rec, idx + 1);
      });
    }

    if (byPriority.medium.length > 0) {
      section += `### 🟢 Medium Priority (Nice to Have)\n\n`;
      byPriority.medium.forEach((rec, idx) => {
        section += this.formatRecommendation(rec, idx + 1);
      });
    }

    if (byPriority.low.length > 0) {
      section += `### 🔵 Low Priority (Future Enhancement)\n\n`;
      byPriority.low.forEach((rec, idx) => {
        section += this.formatRecommendation(rec, idx + 1);
      });
    }

    return section;
  }

  /**
   * Generate appendix
   */
  private static generateAppendix(result: AnalysisResult): string {
    return `## Appendix: Technical Details

### Testing Environment
- **Browser**: Chromium (via Playwright MCP)
- **Analysis Date**: ${new Date(result.timestamp).toISOString()}
- **Screenshots Captured**: ${result.evidence.screenshots.length}
- **Snapshots Captured**: ${result.evidence.snapshots.length}

### Evidence
${result.evidence.screenshots
  .map((s) => `- Screenshot (${s.viewport}): \`${s.path}\``)
  .join("\n")}

${result.evidence.snapshots
  .map((s) => `- Accessibility Snapshot (${s.viewport}): \`${s.tree}\``)
  .join("\n")}

### Next Steps
1. [ ] Address critical accessibility violations
2. [ ] Fix responsive design breakpoints
3. [ ] Implement recommended improvements
4. [ ] Re-test after fixes
5. [ ] Conduct user testing for validation`;
  }

  /**
   * Format a single finding
   */
  private static formatFinding(finding: Finding, index: number): string {
    let formatted = `${index}. **${finding.title}**`;

    if (finding.wcagCriterion) {
      formatted += ` (WCAG ${finding.wcagCriterion})`;
    }

    formatted += `\n   - **Location**: ${finding.location || "General"}\n`;
    formatted += `   - **Description**: ${finding.description}\n`;

    if (finding.impact) {
      formatted += `   - **Impact**: ${finding.impact}\n`;
    }

    if (finding.evidence?.code) {
      formatted += `   - **Code Example**:\n     \`\`\`html\n     ${finding.evidence.code}\n     \`\`\`\n`;
    }

    formatted += "\n";

    return formatted;
  }

  /**
   * Format a recommendation
   */
  private static formatRecommendation(rec: Recommendation, index: number): string {
    let formatted = `${index}. **${rec.title}**\n`;
    formatted += `   - **Why**: ${rec.description}\n`;
    formatted += `   - **How**: ${rec.implementation}\n`;
    formatted += `   - **Effort**: ${rec.effort}\n`;

    if (rec.estimatedImpact) {
      formatted += `   - **Impact**: ${rec.estimatedImpact}\n`;
    }

    if (rec.codeExample) {
      formatted += `   - **Code Example**:\n`;
      formatted += `     \`\`\`html\n     <!-- Before -->\n     ${rec.codeExample.before}\n\n`;
      formatted += `     <!-- After -->\n     ${rec.codeExample.after}\n     \`\`\`\n`;
    }

    formatted += "\n";

    return formatted;
  }

  /**
   * Format design system
   */
  private static formatDesignSystem(ds: DesignSystem): string {
    let formatted = `### Design System Extracted\n\n`;

    if (ds.colors) {
      formatted += `**Color Palette**\n\`\`\`css\n`;
      formatted += `/* Primary Colors */\n`;
      ds.colors.primary.forEach((c, i) => {
        formatted += `--primary-${i + 1}: ${c};\n`;
      });
      formatted += `\n/* Semantic Colors */\n`;
      formatted += `--success: ${ds.colors.semantic.success};\n`;
      formatted += `--warning: ${ds.colors.semantic.warning};\n`;
      formatted += `--error: ${ds.colors.semantic.error};\n`;
      formatted += `\`\`\`\n\n`;
    }

    if (ds.typography) {
      formatted += `**Typography Scale**\n\`\`\`css\n`;
      Object.entries(ds.typography.scale).forEach(([key, style]) => {
        formatted += `${key}: ${style.fontSize}/${style.lineHeight}, ${style.fontWeight}\n`;
      });
      formatted += `\`\`\`\n\n`;
    }

    if (ds.spacing) {
      formatted += `**Spacing System**\n`;
      formatted += `- Base unit: ${ds.spacing.unit}px\n`;
      formatted += `- Pattern: ${ds.spacing.scale.join(", ")}\n\n`;
    }

    return formatted;
  }

  /**
   * Group findings by viewport
   */
  private static groupByViewport(findings: Finding[]): Record<string, Finding[]> {
    const groups: Record<string, Finding[]> = {
      "Desktop (1920×1080)": [],
      "Tablet (768×1024)": [],
      "Mobile (375×667)": [],
      Other: [],
    };

    findings.forEach((finding) => {
      const location = finding.location || "";
      if (location.includes("1920")) {
        groups["Desktop (1920×1080)"].push(finding);
      } else if (location.includes("768")) {
        groups["Tablet (768×1024)"].push(finding);
      } else if (location.includes("375")) {
        groups["Mobile (375×667)"].push(finding);
      } else {
        groups["Other"].push(finding);
      }
    });

    // Remove empty groups
    Object.keys(groups).forEach((key) => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
  }

  /**
   * Group UX findings by category
   */
  private static groupByUXCategory(findings: Finding[]): Record<string, Finding[]> {
    const categories: Record<string, Finding[]> = {};

    findings.forEach((finding) => {
      const category = finding.title.split(":")[0] || "General";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(finding);
    });

    return categories;
  }

  /**
   * Generate comparison report for multiple sites
   */
  static generateComparisonReport(comparison: ComparisonResult): string {
    let report = `# UI/UX Competitive Analysis\n\n`;
    report += `## Summary\n\n${comparison.summary}\n\n`;

    report += `## Overall Comparison\n\n`;
    report += `| Site | Accessibility | Responsive | Visual | UX | Overall | Rank |\n`;
    report += `|------|--------------|------------|--------|-----|---------|------|\n`;

    comparison.sites.forEach((site) => {
      const url = new URL(site.url).hostname.replace("www.", "");
      report += `| ${url} | ${site.scores.accessibility} | ${site.scores.responsive} | ${site.scores.visual} | ${site.scores.ux} | ${Math.round((site.scores.accessibility + site.scores.responsive + site.scores.visual + site.scores.ux) / 4)} | ${site.rank} |\n`;
    });

    report += `\n## Category Winners\n\n`;
    Object.entries(comparison.winner.byCategory).forEach(([category, url]) => {
      const domain = new URL(url).hostname.replace("www.", "");
      report += `- **${category}**: ${domain}\n`;
    });

    return report;
  }
}
