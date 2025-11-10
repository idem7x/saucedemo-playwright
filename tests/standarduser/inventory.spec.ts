import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pageobjects/InventoryPage';

test.describe('Inventory Page Tests', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);

        // Assuming login is done before accessing inventory page
        await inventoryPage.goto('https://www.saucedemo.com/inventory.html');
        await inventoryPage.waitForInventoryPageLoad();
    });

    test('should display inventory page correctly', async () => {
        const pageTitle = await inventoryPage.getPageTitle();
        expect(pageTitle).toBe('Products');

        const itemCount = await inventoryPage.getInventoryItemsCount();
        expect(itemCount).toBeGreaterThan(0);
    });

    test('should add item to cart using inventory item component', async () => {
        // Get first inventory item
        const firstItem = await inventoryPage.getInventoryItemByIndex(0);
        const itemName = await firstItem.getName();

        // Add to cart
        await firstItem.addToCart();

        // Verify item is in cart
        const isInCart = await firstItem.isInCart();
        expect(isInCart).toBeTruthy();

        // Verify cart badge
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(1);
    });

    test('should add item to cart by name', async () => {
        const itemName = 'Sauce Labs Backpack';
        await inventoryPage.addItemToCartByName(itemName);

        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(1);
    });

    test('should get item details from inventory item component', async () => {
        const item = await inventoryPage.getInventoryItemByIndex(0);

        const name = await item.getName();
        const description = await item.getDescription();
        const price = await item.getPrice();
        const priceNumber = await item.getPriceAsNumber();

        expect(name).toBeTruthy();
        expect(description).toBeTruthy();
        expect(price).toContain('$');
        expect(priceNumber).toBeGreaterThan(0);
    });

    test('should navigate using navigation component', async () => {
        // Using composition - navigation component
        await inventoryPage.navigation.openMenu();

        const isMenuOpen = await inventoryPage.navigation.isMenuOpen();
        expect(isMenuOpen).toBeTruthy();

        await inventoryPage.navigation.closeMenu();
    });

    test('should logout using navigation component', async () => {
        await inventoryPage.navigation.logout();

        // Verify redirect to login page
        const currentUrl = inventoryPage.getCurrentUrl();
        expect(currentUrl).toContain('saucedemo.com');
    });

    test('should sort items alphabetically', async () => {
        await inventoryPage.sortBy('az');

        const isSorted = await inventoryPage.areItemsSortedAZ();
        expect(isSorted).toBeTruthy();
    });

    test('should sort items by price low to high', async () => {
        await inventoryPage.sortBy('lohi');

        const isSorted = await inventoryPage.areItemsSortedLowToHigh();
        expect(isSorted).toBeTruthy();
    });

    test('should add multiple items to cart', async () => {
        const itemsToAdd = [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light'
        ];

        await inventoryPage.addMultipleItemsToCart(itemsToAdd);

        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(itemsToAdd.length);
    });

    test('should remove item from cart', async () => {
        // First add item
        const item = await inventoryPage.getInventoryItemByIndex(0);
        await item.addToCart();

        let cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(1);

        // Then remove it
        await item.removeFromCart();

        cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(0);
    });

    test('should get all item names and prices', async () => {
        const names = await inventoryPage.getAllItemNames();
        const prices = await inventoryPage.getAllItemPrices();

        expect(names.length).toBeGreaterThan(0);
        expect(prices.length).toBeGreaterThan(0);
        expect(names.length).toBe(prices.length);
    });

    test('should navigate to cart page', async () => {
        await inventoryPage.goToCart();

        const currentUrl = inventoryPage.getCurrentUrl();
        expect(currentUrl).toContain('cart.html');
    });

    test('should click item name to view details', async () => {
        const item = await inventoryPage.getInventoryItemByIndex(0);
        await item.clickName();

        const currentUrl = inventoryPage.getCurrentUrl();
        expect(currentUrl).toContain('inventory-item.html');
    });
});