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
  totalCount: number;
  dashboards: Dashboard[];
}
export interface User {
  nickname: string;
  email: string;
  id: number;
}

export interface Invitation {
  id: number;
  inviter: User;
  teamId: string;
  dashboard: Pick<Dashboard, 'title' | 'id'>;
  invitee: User;
  inviteAccepted: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvitationResponse {
  cursorId: number;
  invitations: Invitation[];
}

export interface InvitedParams {
  title?: string | string[] | undefined;
  cursorId?: number | null | undefined;
  size?: number;
}