export interface User {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: User;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}
