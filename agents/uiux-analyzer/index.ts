/**
 * UI/UX Analyzer Agent - Main Export
 */

export {
  analyzeWebsiteUX,
  batchAnalyzeWebsites,
  generateReport,
  compareWebsites,
} from "./agent";

export type {
  AnalysisRequest,
  AnalysisResult,
  Finding,
  Recommendation,
  CategoryScores,
  FocusArea,
  Viewport,
  DesignSystem,
  AccessibilityIssue,
  ResponsiveIssue,
  UXIssue,
  ComparisonResult,
} from "./src/types/analysis";

export {
  PlaywrightToolManager,
  STANDARD_VIEWPORTS,
} from "./src/tools/playwright-tools";

export {
  AccessibilityAnalyzer,
  ResponsiveAnalyzer,
  VisualDesignAnalyzer,
  UXAnalyzer,
  ScoreCalculator,
} from "./src/tools/analysis-tools";

export { ReportGenerator } from "./src/utils/report-generator";
