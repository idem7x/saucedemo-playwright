import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly errorMessageContainer: Locator;
    readonly errorButton: Locator;
    readonly logo: Locator;
    readonly botImage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
        this.errorMessageContainer = page.locator('[class="error-message-container error"]');
        this.errorButton = page.locator('.error-button');
        this.logo = page.locator('.login_logo');
        this.botImage = page.locator('.bot_column');
    }

    /**
     * Navigate to login page
     */
    async goToLoginPage(): Promise<void> {
        await this.goto('/');
    }

    /**
     * Fill username
     */
    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    /**
     * Fill password
     */
    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Click login button
     */
    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    /**
     * Perform login with username and password
     */
    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Check if error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        try {
            return await this.errorMessage.isVisible({ timeout: 2000 });
        } catch {
            return false;
        }
    }

    /**
     * Get error message text
     */
    async getErrorMessageText(): Promise<string> {
        if (await this.isErrorMessageVisible()) {
            return await this.errorMessage.textContent() || '';
        }
        return '';
    }

    /**
     * Close error message
     */
    async closeErrorMessage(): Promise<void> {
        if (await this.isErrorMessageVisible()) {
            await this.errorButton.click();
        }
    }

    /**
     * Get error message background color
     */
    async getErrorMessageBackgroundColor(): Promise<string> {
        return await this.errorMessageContainer.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
        });
    }

    /**
     * Get error message CSS property
     */
    async getErrorMessageCSSProperty(property: string): Promise<string> {
        return await this.errorMessageContainer.evaluate((el, prop) => {
            return window.getComputedStyle(el).getPropertyValue(prop);
        }, property);
    }

    /**
     * Check if user is on login page
     */
    async isOnLoginPage(): Promise<boolean> {
        const url = this.getCurrentUrl();
        return !url.includes('inventory') && await this.loginButton.isVisible();
    }

    /**
     * Check if redirected to inventory page
     */
    async isRedirectedToInventory(): Promise<boolean> {
        const url = this.getCurrentUrl();
        return url.includes('inventory');
    }

    /**
     * Wait for login page to load
     */
    async waitForLoginPageLoad(): Promise<void> {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.usernameInput.waitFor({ state: 'visible' });
    }

    /**
     * Clear username field
     */
    async clearUsername(): Promise<void> {
        await this.usernameInput.clear();
    }

    /**
     * Clear password field
     */
    async clearPassword(): Promise<void> {
        await this.passwordInput.clear();
    }

    /**
     * Clear all fields
     */
    async clearAllFields(): Promise<void> {
        await this.clearUsername();
        await this.clearPassword();
    }

    /**
     * Get username input value
     */
    async getUsernameValue(): Promise<string> {
        return await this.usernameInput.inputValue();
    }

    /**
     * Get password input value
     */
    async getPasswordValue(): Promise<string> {
        return await this.passwordInput.inputValue();
    }

    /**
     * Check if login button is enabled
     */
    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled();
    }

    /**
     * Get logo text
     */
    async getLogoText(): Promise<string> {
        return await this.logo.textContent() || '';
    }
}