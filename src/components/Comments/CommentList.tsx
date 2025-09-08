import { useLiveQuery } from 'dexie-react-hooks';

import { getCommentsWithChildren } from '../../queries/comments';
import { CommentItem } from './CommentItem';

export function CommentList() {
  const comments = useLiveQuery(() => getCommentsWithChildren());

  return (
    <div className="flex flex-col">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
