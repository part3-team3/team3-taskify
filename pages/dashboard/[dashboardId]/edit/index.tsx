import DashboardInviteList from '@/components/EditDashboard/InviteEdit/DashboardInviteList';
import DashboardMembersEdit from '@/components/EditDashboard/MembersEdit/DashboardMembersEdit';
import DashboardNameEdit from '@/components/EditDashboard/NameEdit';
import NavBar from '@/components/EditDashboard/Navbar';
import icArrowForward from '@/public/images/icon/ic-arrow-forward.svg';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  const { dashboardId } = router.query;

  const handleDelete = async () => {
    try {
      await axios.delete(`dashboards/${dashboardId}`);
      alert('대시보드가 삭제되었습니다.');
      router.push('/boardid');
    } catch (error) {
      console.error('대시보드 삭제에 실패했습니다:', error);
      alert('대시보드 삭제에 실패했습니다');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <Link href="/boardid" className="mt-15 flex items-center px-24 py-4">
        <Image src={icArrowForward} width={20} height={20} alt="화살표" />
        돌아가기
      </Link>
      <div>
        <div className="mt-15">
          <DashboardNameEdit />
        </div>
        <div className="mt-15">
          <DashboardMembersEdit />
        </div>
        <div className="mb-40 mt-15">
          <DashboardInviteList />
        </div>
        <div className="px-24">
          <button
            onClick={handleDelete}
            className="mb-56 h-[62px] w-[320px] gap-10 rounded-lg border border-[1px] border-gray-300 text-lg font-medium"
          >
            대시보드 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
