import { Page, Locator } from '@playwright/test';

// Reset IndexedDB (clean slate per test)
export async function resetIndexedDB(page: Page, name = 'CommentsDB') {
  await page.goto('/');
  await page.evaluate((dbName) => {
    return new Promise<void>((resolve) => {
      const req = indexedDB.deleteDatabase(dbName);
      req.onblocked = req.onerror = req.onsuccess = () => resolve();
    });
  }, name);
  await page.reload();
}

// Root composer is rendered after the list → use last() textarea/button.
export const rootTextarea = (page: Page): Locator =>
  page.getByPlaceholder(/add a comment/i).last();

export const rootPostBtn = (page: Page): Locator =>
  page.getByRole('button', { name: /add a new comment/i }).last();

// A comment “row” is the clickable div with the exact text and class.
export const rowWithExactText = (page: Page, text: string): Locator =>
  page.locator('div.cursor-pointer', { has: page.getByText(text, { exact: true }) }).first();

// The inline reply editor renders as the immediate following <form>.
export const replyEditorForRow = (row: Locator): Locator =>
  row.locator('xpath=following-sibling::form[1]');

// The children container is the first following sibling with ml-8 class.
export const childrenContainerForRow = (row: Locator): Locator =>
  row.locator('xpath=following-sibling::div[contains(@class,"ml-8")][1]');

// Click the delete TrashIcon (svg) inside the row's right-side button.
export async function clickDeleteInRow(row: Locator) {
  const btn = row.getByRole('button').first();
  await btn.locator('css=svg').first().click();
}
