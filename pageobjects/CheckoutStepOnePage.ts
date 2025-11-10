import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

export class CheckoutStepOnePage extends BasePage {
    readonly navigation: NavigationComponent;
    readonly pageTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    readonly errorButton: Locator;

    constructor(page: Page) {
        super(page);
        this.navigation = new NavigationComponent(page);
        this.pageTitle = page.locator('.title');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.errorButton = page.locator('.error-button');
    }

    /**
     * Navigate to checkout step one page
     */
    async goToCheckoutStepOne(): Promise<void> {
        await this.goto('/checkout-step-one.html');
    }

    /**
     * Fill first name
     */
    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Fill last name
     */
    async fillLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Fill postal code
     */
    async fillPostalCode(postalCode: string): Promise<void> {
        await this.postalCodeInput.fill(postalCode);
    }

    /**
     * Fill all checkout information
     */
    async fillCheckoutInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }

    /**
     * Click continue button
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    /**
     * Click cancel button
     */
    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    /**
     * Complete checkout step one
     */
    async completeCheckoutStepOne(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.fillCheckoutInformation(firstName, lastName, postalCode);
        await this.clickContinue();
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
     * Get page title
     */
    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    /**
     * Wait for checkout page to load
     */
    async waitForCheckoutPageLoad(): Promise<void> {
        await this.pageTitle.waitFor({ state: 'visible' });
        await this.continueButton.waitFor({ state: 'visible' });
    }

    /**
     * Check if all fields are filled
     */
    async areAllFieldsFilled(): Promise<boolean> {
        const firstName = await this.firstNameInput.inputValue();
        const lastName = await this.lastNameInput.inputValue();
        const postalCode = await this.postalCodeInput.inputValue();

        return firstName !== '' && lastName !== '' && postalCode !== '';
    }

    /**
     * Clear all fields
     */
    async clearAllFields(): Promise<void> {
        await this.firstNameInput.clear();
        await this.lastNameInput.clear();
        await this.postalCodeInput.clear();
    }
}