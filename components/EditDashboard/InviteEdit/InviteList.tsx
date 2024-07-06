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
  const size = 5;

  return (
    <div>
      {invitations.map((invitation, index) => (
        <div
          key={invitation.id}
          className={`flex items-center py-1 md:py-7 ${index !== invitations.length - 1 && index % size !== size - 1 ? 'border-b border-gray-200' : ''}`}
        >
          <p className="my-12 mr-4 text-14 md:text-16">
            {invitation.invitee.email}
          </p>
          <button
            className="ml-auto font-medium btn_small_white md:btn_desktop_white"
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
