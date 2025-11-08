import { test as setup } from '@playwright/test';

const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
];

const password = process.env.TEST_PASSWORD;

for (const username of users) {
    setup(`authenticate ${username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', username);
        await page.fill('#password', password);
        await page.click('#login-button');

        // Для error_user може бути помилка, але це OK
        try {
            await page.waitForURL('**/inventory.html', { timeout: 5000 });
        } catch (e) {
            console.log(`${username} may have login issues - this is expected`);
        }

        await page.context().storageState({
            path: `./playwright/.auth/${username}.json`
        });
    });
}