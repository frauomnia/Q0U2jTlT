import { AddComment } from './AddComment';
import { CommentList } from './CommentList';

export function Comments() {
  return (
    <div className="flex flex-col w-full max-w-[500px] gap-4">
      <CommentList />
      <AddComment />
    </div>
  );
}
