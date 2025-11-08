import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 4 : 6,
  timeout: 30000,

  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  projects: [
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts'
    },
    {
      name: 'standard-user',
      testDir: './tests/standarduser',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/standard_user.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'problem-user',
      testDir: './tests/problemuser',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/problem_user.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'performance-user',
      testDir: './tests/performanceuser',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/performance_glitch_user.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'error-user',
      testDir: './tests/erroruser',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/error_user.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'visual-user',
      testDir: './tests/visualuser',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/visual_user.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'locked-out-user',
      testDir: './tests/lockedoutuser',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});