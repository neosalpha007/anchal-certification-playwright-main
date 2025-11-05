import { defineConfig, devices } from '@playwright/test';

const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

// Define LambdaTest connection URL (CDP endpoint)
const ltCapabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 11',
    build: 'LambdaTest Build - Playwright Demo',
    name: 'Playwright Test Execution',
    user: LT_USERNAME,
    accessKey: LT_ACCESS_KEY,
    network: true,
    video: true,
    console: true,
    tunnel: false, // set to true if testing local URLs via LambdaTest tunnel
  },
};

export default defineConfig({
  testDir: './tests',              // Folder where your test specs are located
  timeout: 30 * 1000,              // 30 seconds per test
  retries: 0,                      // Set >0 for retrying flaky tests
  reporter: [['html', { open: 'never' }], ['list']], // Generates HTML + CLI output
  workers: 4,                      // Parallel execution

  use: {
    baseURL: 'https://www.lambdatest.com/selenium-playground',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    // 👇 Connect Playwright to LambdaTest cloud
    connectOptions: {
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(ltCapabilities)
      )}`,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
