import { test, expect } from '@playwright/test';

test.describe('Error User - Error Scenarios', () => {
    test('checkout process shows errors', async ({ page }) => {
        await page.goto('/inventory.html');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');

        await page.fill('[data-test="firstName"]', 'Max');
        await page.fill('[data-test="lastName"]', 'Test');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');

        // Error user отримує помилку на цьому етапі
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
    });

    test('cart operations may fail', async ({ page }) => {
        await page.goto('/inventory.html');

        // Спробувати додати товар
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

        // Перевірити чи з'явилася помилка
        const error = page.locator('.error-message');
        if (await error.isVisible()) {
            console.log('Expected error appeared for error_user');
        }
    });
});