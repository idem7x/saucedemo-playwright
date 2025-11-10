import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     */
    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Wait for page to load
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState();
    }

    /**
     * Get element by locator
     */
    getElement(selector: string): Locator {
        return this.page.locator(selector);
    }

    /**
     * Click on element
     */
    async click(selector: string): Promise<void> {
        await this.page.locator(selector).click();
    }

    /**
     * Fill input field
     */
    async fill(selector: string, text: string): Promise<void> {
        await this.page.locator(selector).fill(text);
    }

    /**
     * Get text content
     */
    async getText(selector: string): Promise<string> {
        return await this.page.locator(selector).textContent() || '';
    }

    /**
     * Check if element is visible
     */
    async isVisible(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isVisible();
    }

    /**
     * Wait for selector to be visible
     */
    async waitForSelector(selector: string, timeout?: number): Promise<void> {
        await this.page.locator(selector).waitFor({
            state: 'visible',
            timeout: timeout
        });
    }

    /**
     * Get current URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Wait for specific amount of time
     */
    async wait(milliseconds: number): Promise<void> {
        await this.page.waitForTimeout(milliseconds);
    }
}