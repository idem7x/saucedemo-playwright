import { test, expect } from '@playwright/test';

test.describe('Performance Glitch User - Slow Operations', () => {
    test('loading inventory takes longer than expected', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/inventory.html');
        await expect(page.locator('.inventory_item')).toHaveCount(6);

        const loadTime = Date.now() - startTime;

        console.log(`Inventory loaded in ${loadTime}ms`);
        expect(loadTime).toBeGreaterThan(2000); // Очікуємо затримку
    });

    test('adding to cart is slow', async ({ page }) => {
        await page.goto('/inventory.html');

        const startTime = Date.now();
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        const actionTime = Date.now() - startTime;

        console.log(`Add to cart took ${actionTime}ms`);
    });
});