import { test, expect } from '@playwright/test';
import { resetIndexedDB, rootTextarea, rootPostBtn, rowWithExactText, replyEditorForRow, clickDeleteInRow } from './_helpers';

test('deleting a parent removes all descendants', async ({ page }) => {
  await resetIndexedDB(page);

  // Ensure app is ready before typing
  await rootTextarea(page).waitFor({ timeout: 10_000 });

  // Build thread
  await rootTextarea(page).fill('Parent A');
  await rootPostBtn(page).click();
  await expect(page.getByText('Parent A', { exact: true })).toBeVisible();

  // wait for the root editor to be back after the re-render
  await expect(rootTextarea(page)).toBeVisible({ timeout: 10_000 });
  await expect(rootTextarea(page)).toHaveValue('', { timeout: 10_000 });
  
  await rootTextarea(page).fill('Parent B');
  await rootPostBtn(page).click();
  await expect(page.getByText('Parent B', { exact: true })).toBeVisible();

  // Child A1
  const aRow = rowWithExactText(page, 'Parent A');
  await aRow.click();
  const aEditor = replyEditorForRow(aRow);
  await aEditor.getByPlaceholder(/add a comment/i).waitFor({ timeout: 10_000 });
  await aEditor.getByPlaceholder(/add a comment/i).fill('Child A1');
  await aEditor.getByRole('button', { name: /add a new comment/i }).click();
  await expect(page.getByText('Child A1', { exact: true })).toBeVisible({ timeout: 10_000 });

  // Grandchild A1-1
  const a1Row = rowWithExactText(page, 'Child A1');
  await a1Row.click();
  const a1Editor = replyEditorForRow(a1Row);
  await a1Editor.getByPlaceholder(/add a comment/i).waitFor({ timeout: 10_000 });
  await a1Editor.getByPlaceholder(/add a comment/i).fill('Grandchild A1-1');
  await a1Editor.getByRole('button', { name: /add a new comment/i }).click();
  await expect(page.getByText('Grandchild A1-1', { exact: true })).toBeVisible({ timeout: 10_000 });

  // Delete parent A (cascade)
  await clickDeleteInRow(aRow);

  // Assertions
  await expect(page.getByText('Parent A', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Child A1', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Grandchild A1-1', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Parent B', { exact: true })).toBeVisible({ timeout: 10_000 });
});
