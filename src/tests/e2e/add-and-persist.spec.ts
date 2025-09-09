import { test, expect } from '@playwright/test';
import { resetIndexedDB, rootTextarea, rootPostBtn, rowWithExactText } from './_helpers';

test('add a root comment and see it after reload', async ({ page }) => {
  await resetIndexedDB(page);

  await rootTextarea(page).fill('Root A');
  await rootPostBtn(page).click();

  const row = rowWithExactText(page, 'Root A');
  await expect(row).toBeVisible({ timeout: 10_000 });   // explicit assertion before reload

  await page.reload();

  const rowAfter = rowWithExactText(page, 'Root A');
  await expect(rowAfter).toBeVisible({ timeout: 10_000 }); // explicit assertion after reload
  await expect(page.getByText('Root A', { exact: true })).toHaveCount(1); // no duplicates
});
