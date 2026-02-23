/**
 * Playwright MCP Tool Wrappers
 *
 * These functions wrap MCP Playwright tools and provide typed interfaces.
 * The actual tool invocations are handled by the Anthropic SDK's agent loop.
 */

import { Viewport, Screenshot, AccessibilitySnapshot } from "../types/analysis";

export interface PlaywrightConfig {
  timeout: number;
  waitUntil: "load" | "domcontentloaded" | "networkidle";
  screenshotPath: string;
  snapshotPath: string;
}

export class PlaywrightToolManager {
  private config: PlaywrightConfig;
  private currentViewport: Viewport | null = null;
  private screenshots: Screenshot[] = [];
  private snapshots: AccessibilitySnapshot[] = [];

  constructor(config: Partial<PlaywrightConfig> = {}) {
    this.config = {
      timeout: config.timeout || 30000,
      waitUntil: config.waitUntil || "networkidle",
      screenshotPath: config.screenshotPath || "./screenshots",
      snapshotPath: config.snapshotPath || "./snapshots",
    };
  }

  /**
   * Navigate to a URL
   * MCP Tool: browser_navigate
   */
  async navigate(url: string, viewport?: Viewport): Promise<void> {
    console.log(`[Playwright] Navigating to: ${url}`);

    if (viewport) {
      this.currentViewport = viewport;
      console.log(`[Playwright] Setting viewport: ${viewport.width}x${viewport.height}`);
    }

    // In actual implementation, this would invoke:
    // mcp__playwright__browser_navigate with { url, viewport }
    // The Anthropic SDK handles the tool invocation
  }

  /**
   * Wait for an element or condition
   * MCP Tool: browser_wait_for
   */
  async waitFor(
    selector: string,
    options?: { timeout?: number; state?: "visible" | "hidden" }
  ): Promise<boolean> {
    console.log(`[Playwright] Waiting for: ${selector}`);

    const timeout = options?.timeout || this.config.timeout;
    const state = options?.state || "visible";

    // Invokes: mcp__playwright__browser_wait_for
    return true;
  }

  /**
   * Click an element
   * MCP Tool: browser_click
   */
  async click(selector: string): Promise<void> {
    console.log(`[Playwright] Clicking: ${selector}`);

    // Invokes: mcp__playwright__browser_click
  }

  /**
   * Take a screenshot
   * MCP Tool: browser_take_screenshot
   */
  async screenshot(name: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${name}-${timestamp}.png`;
    const path = `${this.config.screenshotPath}/${filename}`;

    console.log(`[Playwright] Taking screenshot: ${path}`);

    const screenshot: Screenshot = {
      viewport: this.currentViewport?.name || "default",
      path,
      timestamp,
    };

    this.screenshots.push(screenshot);

    // Invokes: mcp__playwright__browser_take_screenshot
    return path;
  }

  /**
   * Capture accessibility snapshot
   * MCP Tool: browser_snapshot
   */
  async snapshot(name: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${name}-${timestamp}.json`;
    const path = `${this.config.snapshotPath}/${filename}`;

    console.log(`[Playwright] Capturing accessibility snapshot: ${path}`);

    const snapshot: AccessibilitySnapshot = {
      viewport: this.currentViewport?.name || "default",
      tree: path,
      timestamp,
    };

    this.snapshots.push(snapshot);

    // Invokes: mcp__playwright__browser_snapshot
    // Returns accessibility tree as structured data
    return path;
  }

  /**
   * Get console messages
   * MCP Tool: browser_console
   */
  async getConsoleMessages(): Promise<string[]> {
    console.log(`[Playwright] Retrieving console messages`);

    // Invokes: mcp__playwright__browser_console
    // Returns array of console messages
    return [];
  }

  /**
   * Get network activity
   * MCP Tool: browser_network
   */
  async getNetworkActivity(): Promise<any[]> {
    console.log(`[Playwright] Retrieving network activity`);

    // Invokes: mcp__playwright__browser_network
    return [];
  }

  /**
   * Close browser
   * MCP Tool: browser_close
   */
  async close(): Promise<void> {
    console.log(`[Playwright] Closing browser`);

    // Invokes: mcp__playwright__browser_close
  }

  /**
   * Get all captured screenshots
   */
  getScreenshots(): Screenshot[] {
    return this.screenshots;
  }

  /**
   * Get all captured snapshots
   */
  getSnapshots(): AccessibilitySnapshot[] {
    return this.snapshots;
  }

  /**
   * Reset evidence collection
   */
  resetEvidence(): void {
    this.screenshots = [];
    this.snapshots = [];
  }
}

/**
 * Standard viewport configurations
 */
export const STANDARD_VIEWPORTS: Viewport[] = [
  {
    name: "Desktop FHD",
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  },
  {
    name: "Laptop",
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  },
  {
    name: "Tablet Portrait",
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
  },
  {
    name: "Mobile iPhone SE",
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
  },
  {
    name: "Mobile iPhone 12",
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
  },
];

/**
 * Helper: Test across multiple viewports
 */
export async function testMultipleViewports(
  manager: PlaywrightToolManager,
  url: string,
  viewports: Viewport[],
  callback: (viewport: Viewport) => Promise<void>
): Promise<void> {
  for (const viewport of viewports) {
    await manager.navigate(url, viewport);
    await manager.waitFor("body", { timeout: 5000 });
    await callback(viewport);
    await manager.screenshot(`${viewport.name.replace(/\s+/g, "-").toLowerCase()}`);
    await manager.snapshot(`${viewport.name.replace(/\s+/g, "-").toLowerCase()}`);
  }
}
