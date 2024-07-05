import { putAcceptInvited, putRejectInvited } from '@/pages/api/mydashboard/putInvited';
import { Invitation } from '@/types/myDashboardTypes';


//import Image from 'next/image';

interface InvitedDashboardItemProps {
  invitedDashboard: Invitation;
}
const InvitedDashboardItem = ({
  invitedDashboard,
}: InvitedDashboardItemProps) => {
  const handleAccept = async () => {
    try {
      const response = await putAcceptInvited(invitedDashboard.id);
      console.log(invitedDashboard.id);
    } catch (error) {
      alert('초대 수락에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleReject = async () => {
    try {
      const response = await putRejectInvited(invitedDashboard.id);
    } catch (error) {
      alert('초대 거절에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div>
        <p>{invitedDashboard.dashboard.title}</p>
        <p>{invitedDashboard.inviter.nickname}</p>
        <button className="btn_mobile_purple" onClick={handleAccept}>수락</button>
        <button className="btn_mobile_white" onClick={handleReject}>거절</button>
      </div>
    </>
  );
};

export default InvitedDashboardItem;