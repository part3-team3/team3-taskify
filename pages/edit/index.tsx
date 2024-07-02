// import Head from 'next/head';
import DashboardNameEdit from '@/components/EditDashboard/DashboardNameEdit';
import NavBar from '@/components/EditDashboard/Navbar';
import icArrowForward from '@/public/images/icon/ic-arrow-forward.svg';
import Image from 'next/image';
import Link from 'next/link';

import DashboardInviteList from '../../components/EditDashboard/DashboardInviteList';
import DashboardMembersEdit from '../../components/EditDashboard/DashboardMembersEdit';

const HomePage = () => {
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
          <button className="mb-56 h-[62px] w-[320px] gap-10 rounded-lg border border-[1px] border-gray-300 text-lg font-medium">
            대시보드 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
