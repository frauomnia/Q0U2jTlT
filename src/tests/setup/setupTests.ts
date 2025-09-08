import '@testing-library/jest-dom/vitest';  
import 'fake-indexeddb/auto';               // IndexedDB polyfill for Dexie

import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { db } from '../../db/db';

// reset db before each test
beforeEach(async () => {
  await db.delete();
  await db.open();
});

afterEach(() => {
  cleanup(); // unmount React trees between tests
});
