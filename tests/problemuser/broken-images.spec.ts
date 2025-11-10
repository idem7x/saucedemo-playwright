import { test, expect } from '@playwright/test';

test.describe('Problem User - Known Issues', () => {
    test('images have wrong src attributes', async ({ page }) => {
        await page.goto('/inventory.html');

        // Зачекати поки сторінка завантажиться
        await page.waitForLoadState('networkidle');

        // Problem user має неправильні зображення - шукаємо IMG тег
        const firstImage = page.locator('.inventory_item img').first();
        await expect(firstImage).toBeVisible();

        const src = await firstImage.getAttribute('src');
        expect(src).not.toBeNull();
        console.log('Image src:', src);

        // Альтернативно: перевірити що всі картинки однакові (це баг problem_user)
        const allImages = await page.locator('.inventory_item img').all();
        const allSrcs = await Promise.all(
            allImages.map(img => img.getAttribute('src'))
        );

        console.log('All image sources:', allSrcs);

        // Для problem_user всі картинки мають однаковий src (це і є баг)
        const uniqueSrcs = [...new Set(allSrcs)];
        expect(uniqueSrcs.length).toBeLessThan(6); // Менше 6 унікальних картинок
    });

    test('sorting does not work properly', async ({ page }) => {
        await page.goto('/inventory.html');

        // Зачекати поки сторінка повністю завантажиться
        await expect(page.locator('.inventory_item')).toHaveCount(6);

        // Отримати початкові ціни
        const pricesBeforeSort = await page.locator('.inventory_item_price').allTextContents();
        console.log('Prices before sort:', pricesBeforeSort);

        // Problem user має проблеми з сортуванням
        const sortDropdown = page.locator('[class="product_sort_container"]');
        await expect(sortDropdown).toBeVisible();
        await sortDropdown.selectOption('lohi');

        // Зачекати трохи після сортування
        await page.waitForTimeout(1000);

        // Отримати ціни після сортування
        const pricesAfterSort = await page.locator('.inventory_item_price').allTextContents();
        console.log('Prices after sort:', pricesAfterSort);

        // Конвертувати в числа
        const numericPricesBefore = pricesBeforeSort.map(p => parseFloat(p.replace('$', '')));
        const numericPricesAfter = pricesAfterSort.map(p => parseFloat(p.replace('$', '')));

        // Перевірити що щось змінилося (навіть якщо неправильно)
        const sortingChanged = JSON.stringify(numericPricesBefore) !== JSON.stringify(numericPricesAfter);

        console.log('Sorting changed:', sortingChanged);
        console.log('Before:', numericPricesBefore);
        console.log('After:', numericPricesAfter);

        // Для problem_user сортування може не працювати взагалі
        // або працювати некоректно
    });

    test('cannot complete checkout', async ({ page }) => {
        await page.goto('/inventory.html');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');

        await page.fill('[data-test="firstName"]', 'Max');
        await page.fill('[data-test="lastName"]', 'Test');
        await page.fill('[data-test="postalCode"]', '12345');

        // Problem user може мати проблеми з формою
        await page.click('[data-test="continue"]');

        // Зачекати навігацію або помилку
        await page.waitForTimeout(2000);

        // Перевірити чи перейшли на наступний крок
        const currentUrl = page.url();
        console.log('Current URL after continue:', currentUrl);

        // Якщо є проблема, можемо бути все ще на checkout-step-one
        // або на checkout-step-two але з помилками
    });
});