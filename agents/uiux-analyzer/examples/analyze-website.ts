/**
 * Example: Analyze a single website
 */

import {
  analyzeWebsiteUX,
  generateReport,
  STANDARD_VIEWPORTS,
} from "../index";

async function main() {
  const url = process.argv[2] || "https://example.com";

  console.log(`🔍 Analyzing: ${url}\n`);

  try {
    // Run analysis
    const result = await analyzeWebsiteUX({
      url,
      focusAreas: ["all"],
      viewports: STANDARD_VIEWPORTS,
      outputFormat: "detailed",
    });

    // Generate and save report
    const domain = new URL(url).hostname.replace("www.", "");
    const timestamp = new Date().toISOString().split("T")[0];
    const reportPath = `./reports/${domain}-${timestamp}.md`;

    await generateReport(result, reportPath);

    // Print summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 ANALYSIS SUMMARY");
    console.log("=".repeat(60));
    console.log(`\nURL: ${result.url}`);
    console.log(`Overall Score: ${result.overallScore}/100\n`);

    console.log("Category Scores:");
    console.log(`  • Accessibility: ${result.scores.accessibility}/100`);
    console.log(`  • Responsive Design: ${result.scores.responsive}/100`);
    console.log(`  • Visual Design: ${result.scores.visual}/100`);
    console.log(`  • User Experience: ${result.scores.ux}/100`);
    console.log(`  • Performance: ${result.scores.performance}/100\n`);

    console.log("Issues Found:");
    console.log(
      `  • Critical: ${result.findings.filter((f) => f.severity === "critical").length}`
    );
    console.log(
      `  • High: ${result.findings.filter((f) => f.severity === "high").length}`
    );
    console.log(
      `  • Medium: ${result.findings.filter((f) => f.severity === "medium").length}`
    );
    console.log(
      `  • Low: ${result.findings.filter((f) => f.severity === "low").length}\n`
    );

    console.log(`Recommendations: ${result.recommendations.length}\n`);
    console.log(`📄 Full report saved to: ${reportPath}\n`);
    console.log("=".repeat(60) + "\n");
  } catch (error) {
    console.error("❌ Analysis failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export default main;
