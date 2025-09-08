import { Comment } from '../../db/models';
import { TrashIcon } from 'lucide-react';
import { deleteComment } from '../../queries/comments';
import { useState } from 'react';
import { AddComment } from './AddComment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function CommentItem({ comment }: { comment: Comment }) {
  const [showAddNewComment, setShowAddNewComment] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowAddNewComment(!showAddNewComment)}
        className="cursor-pointer border p-4 mb-4 rounded-lg min-h-[50px] flex justify-between items-center hover:bg-zinc-100 transition-colors group"
      >
        <p key={comment.id}>{comment.content}</p>
        <div className="flex gap-2">
          <p className="text-zinc-400">{dayjs(comment.createdAt).fromNow()}</p>
          <button className="border-zinc-200 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity group">
            <TrashIcon
              onClick={() => deleteComment(comment.id)}
              className="stroke-red-400 size-4 transition-opacity"
            />
          </button>
        </div>
      </div>
      {showAddNewComment && (
        <AddComment
          parentId={comment.id}
          handleClose={() => setShowAddNewComment(false)}
        />
      )}
      {comment.childComments ? (
        <div className="flex flex-col ml-8 justify-between">
          {comment.childComments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>
      ) : null}
    </>
  );
}
