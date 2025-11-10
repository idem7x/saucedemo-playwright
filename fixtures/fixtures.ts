import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { InventoryPage } from '../pageobjects/InventoryPage';
import { CartPage } from '../pageobjects/CartPage';
import { CheckoutStepOnePage } from '../pageobjects/CheckoutStepOnePage';

/**
 * Extended test fixtures with page objects and authentication
 */
type TestFixtures = {
    // Page Objects - automatically initialized
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutStepOnePage;

    // Authenticated states - login once per test
    authenticatedPage: Page;
    authenticatedStandardUser: Page;
    authenticatedProblemUser: Page;

    // Page with items already in cart
    pageWithItemsInCart: Page;
};

/**
 * Extend Playwright test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
    /**
     * LoginPage fixture - automatically initialized
     */
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /**
     * InventoryPage fixture - automatically initialized
     */
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    /**
     * CartPage fixture - automatically initialized
     */
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    /**
     * CheckoutStepOnePage fixture - automatically initialized
     */
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        await use(checkoutPage);
    },
});

/**
 * Export expect from Playwright for convenience
 */
export { expect } from '@playwright/test';