import { Invitation } from '@/types/myDashboardTypes';
//import Image from 'next/image';

interface InvitedDashboardItemProps {
  invitedDashboard: Invitation;
}
const InvitedDashboardItem = ({invitedDashboard}: InvitedDashboardItemProps) => {
  return (
    <>
      <div>
        <p>{invitedDashboard.dashboard.title}</p>
        <p>{invitedDashboard.inviter.nickname}</p>
        <button className="btn_mobile_purple">수락</button>
        <button className="btn_mobile_white">거절</button>
      </div>
    </>
  );
};

export default InvitedDashboardItem;
