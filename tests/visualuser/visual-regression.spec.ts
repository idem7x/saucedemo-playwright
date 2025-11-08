import { test, expect } from '@playwright/test';

test.describe('Visual User - Visual Regression Tests', () => {
    test('inventory page - full page screenshot', async ({ page }) => {
        await page.goto('/inventory.html');

        // Зачекати поки всі елементи завантажаться
        await expect(page.locator('.inventory_item')).toHaveCount(6);
        await page.waitForLoadState('networkidle');

        // Зробити скріншот всієї сторінки
        await expect(page).toHaveScreenshot('inventory-page-full.png', {
            fullPage: true,
            maxDiffPixels: 100 // Дозволити невеликі відмінності
        });
    });

    test('cart page visual check', async ({ page }) => {
        await page.goto('/inventory.html');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');

        await expect(page).toHaveURL(/cart/);
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot('cart-page.png', {
            fullPage: true,
            maxDiffPixels: 100
        });
    });

    test('single product card screenshot', async ({ page }) => {
        await page.goto('/inventory.html');
        await expect(page.locator('.inventory_item')).toHaveCount(6);

        // Скріншот одного продукту
        const firstProduct = page.locator('.inventory_item').first();
        await expect(firstProduct).toHaveScreenshot('product-card.png', {
            maxDiffPixels: 50
        });
    });

    test('header screenshot', async ({ page }) => {
        await page.goto('/inventory.html');

        const header = page.locator('.header_container');
        await expect(header).toHaveScreenshot('header.png');
    });

    test('shopping cart icon', async ({ page }) => {
        await page.goto('/inventory.html');

        // Додати товар щоб побачити badge
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

        const cartLink = page.locator('.shopping_cart_link');
        await expect(cartLink).toHaveScreenshot('cart-with-badge.png');
    });
});