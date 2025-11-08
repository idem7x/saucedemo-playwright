import { test, expect } from '@playwright/test';

test.describe('Standard User - Checkout Flow', () => {
    test('complete purchase successfully', async ({ page }) => {
        await page.goto('/inventory.html');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL(/cart/);

        await page.click('[data-test="checkout"]');

        await page.fill('[data-test="firstName"]', 'Max');
        await page.fill('[data-test="lastName"]', 'Test');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');
        
        await page.click('[data-test="finish"]');

        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

    test('add multiple items to cart', async ({ page }) => {
        await page.goto('/inventory.html');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    });
});