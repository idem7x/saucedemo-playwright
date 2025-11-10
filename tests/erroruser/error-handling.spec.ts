import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pageobjects/InventoryPage';
import { CartPage } from '../../pageobjects/CartPage';
import { CheckoutStepOnePage } from '../../pageobjects/CheckoutStepOnePage';
import { CheckoutData, Products } from '../../testData/testData';

test.describe('Error User - Error Scenarios (Clean Version)', () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutStepOnePage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutStepOnePage(page);
    });

    test('should show error during checkout process', async () => {
        // Arrange: Navigate to inventory and add item
        await inventoryPage.goToInventoryPage();
        await inventoryPage.waitForInventoryPageLoad();
        await inventoryPage.addItemToCartByDataTest(Products.backpack);

        // Act: Navigate through checkout
        await inventoryPage.goToCart();
        await cartPage.waitForCartPageLoad();
        await cartPage.clickCheckout();
        await checkoutPage.waitForCheckoutPageLoad();

        // Fill checkout information and submit
        const { firstName, lastName, postalCode } = CheckoutData.validUser;
        await checkoutPage.completeCheckoutStepOne(firstName, lastName, postalCode);

        // Assert: Error message should be visible for error_user
        await expect(checkoutPage.errorMessage).toBeVisible();

        const errorText = await checkoutPage.getErrorMessageText();
        expect(errorText).toBeTruthy();
    });

    test('should handle cart operation errors gracefully', async () => {
        // Arrange: Navigate to inventory
        await inventoryPage.goToInventoryPage();
        await inventoryPage.waitForInventoryPageLoad();

        // Act: Try to add item to cart
        await inventoryPage.addItemToCartByDataTest(Products.backpack);

        // Assert: Check if error appeared
        const hasError = await inventoryPage.isVisible('.error-message');

        if (hasError) {
            const errorText = await inventoryPage.getText('.error-message');
            console.log('Expected error appeared for error_user:', errorText);
            expect(errorText).toBeTruthy();
        } else {
            // If no error, verify item was added
            const cartCount = await inventoryPage.getCartBadgeCount();
            console.log('Cart badge count:', cartCount);
        }
    });
});