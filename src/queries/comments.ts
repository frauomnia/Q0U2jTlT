import { db } from '../db/db';
import { buildCommentTree } from '../utils/buildCommentTree';
import { prepareCommentTreeForDeletion } from '../utils/prepareCommentTreeForDeletion';

export async function addComment(content: string, parentId?: number) {
  const newComment = await db.comments.add({
    content,
    createdAt: new Date(),
    parentId: parentId ?? null,
    childComments: [],
  });

  return newComment;
}

export async function addChildComment(content: string, parentId: number) {
  const newComment = await addComment(content, parentId);

  return newComment;
}

export async function getCommentsWithChildren() {
  const comments = await db.comments.toArray();

  return buildCommentTree(comments);
}

export async function deleteComment(parentId: number) {
  const comments = await db.comments.toArray();
  const childrenToDelete = prepareCommentTreeForDeletion(parentId, comments);

  await db.comments.bulkDelete([parentId, ...childrenToDelete]);
}
