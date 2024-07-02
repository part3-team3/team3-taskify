export interface TodoFormData {
  dashboardId?: number;
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}
