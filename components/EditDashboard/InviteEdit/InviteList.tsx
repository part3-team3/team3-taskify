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
  const size = 4;

  return (
    <div>
      {invitations.map((invitation, index) => (
        <div
          key={invitation.id}
          className={`mb-4 flex items-center ${index < invitations.length - (invitations.length % size) ? '' : 'border-b border-gray-200'}`}
        >
          <p className="my-12 mr-4">{invitation.invitee.email}</p>
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
