import { test, expect } from '@playwright/test';

test('SAVE10 applies to a cart worth exactly Rs 500', async ({ page }) => {
  await page.goto('/cart');
  await page.getByLabel('Cart value (Rs)').fill('500');
  await page.getByLabel('Discount code').fill('SAVE10');
  await page.getByRole('button', { name: 'Apply code' }).click();

  await expect(page.getByRole('status')).toHaveText('Code applied: Rs 50 off.');
  await expect(page.getByText('Rs 450', { exact: true })).toBeVisible();
});
