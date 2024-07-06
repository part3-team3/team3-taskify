import DashboardInviteList from '@/components/EditDashboard/InviteEdit/DashboardInviteList';
import DashboardMembersEdit from '@/components/EditDashboard/MembersEdit/DashboardMembersEdit';
import DashboardNameEdit from '@/components/EditDashboard/NameEdit';
import NavBar from '@/components/EditDashboard/Navbar';
import SideBarEdit from '@/components/sidebar/SideBarEdit';
import axios from '@/lib/axios';
import icArrowForward from '@/public/images/icon/ic-arrow-forward.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);

  const handleDelete = async () => {
    if (!dashboardId || isNaN(dashboardId)) return;
    try {
      await axios.delete(`/dashboards/${dashboardId}`, {
        params: { dashboardId },
      });

      alert('대시보드가 삭제되었습니다.');
      router.push('/mydashboard');
    } catch (error) {
      console.error('대시보드 삭제에 실패했습니다:', error);
      alert('대시보드 삭제에 실패했습니다');
    }
  };

  const handleBack = () => {
    router.push(`/dashboard/${dashboardId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBarEdit />
      <main className="min-w-0 flex-1">
        <NavBar />
        <button
          onClick={handleBack}
          className="mt-15 flex items-center gap-4 px-24 py-4 hover:underline"
        >
          <Image
            src={icArrowForward}
            className="h-20 w-20 md:h-24 md:w-24"
            alt="화살표"
          />
          돌아가기
        </button>
        <div>
          <div className="mt-15">
            <DashboardNameEdit />
          </div>
          <div className="mt-15">
            <DashboardMembersEdit />
          </div>
          <div className="mt-15">
            <DashboardInviteList />
          </div>
          <div className="mt-43 px-14 md:mt-48 md:px-24">
            <button
              onClick={handleDelete}
              className="mb-56 h-52 w-284 gap-10 rounded-lg border-[1px] border-gray-300 text-16 font-medium md:h-62 md:w-320 md:text-18"
            >
              대시보드 삭제하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
