import Dexie, { type EntityTable } from 'dexie';
import { Comment } from './models';

const db = new Dexie('CommentsDB') as Dexie & {
  comments: EntityTable<Comment, 'id'>;
};

db.version(1).stores({
  comments: '++id, content, createdAt, parentId, childComments',
});

export { db };
