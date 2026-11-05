import { test, expect } from '@playwright/test';

test('an order delivered before its promised date is not marked late', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Order number').fill('ORD-1001');
  await page.getByRole('button', { name: 'Track' }).click();

  await expect(page.getByRole('heading', { name: 'Order ORD-1001' })).toBeVisible();
  await expect(page.getByText('Late', { exact: true })).toBeHidden();
});