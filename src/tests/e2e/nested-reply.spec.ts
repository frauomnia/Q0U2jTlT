import { test, expect } from '@playwright/test';
import {
  resetIndexedDB,
  rootTextarea, rootPostBtn,
  rowWithExactText, replyEditorForRow, childrenContainerForRow
} from './_helpers';

test('reply appears under the correct parent', async ({ page }) => {
  await resetIndexedDB(page);

  await rootTextarea(page).fill('Parent A'); await rootPostBtn(page).click();
  await expect(rowWithExactText(page, 'Parent A')).toBeVisible();

  await rootTextarea(page).fill('Parent B'); await rootPostBtn(page).click();
  await expect(rowWithExactText(page, 'Parent B')).toBeVisible();

  // Open reply editor for A
  const aRow = rowWithExactText(page, 'Parent A');
  await aRow.click();
  const aEditor = replyEditorForRow(aRow);
  await aEditor.getByPlaceholder(/add a comment/i).waitFor();

  // Type and submit
  await aEditor.getByPlaceholder(/add a comment/i).fill('Child A1');
  await aEditor.getByRole('button', { name: /add a new comment/i }).click();

  // Assert child rendered under A
  const aChildren = childrenContainerForRow(aRow);
  await expect(aChildren).toContainText('Child A1', { timeout: 10_000 });

  // Assert NOT under B
  const bRow = rowWithExactText(page, 'Parent B');
  const bChildren = childrenContainerForRow(bRow);
  await expect(bChildren.getByText('Child A1')).toHaveCount(0);
});
