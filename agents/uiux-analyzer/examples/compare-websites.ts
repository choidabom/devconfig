/**
 * Example: Compare multiple websites
 */

import { compareWebsites } from "../index";

async function main() {
  const urls = process.argv.slice(2);

  if (urls.length < 2) {
    console.log("Usage: ts-node compare-websites.ts <url1> <url2> [url3...]");
    console.log(
      "\nExample: ts-node compare-websites.ts https://example.com https://competitor.com"
    );
    process.exit(1);
  }

  console.log(`📊 Comparing ${urls.length} websites:\n`);
  urls.forEach((url, idx) => {
    console.log(`  ${idx + 1}. ${url}`);
  });
  console.log();

  try {
    // Run comparative analysis
    const comparisonReport = await compareWebsites(urls, {
      focusAreas: ["accessibility", "responsive", "visual", "ux"],
      outputFormat: "summary",
    });

    // Save comparison report
    const timestamp = new Date().toISOString().split("T")[0];
    const reportPath = `./reports/comparison-${timestamp}.md`;

    const fs = await import("fs/promises");
    await fs.writeFile(reportPath, comparisonReport, "utf-8");

    console.log(`\n✅ Comparison complete!`);
    console.log(`📄 Report saved to: ${reportPath}\n`);

    // Print to console as well
    console.log(comparisonReport);
  } catch (error) {
    console.error("❌ Comparison failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export default main;
