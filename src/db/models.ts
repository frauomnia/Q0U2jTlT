interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  parentId: number | null;
  childComments: Comment[];
}

export type { Comment };
