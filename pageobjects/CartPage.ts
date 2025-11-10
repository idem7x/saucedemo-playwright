import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

export class CartPage extends BasePage {
    readonly navigation: NavigationComponent;
    readonly pageTitle: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly removeButtons: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.navigation = new NavigationComponent(page);
        this.pageTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.removeButtons = page.locator('[id^="remove-"]');
        this.errorMessage = page.locator('.error-message');
    }

    /**
     * Navigate to cart page
     */
    async goToCart(): Promise<void> {
        await this.goto('/cart.html');
    }

    /**
     * Get number of items in cart
     */
    async getCartItemsCount(): Promise<number> {
        return await this.cartItems.count();
    }

    /**
     * Click checkout button
     */
    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    /**
     * Click continue shopping button
     */
    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    /**
     * Remove item from cart by index
     */
    async removeItemByIndex(index: number): Promise<void> {
        const removeButton = this.removeButtons.nth(index);
        await removeButton.click();
    }

    /**
     * Get page title
     */
    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
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
     * Wait for cart page to load
     */
    async waitForCartPageLoad(): Promise<void> {
        await this.pageTitle.waitFor({ state: 'visible' });
    }
}