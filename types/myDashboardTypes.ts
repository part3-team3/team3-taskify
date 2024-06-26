export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
}
export interface DashboardResponse {
  cursorId: number;
  totalCount: number | null;
  dashboards: Dashboard[];
}