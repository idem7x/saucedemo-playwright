import { Locator, Page } from '@playwright/test';

export class InventoryItem {
    readonly container: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly itemImage: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;

    constructor(container: Locator) {
        this.container = container;
        this.itemName = container.locator('.inventory_item_name');
        this.itemDescription = container.locator('.inventory_item_desc');
        this.itemPrice = container.locator('.inventory_item_price');
        this.itemImage = container.locator('.inventory_item_img img');
        this.addToCartButton = container.locator('button[id^="add-to-cart"]');
        this.removeButton = container.locator('button[id^="remove"]');
    }

    /**
     * Get item name
     */
    async getName(): Promise<string> {
        return await this.itemName.textContent() || '';
    }

    /**
     * Get item description
     */
    async getDescription(): Promise<string> {
        return await this.itemDescription.textContent() || '';
    }

    /**
     * Get item price
     */
    async getPrice(): Promise<string> {
        return await this.itemPrice.textContent() || '';
    }

    /**
     * Get item price as number
     */
    async getPriceAsNumber(): Promise<number> {
        const priceText = await this.getPrice();
        return parseFloat(priceText.replace('$', ''));
    }

    /**
     * Add item to cart
     */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Remove item from cart
     */
    async removeFromCart(): Promise<void> {
        await this.removeButton.click();
    }

    /**
     * Click on item name to view details
     */
    async clickName(): Promise<void> {
        await this.itemName.click();
    }

    /**
     * Click on item image to view details
     */
    async clickImage(): Promise<void> {
        await this.itemImage.click();
    }

    /**
     * Check if item is in cart (Remove button is visible)
     */
    async isInCart(): Promise<boolean> {
        return await this.removeButton.isVisible();
    }

    /**
     * Get image source URL
     */
    async getImageSrc(): Promise<string | null> {
        return await this.itemImage.getAttribute('src');
    }

    /**
     * Wait for item to be visible
     */
    async waitForVisible(): Promise<void> {
        await this.container.waitFor({ state: 'visible' });
    }
}