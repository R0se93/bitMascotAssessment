const { test, expect } = require('@playwright/test');

test('User logs in, adds a product to cart, verifies name, and logs out', async ({ page }) => {

  // 1. Go to website
  await page.goto('https://www.saucedemo.com/');

  // 2. Log in
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Validate login success
  await expect(page).toHaveURL(/inventory.html/);

  // 3. Add one product to the cart
  const productName = await page.locator('.inventory_item_name').first().innerText();
  await page.locator('button[id^="add-to-cart"]').first().click();

  // 4. Go to cart
  await page.click('.shopping_cart_link');

  // Verify product name in cart
  const cartItemName = await page.locator('.inventory_item_name').innerText();
  await expect(cartItemName).toBe(productName);

  // 5. Log out
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  // Validate logout
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});