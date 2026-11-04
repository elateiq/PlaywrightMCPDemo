import { test, expect } from '@playwright/test';

test.describe('Cart discount rules', () => {
  test('Clears the applied discount when cart value changes', async ({ page }) => {
    // 1. Open the cart in a fresh page with the default cart value Rs 1,000.
    await page.goto('http://localhost:3000/cart');

    const cartValue = page.getByRole('spinbutton', { name: 'Cart value (Rs)' });
    const discountCode = page.getByRole('textbox', { name: 'Discount code' });
    const status = page.getByRole('status');
    const total = page.locator('#total');

    // 2. Enter SAVE10 and apply it; verify the discount and updated total.
    await discountCode.fill('SAVE10');
    await page.getByRole('button', { name: 'Apply code' }).click();
    await expect(status).toHaveText('Code applied: Rs 100 off.');
    await expect(total).toHaveText('Rs 900');

    // 3. Change the cart value to Rs 1,500 and verify the discount is cleared.
    await cartValue.fill('1500');
    await expect(status).toBeEmpty();
    await expect(total).toHaveText('Rs 1500');
  });
});
