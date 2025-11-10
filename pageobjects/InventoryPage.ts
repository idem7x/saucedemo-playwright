import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';
import { InventoryItem } from './InventoryItem';

export class InventoryPage extends BasePage {
    readonly navigation: NavigationComponent;
    readonly pageTitle: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly inventoryContainer: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.navigation = new NavigationComponent(page);
        this.pageTitle = page.locator('.title');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.inventoryContainer = page.locator('.inventory_list');
        this.sortDropdown = page.locator('.product_sort_container');
    }

    /**
     * Get all inventory items
     */
    getInventoryItems(): Promise<InventoryItem[]> {
        return this.page.locator('.inventory_item').all().then(locators =>
            locators.map(locator => new InventoryItem(locator))
        );
    }

    /**
     * Get inventory item by index (0-based)
     */
    async getInventoryItemByIndex(index: number): Promise<InventoryItem> {
        const items = await this.getInventoryItems();
        if (index < 0 || index >= items.length) {
            throw new Error(`Item index ${index} is out of bounds. Total items: ${items.length}`);
        }
        return items[index];
    }

    /**
     * Get inventory item by name
     */
    async getInventoryItemByName(name: string): Promise<InventoryItem | null> {
        const items = await this.getInventoryItems();
        for (const item of items) {
            const itemName = await item.getName();
            if (itemName === name) {
                return item;
            }
        }
        return null;
    }

    /**
     * Get total number of inventory items
     */
    async getInventoryItemsCount(): Promise<number> {
        const items = await this.getInventoryItems();
        return items.length;
    }

    /**
     * Add item to cart by name
     */
    async addItemToCartByName(name: string): Promise<void> {
        const item = await this.getInventoryItemByName(name);
        if (!item) {
            throw new Error(`Item with name "${name}" not found`);
        }
        await item.addToCart();
    }

    /**
     * Add item to cart by index
     */
    async addItemToCartByIndex(index: number): Promise<void> {
        const item = await this.getInventoryItemByIndex(index);
        await item.addToCart();
    }

    /**
     * Remove item from cart by name
     */
    async removeItemFromCartByName(name: string): Promise<void> {
        const item = await this.getInventoryItemByName(name);
        if (!item) {
            throw new Error(`Item with name "${name}" not found`);
        }
        await item.removeFromCart();
    }

    /**
     * Get shopping cart badge count
     */
    async getCartBadgeCount(): Promise<number> {
        const isVisible = await this.shoppingCartBadge.isVisible();
        if (!isVisible) {
            return 0;
        }
        const text = await this.shoppingCartBadge.textContent();
        return parseInt(text || '0', 10);
    }

    /**
     * Click on shopping cart
     */
    async goToCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    /**
     * Get page title text
     */
    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    /**
     * Sort items by option
     * Options: 'az' | 'za' | 'lohi' | 'hilo'
     */
    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    /**
     * Get all item names
     */
    async getAllItemNames(): Promise<string[]> {
        const items = await this.getInventoryItems();
        const names: string[] = [];
        for (const item of items) {
            names.push(await item.getName());
        }
        return names;
    }

    /**
     * Get all item prices
     */
    async getAllItemPrices(): Promise<number[]> {
        const items = await this.getInventoryItems();
        const prices: number[] = [];
        for (const item of items) {
            prices.push(await item.getPriceAsNumber());
        }
        return prices;
    }

    /**
     * Verify items are sorted alphabetically (A to Z)
     */
    async areItemsSortedAZ(): Promise<boolean> {
        const names = await this.getAllItemNames();
        const sortedNames = [...names].sort();
        return JSON.stringify(names) === JSON.stringify(sortedNames);
    }

    /**
     * Verify items are sorted by price (low to high)
     */
    async areItemsSortedLowToHigh(): Promise<boolean> {
        const prices = await this.getAllItemPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        return JSON.stringify(prices) === JSON.stringify(sortedPrices);
    }

    /**
     * Add multiple items to cart
     */
    async addMultipleItemsToCart(itemNames: string[]): Promise<void> {
        for (const name of itemNames) {
            await this.addItemToCartByName(name);
        }
    }

    /**
     * Wait for inventory page to load
     */
    async waitForInventoryPageLoad(): Promise<void> {
        await this.inventoryContainer.waitFor({ state: 'visible' });
        await this.pageTitle.waitFor({ state: 'visible' });
    }

    /**
     * Add item to cart by data-test attribute
     */
    async addItemToCartByDataTest(dataTest: string): Promise<void> {
        await this.page.locator(`[data-test="${dataTest}"]`).click();
    }

    /**
     * Navigate to inventory page
     */
    async goToInventoryPage(): Promise<void> {
        await this.goto('/inventory.html');
    }
}