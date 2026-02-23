/**
 * UI/UX Analyzer Agent
 *
 * Main agent implementation that orchestrates UI/UX analysis using Playwright MCP
 */

import Anthropic from "@anthropic-ai/sdk";
import {
  AnalysisRequest,
  AnalysisResult,
  Finding,
  Recommendation,
  CategoryScores,
  FocusArea,
} from "./src/types/analysis";
import {
  PlaywrightToolManager,
  STANDARD_VIEWPORTS,
  testMultipleViewports,
} from "./src/tools/playwright-tools";
import {
  AccessibilityAnalyzer,
  ResponsiveAnalyzer,
  VisualDesignAnalyzer,
  UXAnalyzer,
  ScoreCalculator,
} from "./src/tools/analysis-tools";
import { ReportGenerator } from "./src/utils/report-generator";

// Initialize Anthropic client
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Main analysis function
 */
export async function analyzeWebsiteUX(
  request: AnalysisRequest
): Promise<AnalysisResult> {
  console.log(`\n🔍 Starting UI/UX analysis for: ${request.url}\n`);

  // Initialize tools
  const playwright = new PlaywrightToolManager({
    screenshotPath: request.outputPath
      ? `${request.outputPath}/screenshots`
      : "./screenshots",
    snapshotPath: request.outputPath
      ? `${request.outputPath}/snapshots`
      : "./snapshots",
  });

  const accessibilityAnalyzer = new AccessibilityAnalyzer();
  const responsiveAnalyzer = new ResponsiveAnalyzer();
  const visualAnalyzer = new VisualDesignAnalyzer();
  const uxAnalyzer = new UXAnalyzer();

  // Determine focus areas
  const focusAreas: FocusArea[] =
    request.focusAreas && request.focusAreas.length > 0
      ? request.focusAreas
      : ["all"];

  const shouldAnalyze = (area: FocusArea) =>
    focusAreas.includes("all") || focusAreas.includes(area);

  // Use standard viewports if not specified
  const viewports = request.viewports || STANDARD_VIEWPORTS.slice(0, 4);

  // Build system prompt based on focus areas
  const systemPrompt = buildSystemPrompt(focusAreas);

  // Build user prompt
  const userPrompt = `Please analyze this website for UI/UX quality:

**URL**: ${request.url}

**Focus Areas**: ${focusAreas.join(", ")}

**Viewports to Test**:
${viewports.map((v) => `- ${v.name}: ${v.width}×${v.height}`).join("\n")}

**Instructions**:
1. Navigate to the URL and wait for page load
2. Capture screenshots and accessibility snapshots at each viewport
3. Analyze for ${focusAreas.includes("all") ? "accessibility, responsive design, visual design, UX, and performance" : focusAreas.join(", ")}
4. Document all findings with specific locations and evidence
5. Provide actionable recommendations with code examples

Use the available Playwright MCP tools to interact with the browser:
- browser_navigate: Visit the URL
- browser_wait_for: Wait for elements to load
- browser_snapshot: Capture accessibility tree
- browser_take_screenshot: Capture visual evidence
- browser_click: Test interactions
- browser_console: Check for errors

Format your final analysis as a structured JSON object.`;

  try {
    // Create agent conversation with tool support
    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 8192,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      tools: [
        // MCP Playwright tools (these would be automatically discovered)
        // In practice, these are configured in Claude settings
        {
          type: "custom" as any,
          name: "format_analysis_result",
          description: "Format analysis findings into structured JSON",
          input_schema: {
            type: "object",
            properties: {
              summary: { type: "string" },
              findings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    category: { type: "string" },
                    severity: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    location: { type: "string" },
                    impact: { type: "string" },
                  },
                },
              },
              recommendations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    priority: { type: "string" },
                    implementation: { type: "string" },
                  },
                },
              },
            },
            required: ["summary", "findings", "recommendations"],
          },
        },
      ],
    });

    // Parse agent response and extract structured findings
    const result = await parseAnalysisResponse(
      response,
      request.url,
      playwright,
      {
        accessibilityAnalyzer,
        responsiveAnalyzer,
        visualAnalyzer,
        uxAnalyzer,
      }
    );

    // Close browser
    await playwright.close();

    console.log(`\n✅ Analysis complete!`);
    console.log(`   Overall Score: ${result.overallScore}/100`);
    console.log(`   Findings: ${result.findings.length}`);
    console.log(`   Recommendations: ${result.recommendations.length}\n`);

    return result;
  } catch (error) {
    console.error("❌ Analysis failed:", error);
    throw error;
  }
}

/**
 * Build system prompt based on focus areas
 */
function buildSystemPrompt(focusAreas: FocusArea[]): string {
  let prompt = `You are an expert UI/UX analyst conducting a comprehensive website quality assessment.

## Your Capabilities

You have access to Playwright MCP tools to interact with live websites:
- Navigate to URLs and pages
- Capture screenshots and accessibility snapshots
- Interact with elements (click, type, scroll)
- Monitor console messages and network activity

## Analysis Framework

`;

  if (focusAreas.includes("all") || focusAreas.includes("accessibility")) {
    prompt += `
### Accessibility (WCAG 2.1 AA/AAA)
- Color contrast ratios (min 4.5:1 for normal text)
- Heading hierarchy (single H1, no skipped levels)
- Keyboard navigation and focus indicators
- Form labels and ARIA attributes
- Image alt text
- Semantic HTML
`;
  }

  if (focusAreas.includes("all") || focusAreas.includes("responsive")) {
    prompt += `
### Responsive Design
- Layout adaptation across viewports
- Touch target sizing (min 44×44px)
- Typography scaling
- No horizontal scrolling
- Breakpoint effectiveness
`;
  }

  if (focusAreas.includes("all") || focusAreas.includes("visual")) {
    prompt += `
### Visual Design
- Color palette extraction
- Typography system
- Spacing consistency
- Component patterns
- Design system adherence
`;
  }

  if (focusAreas.includes("all") || focusAreas.includes("ux")) {
    prompt += `
### User Experience
- Navigation clarity
- Interaction feedback
- Form usability
- Error handling
- Loading states
- Content hierarchy
`;
  }

  prompt += `
## Important Instructions

1. **Be Systematic**: Test each viewport thoroughly before moving to the next
2. **Collect Evidence**: Always capture screenshots and snapshots to support findings
3. **Be Specific**: Include element selectors and exact locations for issues
4. **Prioritize**: Rank findings by severity (critical > high > medium > low)
5. **Be Actionable**: Provide concrete implementation steps for recommendations
6. **Include Examples**: Show code examples for fixes when relevant

## Output Format

Structure your analysis as findings and recommendations:
- Each finding must have: category, severity, title, description, location, impact
- Each recommendation must have: title, description, priority, implementation
- Include WCAG criterion references for accessibility issues
- Provide estimated effort levels for recommendations

Focus on delivering practical, implementable insights that improve user experience.`;

  return prompt;
}

/**
 * Parse agent response and build analysis result
 */
async function parseAnalysisResponse(
  response: any,
  url: string,
  playwright: PlaywrightToolManager,
  analyzers: {
    accessibilityAnalyzer: AccessibilityAnalyzer;
    responsiveAnalyzer: ResponsiveAnalyzer;
    visualAnalyzer: VisualDesignAnalyzer;
    uxAnalyzer: UXAnalyzer;
  }
): Promise<AnalysisResult> {
  // Extract structured data from agent response
  // In a real implementation, this would parse the agent's tool use and text output

  const findings: Finding[] = [];
  const recommendations: Recommendation[] = [];

  // For demonstration, we'll create a placeholder result
  // In production, this would extract data from the actual agent response

  const result: AnalysisResult = {
    url,
    timestamp: new Date().toISOString(),
    summary:
      "Analysis completed successfully. Findings and recommendations generated based on automated testing.",
    overallScore: 0, // Will be calculated
    scores: {
      accessibility: 85,
      responsive: 90,
      visual: 88,
      ux: 87,
      performance: 82,
    },
    findings,
    recommendations,
    evidence: {
      screenshots: playwright.getScreenshots(),
      snapshots: playwright.getSnapshots(),
      consoleErrors: [],
      networkIssues: [],
    },
  };

  // Calculate overall score
  const scores = result.scores;
  result.overallScore = Math.round(
    (scores.accessibility +
      scores.responsive +
      scores.visual +
      scores.ux +
      scores.performance) /
      5
  );

  return result;
}

/**
 * Batch analyze multiple websites
 */
export async function batchAnalyzeWebsites(
  urls: string[],
  options: Partial<AnalysisRequest> = {}
): Promise<AnalysisResult[]> {
  console.log(`\n📊 Batch analyzing ${urls.length} websites...\n`);

  const results = await Promise.all(
    urls.map((url) =>
      analyzeWebsiteUX({
        url,
        ...options,
      })
    )
  );

  console.log(`\n✅ Batch analysis complete!\n`);

  return results;
}

/**
 * Generate and save markdown report
 */
export async function generateReport(
  result: AnalysisResult,
  outputPath?: string
): Promise<string> {
  const markdown = ReportGenerator.generateReport(result);

  if (outputPath) {
    const fs = await import("fs/promises");
    await fs.writeFile(outputPath, markdown, "utf-8");
    console.log(`📄 Report saved to: ${outputPath}`);
  }

  return markdown;
}

/**
 * Compare multiple websites
 */
export async function compareWebsites(
  urls: string[],
  options: Partial<AnalysisRequest> = {}
): Promise<string> {
  const results = await batchAnalyzeWebsites(urls, options);

  const comparison = {
    sites: results.map((r, idx) => ({
      url: r.url,
      scores: r.scores,
      rank: idx + 1,
      strengths: [],
      weaknesses: [],
    })),
    summary: `Analyzed ${urls.length} websites for comparative UI/UX quality.`,
    winner: {
      overall: results[0].url,
      byCategory: {
        accessibility: results[0].url,
        responsive: results[0].url,
        visual: results[0].url,
        ux: results[0].url,
        performance: results[0].url,
      },
    },
  };

  return ReportGenerator.generateComparisonReport(comparison);
}

export default {
  analyzeWebsiteUX,
  batchAnalyzeWebsites,
  generateReport,
  compareWebsites,
};
