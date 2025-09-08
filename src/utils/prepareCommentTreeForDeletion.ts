import { Comment } from '../db/models';

export function prepareCommentTreeForDeletion(
  parentId: number,
  comments: Comment[]
) {
  function getDescendantsIds(parentId: number): number[] {
    const childIds = comments
      .filter((comment) => comment.parentId === parentId)
      .map((child) => child.id);

    for (const childId of childIds) {
      childIds.push(...getDescendantsIds(childId));
    }

    return childIds;
  }

  const descentands = getDescendantsIds(parentId);

  return descentands;
}
