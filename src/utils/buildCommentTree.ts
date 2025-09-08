import { Comment } from '../db/models';

export function buildCommentTree(comments: Comment[]) {
  const commentMap = new Map<number, Comment>();

  for (const comment of comments) {
    commentMap.set(comment.id, { ...comment, childComments: [] });
  }

  const combinedComments: Comment[] = [];

  for (const comment of comments) {
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);

      if (parent) {
        const childCommentToAdd = commentMap.get(comment.id);

        if (childCommentToAdd) {
          parent.childComments.push(childCommentToAdd);
        }
      }
    } else {
      combinedComments.push(commentMap.get(comment.id)!);
    }
  }

  return combinedComments;
}
