// tests/e2e/cross-tab-sync.spec.ts
import { test, expect } from '@playwright/test';
import { resetIndexedDB, rootTextarea, rootPostBtn } from './_helpers';

test('comments sync across two tabs', async ({ browser, baseURL }) => {
  // one shared context => shared storage
  const context = await browser.newContext();
  const pageA = await context.newPage();
  const pageB = await context.newPage();

  // clean slate once for this origin/context
  await resetIndexedDB(pageA);

  // load both tabs
  await Promise.all([pageA.goto(baseURL!), pageB.goto(baseURL!)]);

  // ready
  await Promise.all([rootTextarea(pageA).waitFor(), rootTextarea(pageB).waitFor()]);

  // add in tab A
  await rootTextarea(pageA).fill('Cross-tab comment');
  await rootPostBtn(pageA).click();
  await expect(pageA.getByText('Cross-tab comment', { exact: true })).toBeVisible();

  // expect to appear in tab B (give it time to receive the broadcast)
  await expect(pageB.getByText('Cross-tab comment', { exact: true }))
    .toBeVisible({ timeout: 10000 });

  await context.close();
});
