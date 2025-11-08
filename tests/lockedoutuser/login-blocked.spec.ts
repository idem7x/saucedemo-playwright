import { test, expect } from '@playwright/test';

test.describe('Locked Out User - Access Denied', () => {
    test('cannot login - account is locked', async ({ page }) => {
        await page.goto('/');

        await page.fill('#user-name', 'locked_out_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out');

        await expect(page).not.toHaveURL(/inventory/);
    });

    test('error message is displayed correctly', async ({ page }) => {
        await page.goto('/');

        await page.fill('#user-name', 'locked_out_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        const error = page.locator('[class="error-message-container error"]');
        await expect(error).toHaveCSS('background-color', 'rgb(226, 35, 26)');
    });
});