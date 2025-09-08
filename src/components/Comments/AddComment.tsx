import { FormEvent, useState } from 'react';
import { addComment } from '../../queries/comments';

export function AddComment({
  parentId,
  handleClose,
}: {
  parentId?: number;
  handleClose?: () => void;
}) {
  const [newComment, setNewComment] = useState('');

  const handleOnClick = async (e: FormEvent) => {
    e.preventDefault();

    await addComment(newComment, parentId);
    setNewComment('');

    if (handleClose) {
      handleClose();
    }
  };

  return (
    <form onSubmit={handleOnClick} className="flex flex-wrap w-full gap-2 mb-4">
      <textarea
        className="border border-zinc-800 py-2 px-4 rounded-lg w-full"
        value={newComment}
        onChange={(event) => setNewComment(event.currentTarget.value)}
        placeholder="Add a comment"
        autoFocus
        required
      ></textarea>
      <button className="bg-zinc-800 hover:bg-zinc-800/90 text-white py-2 px-4 rounded-lg w-full">
        Add a new comment
      </button>
    </form>
  );
}
