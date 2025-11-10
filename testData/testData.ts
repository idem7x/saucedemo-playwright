/**
 * Test data constants for checkout tests
 */
export const CheckoutData = {
    validUser: {
        firstName: 'Max',
        lastName: 'Test',
        postalCode: '12345'
    },
    invalidUser: {
        firstName: '',
        lastName: '',
        postalCode: ''
    },
    partialUser: {
        firstName: 'John',
        lastName: '',
        postalCode: '54321'
    }
};

/**
 * Product data test attributes
 */
export const Products = {
    backpack: 'add-to-cart-sauce-labs-backpack',
    bikeLight: 'add-to-cart-sauce-labs-bike-light',
    boltTShirt: 'add-to-cart-sauce-labs-bolt-t-shirt',
    fleeceJacket: 'add-to-cart-sauce-labs-fleece-jacket',
    onesie: 'add-to-cart-sauce-labs-onesie',
    tShirtRed: 'add-to-cart-test.allthethings()-t-shirt-(red)'
};

/**
 * Product names
 */
export const ProductNames = {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTShirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    tShirtRed: 'Test.allTheThings() T-Shirt (Red)'
};

/**
 * Expected error messages
 */
export const ErrorMessages = {
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required'
};