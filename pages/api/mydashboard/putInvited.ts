import axios from '@/lib/axios';


export const putAcceptInvited = async (invitationId: number) => {
    const data: { inviteAccepted: boolean } = {
      inviteAccepted: true,
    };
  try {
    const res = await axios.put(`invitations/${invitationId}`, data);
    console.log('Invitation accepted:', res.data);
  } catch (error) {
    console.error('Failed to accept invitation:', error);
    throw new Error('Failed to accept invitations');
  }
};

export const putRejectInvited = async (invitationId: number) => {
  const data: { inviteAccepted: boolean } = {
    inviteAccepted: false,
  };
  try {
    const res = await axios.put(`invitations/${invitationId}`, data);
    console.log('Invitation rejected:', res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to reject invitation:', error);
    throw new Error('Failed to reject invitations');
  }
};