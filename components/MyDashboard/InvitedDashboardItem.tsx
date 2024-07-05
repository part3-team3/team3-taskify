import {
  putAcceptInvited,
  putRejectInvited,
} from '@/pages/api/mydashboard/putInvited';
import { Invitation } from '@/types/myDashboardTypes';

//import Image from 'next/image';

interface InvitedDashboardItemProps {
  invitedDashboard: Invitation;
  onAction: (invitationId: number) => void;
}
const InvitedDashboardItem = ({
  invitedDashboard,
  onAction,
}: InvitedDashboardItemProps) => {
  const handleAccept = async () => {
    try {
      const response = await putAcceptInvited(invitedDashboard.id);
      onAction(invitedDashboard.id);

      console.log(invitedDashboard.id);
    } catch (error) {
      alert('초대 수락에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleReject = async () => {
    try {
      const response = await putRejectInvited(invitedDashboard.id);
      onAction(invitedDashboard.id);
    } catch (error) {
      alert('초대 거절에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="mb-32 md:flex md:w-full md:h-70 md:mb-0 md:items-center	md:border-b xl:h-72">
        <div className="flex md:w-182 xl:w-348">
          <p className="mr-28 md:hidden">이름</p>
          <p className='md:pl-30 xl:pl-36'>{invitedDashboard.dashboard.title}</p>
        </div>
        <div className="flex md:w-112 xl:w-302">
          <p className="mr-16 md:hidden ">초대자</p>
          <p>{invitedDashboard.inviter.nickname}</p>
        </div>
        <div className="flex gap-10 md:w-154 md:gap-9 xl:w-316">
          <button className="btn_mobile_purple md:btn_tablet_purple xl:btn_desktop_purple_acc" onClick={handleAccept}>
            수락
          </button>
          <button className="btn_mobile_white md:btn_tablet_white xl:btn_desktop_white_rej" onClick={handleReject}>
            거절
          </button>
        </div>
      </div>
    </>
  );
};

export default InvitedDashboardItem;
