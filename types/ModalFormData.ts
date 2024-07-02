export interface TodoFormData {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface TodoCreateFormData extends TodoFormData {
  dashboardId: number;
}
