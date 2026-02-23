/**
 * Analysis Tools
 *
 * Custom analysis functions that process data from Playwright snapshots.
 * These are pure functions that don't require MCP - they analyze data structures.
 */

import {
  AccessibilityIssue,
  ContrastCheck,
  ResponsiveIssue,
  TouchTarget,
  UXIssue,
  Finding,
  Severity,
} from "../types/analysis";

/**
 * Accessibility Analyzer
 */
export class AccessibilityAnalyzer {
  /**
   * Calculate color contrast ratio (WCAG formula)
   */
  calculateContrast(foreground: string, background: string): ContrastCheck {
    const fgLuminance = this.getLuminance(foreground);
    const bgLuminance = this.getLuminance(background);

    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    // WCAG standards
    const wcagAA = ratio >= 4.5; // Normal text AA
    const wcagAAA = ratio >= 7; // Normal text AAA

    return {
      foreground,
      background,
      ratio: Math.round(ratio * 100) / 100,
      wcagAA,
      wcagAAA,
      fontSize: 16, // Default, should be passed in
      fontWeight: 400,
    };
  }

  /**
   * Validate heading hierarchy
   */
  validateHeadingHierarchy(headings: Array<{ level: number; text: string }>): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    if (headings.length === 0) {
      issues.push("No headings found on page");
      return { isValid: false, issues };
    }

    // Check for H1
    const h1Count = headings.filter((h) => h.level === 1).length;
    if (h1Count === 0) {
      issues.push("Missing H1 heading");
    } else if (h1Count > 1) {
      issues.push(`Multiple H1 headings found (${h1Count})`);
    }

    // Check for skipped levels
    for (let i = 1; i < headings.length; i++) {
      const prev = headings[i - 1].level;
      const curr = headings[i].level;

      if (curr - prev > 1) {
        issues.push(
          `Skipped heading level: H${prev} → H${curr} ("${headings[i].text.substring(0, 30)}...")`
        );
      }
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  }

  /**
   * Check ARIA validity
   */
  validateARIA(element: {
    role?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
  }): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Valid ARIA roles
    const validRoles = [
      "button",
      "link",
      "navigation",
      "main",
      "complementary",
      "banner",
      "contentinfo",
      "form",
      "search",
      "region",
      "article",
      "section",
    ];

    if (element.role && !validRoles.includes(element.role)) {
      issues.push(`Invalid ARIA role: "${element.role}"`);
    }

    // Check for accessible name
    if (element.role === "button" || element.role === "link") {
      if (!element.ariaLabel && !element.ariaLabelledBy) {
        issues.push(`${element.role} missing accessible name`);
      }
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  }

  /**
   * Calculate relative luminance (WCAG formula)
   */
  private getLuminance(color: string): number {
    const rgb = this.hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = rgb.map((channel) => {
      const sRGB = channel / 255;
      return sRGB <= 0.03928
        ? sRGB / 12.92
        : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Convert hex color to RGB
   */
  private hexToRgb(hex: string): [number, number, number] | null {
    // Remove # if present
    hex = hex.replace(/^#/, "");

    // Handle shorthand (#fff → #ffffff)
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  }
}

/**
 * Responsive Design Analyzer
 */
export class ResponsiveAnalyzer {
  /**
   * Evaluate touch target sizes (minimum 44x44px per Apple/Android guidelines)
   */
  evaluateTouchTargets(elements: Array<{ selector: string; width: number; height: number }>): {
    passing: TouchTarget[];
    failing: TouchTarget[];
  } {
    const MIN_SIZE = 44;
    const passing: TouchTarget[] = [];
    const failing: TouchTarget[] = [];

    elements.forEach((el) => {
      const meetsStandard = el.width >= MIN_SIZE && el.height >= MIN_SIZE;
      const target: TouchTarget = {
        selector: el.selector,
        width: el.width,
        height: el.height,
        meetsStandard,
      };

      if (meetsStandard) {
        passing.push(target);
      } else {
        failing.push(target);
      }
    });

    return { passing, failing };
  }

  /**
   * Analyze responsive breakpoints
   */
  analyzeBreakpoints(cssRules: string): {
    breakpoints: number[];
    coverage: "excellent" | "good" | "poor";
  } {
    // Extract media query breakpoints from CSS
    const mediaQueryRegex = /min-width:\s*(\d+)px/g;
    const breakpoints = new Set<number>();

    let match;
    while ((match = mediaQueryRegex.exec(cssRules)) !== null) {
      breakpoints.add(parseInt(match[1]));
    }

    const breakpointArray = Array.from(breakpoints).sort((a, b) => a - b);

    // Determine coverage quality
    let coverage: "excellent" | "good" | "poor";
    if (breakpointArray.length >= 3) {
      coverage = "excellent";
    } else if (breakpointArray.length === 2) {
      coverage = "good";
    } else {
      coverage = "poor";
    }

    return {
      breakpoints: breakpointArray,
      coverage,
    };
  }

  /**
   * Check for horizontal scroll issues
   */
  detectHorizontalScroll(viewport: { width: number }, contentWidth: number): boolean {
    return contentWidth > viewport.width;
  }
}

/**
 * Visual Design Analyzer
 */
export class VisualDesignAnalyzer {
  /**
   * Extract color palette from computed styles
   */
  extractColors(styles: Array<{ property: string; value: string }>): {
    unique: string[];
    mostUsed: Array<{ color: string; count: number }>;
  } {
    const colorRegex = /#[0-9a-f]{6}|#[0-9a-f]{3}|rgb\([^)]+\)|rgba\([^)]+\)/gi;
    const colorCounts = new Map<string, number>();

    styles.forEach((style) => {
      const matches = style.value.match(colorRegex);
      if (matches) {
        matches.forEach((color) => {
          const normalized = this.normalizeColor(color);
          colorCounts.set(normalized, (colorCounts.get(normalized) || 0) + 1);
        });
      }
    });

    const unique = Array.from(colorCounts.keys());
    const mostUsed = Array.from(colorCounts.entries())
      .map(([color, count]) => ({ color, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return { unique, mostUsed };
  }

  /**
   * Detect spacing patterns
   */
  detectSpacingSystem(margins: number[], paddings: number[]): {
    baseUnit: number;
    pattern: "8px-grid" | "4px-grid" | "custom" | "inconsistent";
    commonValues: number[];
  } {
    const allSpacing = [...margins, ...paddings].filter((v) => v > 0);
    const uniqueValues = Array.from(new Set(allSpacing)).sort((a, b) => a - b);

    // Try to detect grid system
    const isDivisibleBy = (values: number[], divisor: number) =>
      values.every((v) => v % divisor === 0);

    let pattern: "8px-grid" | "4px-grid" | "custom" | "inconsistent";
    let baseUnit: number;

    if (isDivisibleBy(uniqueValues, 8)) {
      pattern = "8px-grid";
      baseUnit = 8;
    } else if (isDivisibleBy(uniqueValues, 4)) {
      pattern = "4px-grid";
      baseUnit = 4;
    } else if (uniqueValues.length <= 8) {
      pattern = "custom";
      baseUnit = this.findGCD(uniqueValues);
    } else {
      pattern = "inconsistent";
      baseUnit = 1;
    }

    return {
      baseUnit,
      pattern,
      commonValues: uniqueValues.slice(0, 10),
    };
  }

  /**
   * Normalize color to standard format
   */
  private normalizeColor(color: string): string {
    // Convert rgb(a) to hex
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]).toString(16).padStart(2, "0");
      const g = parseInt(rgbMatch[2]).toString(16).padStart(2, "0");
      const b = parseInt(rgbMatch[3]).toString(16).padStart(2, "0");
      return `#${r}${g}${b}`;
    }

    // Ensure lowercase
    return color.toLowerCase();
  }

  /**
   * Find greatest common divisor
   */
  private findGCD(numbers: number[]): number {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    return numbers.reduce(gcd);
  }
}

/**
 * UX Pattern Analyzer
 */
export class UXAnalyzer {
  /**
   * Evaluate form usability
   */
  evaluateForm(form: {
    inputs: Array<{ type: string; hasLabel: boolean; hasError: boolean }>;
    hasValidation: boolean;
    hasErrorSummary: boolean;
  }): {
    score: number;
    issues: string[];
  } {
    const issues: string[] = [];
    let score = 100;

    // Check input labels
    const unlabeledInputs = form.inputs.filter((i) => !i.hasLabel);
    if (unlabeledInputs.length > 0) {
      issues.push(`${unlabeledInputs.length} input(s) missing labels`);
      score -= 20;
    }

    // Check validation
    if (!form.hasValidation) {
      issues.push("No client-side validation detected");
      score -= 15;
    }

    // Check error summary
    if (form.inputs.some((i) => i.hasError) && !form.hasErrorSummary) {
      issues.push("No error summary for screen readers");
      score -= 10;
    }

    return {
      score: Math.max(0, score),
      issues,
    };
  }

  /**
   * Evaluate navigation structure
   */
  evaluateNavigation(nav: {
    hasSkipLink: boolean;
    hasSearchBar: boolean;
    menuDepth: number;
    itemCount: number;
  }): {
    score: number;
    issues: string[];
  } {
    const issues: string[] = [];
    let score = 100;

    if (!nav.hasSkipLink) {
      issues.push("Missing skip to main content link");
      score -= 15;
    }

    if (nav.menuDepth > 3) {
      issues.push(`Navigation too deep (${nav.menuDepth} levels)`);
      score -= 10;
    }

    if (nav.itemCount > 10 && !nav.hasSearchBar) {
      issues.push("Many items but no search functionality");
      score -= 10;
    }

    return {
      score: Math.max(0, score),
      issues,
    };
  }
}

/**
 * Score calculator utilities
 */
export class ScoreCalculator {
  /**
   * Calculate overall accessibility score
   */
  static calculateAccessibilityScore(findings: Finding[]): number {
    const accessibilityFindings = findings.filter((f) => f.category === "accessibility");

    if (accessibilityFindings.length === 0) return 100;

    const weights = {
      critical: 20,
      high: 10,
      medium: 5,
      low: 2,
    };

    const deductions = accessibilityFindings.reduce((total, finding) => {
      return total + weights[finding.severity];
    }, 0);

    return Math.max(0, 100 - deductions);
  }

  /**
   * Calculate overall UX score
   */
  static calculateUXScore(findings: Finding[]): number {
    const uxFindings = findings.filter((f) => f.category === "ux");

    if (uxFindings.length === 0) return 100;

    const weights = {
      critical: 15,
      high: 8,
      medium: 4,
      low: 1,
    };

    const deductions = uxFindings.reduce((total, finding) => {
      return total + weights[finding.severity];
    }, 0);

    return Math.max(0, 100 - deductions);
  }

  /**
   * Determine overall rating from score
   */
  static getRating(score: number): "Excellent" | "Good" | "Fair" | "Poor" | "Critical" {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    if (score >= 60) return "Poor";
    return "Critical";
  }
}
