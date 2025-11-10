import { Page, Locator } from '@playwright/test';

export class NavigationComponent {
    readonly page: Page;
    readonly openMenuButton: Locator;
    readonly menuContainer: Locator;
    readonly allItemsLink: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openMenuButton = page.locator('#react-burger-menu-btn');
        this.menuContainer = page.locator('.bm-menu-wrap');
        this.allItemsLink = page.locator('#inventory_sidebar_link');
        this.aboutLink = page.locator('#about_sidebar_link');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
    }

    /**
     * Open the navigation menu
     */
    async openMenu(): Promise<void> {
        await this.openMenuButton.click();
        await this.menuContainer.waitFor({ state: 'visible' });
    }

    /**
     * Close the navigation menu
     */
    async closeMenu(): Promise<void> {
        const closeButton = this.page.locator('#react-burger-cross-btn');
        await closeButton.click();
        await this.menuContainer.waitFor({ state: 'hidden' });
    }

    /**
     * Navigate to All Items page
     */
    async goToAllItems(): Promise<void> {
        await this.openMenu();
        await this.allItemsLink.click();
    }

    /**
     * Navigate to About page
     */
    async goToAbout(): Promise<void> {
        await this.openMenu();
        await this.aboutLink.click();
    }

    /**
     * Logout from the application
     */
    async logout(): Promise<void> {
        await this.openMenu();
        await this.logoutLink.click();
    }

    /**
     * Reset application state
     */
    async resetAppState(): Promise<void> {
        await this.openMenu();
        await this.resetAppStateLink.click();
        await this.closeMenu();
    }

    /**
     * Check if menu is open
     */
    async isMenuOpen(): Promise<boolean> {
        return await this.menuContainer.isVisible();
    }
}