/**
 * Example: Batch analyze multiple websites
 */

import { batchAnalyzeWebsites, generateReport } from "../index";

async function main() {
  // List of URLs to analyze (can be loaded from file)
  const urls = [
    "https://example.com",
    "https://github.com",
    "https://stripe.com",
    // Add more URLs as needed
  ];

  console.log(`📊 Batch analyzing ${urls.length} websites...\n`);

  try {
    // Run batch analysis
    const results = await batchAnalyzeWebsites(urls, {
      focusAreas: ["accessibility", "responsive"],
      outputFormat: "summary",
    });

    // Generate individual reports
    for (const result of results) {
      const domain = new URL(result.url).hostname.replace("www.", "");
      const timestamp = new Date().toISOString().split("T")[0];
      const reportPath = `./reports/batch-${domain}-${timestamp}.md`;

      await generateReport(result, reportPath);

      console.log(`✅ ${domain}: ${result.overallScore}/100 → ${reportPath}`);
    }

    // Generate summary report
    const summary = results
      .map((r) => {
        const domain = new URL(r.url).hostname.replace("www.", "");
        return `## ${domain}\n\n- Overall: ${r.overallScore}/100\n- Accessibility: ${r.scores.accessibility}/100\n- Responsive: ${r.scores.responsive}/100\n- Findings: ${r.findings.length}\n`;
      })
      .join("\n");

    const summaryPath = `./reports/batch-summary-${new Date().toISOString().split("T")[0]}.md`;
    const fs = await import("fs/promises");
    await fs.writeFile(
      summaryPath,
      `# Batch Analysis Summary\n\n${summary}`,
      "utf-8"
    );

    console.log(`\n📄 Summary report: ${summaryPath}\n`);
  } catch (error) {
    console.error("❌ Batch analysis failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export default main;
