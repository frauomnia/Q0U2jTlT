import { describe, it, expect } from 'vitest';
import { db } from '../../../src/db/db';
import {
  addComment,
  addChildComment,
  getCommentsWithChildren,
  deleteComment,
} from '../../../src/queries/comments';

describe('queries with fake IndexedDB', () => {
  it('adds root and child, then builds tree and deletes', async () => {
    const rootId = await addComment('Parent');
    const childId = await addChildComment('Child', rootId);

    // persisted in fake IDB via Dexie
    const root = await db.comments.get(rootId);
    const child = await db.comments.get(childId);
    expect(root?.parentId).toBeNull();
    expect(child?.parentId).toBe(rootId);

    const tree = await getCommentsWithChildren();
    expect(tree.find(n => n.id === rootId)?.childComments?.some(c => c.id === childId)).toBe(true);

    await deleteComment(rootId);
    expect(await db.comments.get(rootId)).toBeUndefined();
    expect(await db.comments.get(childId)).toBeUndefined();
  });
});
