import { getInvitedDashboard } from '@/pages/api/mydashboard/getInvitedDashboard';
import { Invitation, InvitationResponse } from '@/types/myDashboardTypes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



import InvitedDashboardItem from './InvitedDashboardItem';
import SearchBar from './SearchBar';


const InvitedDashboardSection: React.FC = () => {
  const [allInvitedDashboardList, setAllInvitedDashboardList] = useState<
    Invitation[]
  >([]);
  const router = useRouter();
  const { title }: { title: string | string[] | undefined } = router.query;

  

  useEffect(() => {
    const getInvitedDashboardData = async (query: string | string[] | undefined) => {
      try {
        const getInvitedDashboardRes: InvitationResponse =
          await getInvitedDashboard(query);
        setAllInvitedDashboardList(getInvitedDashboardRes.invitations);
      } catch (err) {
        console.log(err);
      }
    };
    getInvitedDashboardData(title);
  }, [title]);

  return (
    <>
      <div className="mx-auto w-fit">
        <SearchBar
          initialValue={title}
          placeholder="검색할 상품을 입력해 주세요"
        />

        <ul className="">
          {allInvitedDashboardList &&
            allInvitedDashboardList.map((invitedDashboard) => {
              return (
                <li className="w-fit" key={invitedDashboard.id}>
                  <InvitedDashboardItem invitedDashboard={invitedDashboard} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
export default InvitedDashboardSection;