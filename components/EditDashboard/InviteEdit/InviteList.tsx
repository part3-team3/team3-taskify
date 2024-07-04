// InviteList.tsx
import React from 'react';

type InviteListProps = {
  invitations: {
    id: number;
    invitee: { email: string };
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
        <div key={invitation.id} className="mb-4 flex items-center">
          <p className="my-12 mr-4">{invitation.invitee.email}</p>{' '}
          {/* invitee의 email 출력 */}
          <button
            className="md: ml-auto font-medium btn_desktop_white"
            onClick={() => onCancelInvitation(invitation.id)}
          >
            취소
          </button>
        </div>
      ))}
    </div>
  );
};

export default InviteList;
