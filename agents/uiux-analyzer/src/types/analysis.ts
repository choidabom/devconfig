/**
 * UI/UX Analysis Type Definitions
 */

export interface AnalysisRequest {
  url: string;
  focusAreas?: FocusArea[];
  viewports?: Viewport[];
  outputPath?: string;
  outputFormat?: "detailed" | "summary";
  compareWith?: string[]; // URLs to compare against
}

export type FocusArea =
  | "accessibility"
  | "responsive"
  | "visual"
  | "ux"
  | "performance"
  | "all";

export interface Viewport {
  name: string;
  width: number;
  height: number;
  deviceScaleFactor?: number;
}

export interface AnalysisResult {
  url: string;
  timestamp: string;
  summary: string;
  overallScore: number;
  scores: CategoryScores;
  findings: Finding[];
  recommendations: Recommendation[];
  designSystem?: DesignSystem;
  evidence: Evidence;
}

export interface CategoryScores {
  accessibility: number; // 0-100
  responsive: number; // 0-100
  visual: number; // 0-100
  ux: number; // 0-100
  performance: number; // 0-100
}

export interface Finding {
  id: string;
  category: FocusArea;
  severity: Severity;
  title: string;
  description: string;
  location?: string; // CSS selector or page section
  wcagCriterion?: string; // e.g., "1.4.3 Contrast (Minimum)"
  impact: string;
  affectedUsers?: string[];
  evidence?: {
    screenshot?: string;
    snapshot?: string;
    code?: string;
  };
}

export type Severity = "critical" | "high" | "medium" | "low";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  category: FocusArea;
  effort: "low" | "medium" | "high";
  implementation: string;
  codeExample?: {
    before: string;
    after: string;
  };
  estimatedImpact: string;
}

export interface DesignSystem {
  colors: ColorPalette;
  typography: Typography;
  spacing: SpacingSystem;
  components: ComponentLibrary;
}

export interface ColorPalette {
  primary: string[];
  secondary: string[];
  accent: string[];
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  neutrals: string[];
}

export interface Typography {
  fontFamilies: {
    heading: string;
    body: string;
    mono?: string;
  };
  scale: {
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    h4: TypographyStyle;
    h5: TypographyStyle;
    h6: TypographyStyle;
    body: TypographyStyle;
    small: TypographyStyle;
  };
}

export interface TypographyStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing?: string;
}

export interface SpacingSystem {
  unit: number; // base unit in px
  scale: number[]; // multipliers
  common: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
}

export interface ComponentLibrary {
  [componentName: string]: ComponentSpec;
}

export interface ComponentSpec {
  variants: string[];
  states: string[];
  properties: Record<string, any>;
}

export interface Evidence {
  screenshots: Screenshot[];
  snapshots: AccessibilitySnapshot[];
  consoleErrors: string[];
  networkIssues: string[];
}

export interface Screenshot {
  viewport: string;
  path: string;
  timestamp: string;
}

export interface AccessibilitySnapshot {
  viewport: string;
  tree: string;
  timestamp: string;
}

/**
 * Accessibility-specific types
 */

export interface AccessibilityIssue {
  type: AccessibilityIssueType;
  severity: Severity;
  wcagLevel: "A" | "AA" | "AAA";
  criterion: string;
  description: string;
  element: string;
  recommendation: string;
}

export type AccessibilityIssueType =
  | "color-contrast"
  | "heading-hierarchy"
  | "missing-alt"
  | "form-label"
  | "keyboard-trap"
  | "aria-invalid"
  | "focus-indicator"
  | "semantic-markup"
  | "link-text"
  | "tab-order";

export interface ContrastCheck {
  foreground: string;
  background: string;
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  fontSize: number;
  fontWeight: number;
}

/**
 * Responsive design types
 */

export interface ResponsiveIssue {
  viewport: string;
  type: ResponsiveIssueType;
  description: string;
  element?: string;
  recommendation: string;
}

export type ResponsiveIssueType =
  | "horizontal-scroll"
  | "broken-layout"
  | "small-touch-target"
  | "overlapping-content"
  | "missing-breakpoint"
  | "poor-text-sizing";

export interface TouchTarget {
  selector: string;
  width: number;
  height: number;
  meetsStandard: boolean; // 44x44px minimum
}

/**
 * UX evaluation types
 */

export interface UXIssue {
  type: UXIssueType;
  severity: Severity;
  description: string;
  location: string;
  userImpact: string;
  recommendation: string;
}

export type UXIssueType =
  | "unclear-navigation"
  | "poor-error-handling"
  | "missing-feedback"
  | "confusing-cta"
  | "poor-form-ux"
  | "slow-interaction"
  | "missing-loading-state"
  | "unclear-hierarchy";

/**
 * Comparison types (for competitive analysis)
 */

export interface ComparisonResult {
  sites: SiteComparison[];
  summary: string;
  winner: {
    overall: string;
    byCategory: Record<FocusArea, string>;
  };
}

export interface SiteComparison {
  url: string;
  scores: CategoryScores;
  rank: number;
  strengths: string[];
  weaknesses: string[];
}
