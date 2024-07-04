// InviteList.tsx
import React from 'react';

type InviteListProps = {
  invitations: {
    invitee: { email: string; id: number };
  }[];
  onCancelInvitation: (id: number) => void;
};

const InviteList: React.FC<InviteListProps> = ({
  invitations,
  onCancelInvitation,
}) => {
  return (
    <div>
      {invitations.map((invitation) => (
        <div key={invitation.invitee.id} className="mb-4 flex items-center">
          <p className="mr-4">{invitation.invitee.email}</p>{' '}
          {/* invitee의 email 출력 */}
          <button
            className="md: ml-auto font-medium btn_desktop_white"
            onClick={() => onCancelInvitation(invitation.invitee.id)}
          >
            취소
          </button>
        </div>
      ))}
    </div>
  );
};

export default InviteList;
