import CreateDashboardContent from '@/components/MyDashboard/CreateDashboardContent';
import DashboardModal from '@/components/MyDashboard/DashboardModal';
import PaginationBar from '@/components/MyDashboard/PaginationBar';
import { getDashboard } from '@/pages/api/mydashboard/getDashboard';
import { Dashboard, DashboardResponse } from '@/types/myDashboardTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import SideBarItem from './SideBarItem';

interface SideBarProps {
  onDashboardCreated: () => void;
  dashboardCreated: boolean;
}
const SideBar: React.FC<SideBarProps> = ({
  onDashboardCreated,
  dashboardCreated,
}:SideBarProps) => {
  const [page, setPage] = useState(1);
  const size = 10;
  const [allDashboardList, setAllDashboardList] = useState<Dashboard[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const getDashboardData = async () => {
    try {
      const getDashboardRes: DashboardResponse = await getDashboard({
        page,
        size,
      });
      setAllDashboardList(getDashboardRes.dashboards);
      setTotalPage(Math.ceil(getDashboardRes.totalCount / size));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, [page, size, dashboardCreated]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleDashboardCreated = () => {
    getDashboardData();
    onDashboardCreated();
  };
  return (
    <aside className="blcok flex h-screen w-67 flex-col items-center border-r border-solid border-gray-30 bg-white md:w-160 xl:w-300 xl:items-start xl:px-12">
      <Link href={`/`}>
        <div className="relative mb-39 mt-20 h-28 w-24 md:hidden">
          <Image fill src="/images/logo/nav-logo-sm.png" alt="taskify 로고" />
        </div>
        <div className="relative mb-60 mt-20 hidden h-34 w-109 md:block xl:h-34">
          <Image fill src="/images/logo/nav-logo-xl.png" alt="taskify 로고" />
        </div>
      </Link>

      <ul className="flex flex-col items-center justify-start md:items-start">
        <div
          onClick={openModal}
          className="mb-38 flex w-full cursor-pointer flex-row justify-between md:mb-30"
        >
          <p className="hidden text-xs font-bold md:block">Dash Boards</p>
          <div className="relative h-20 w-20">
            <Image
              fill
              src="/images/icon/ic-add.svg"
              alt="새로운 대시보드 만들기"
            />
          </div>
        </div>
        {allDashboardList &&
          allDashboardList.map((myDashboard) => {
            return (
              <li
                className="mb-38 h-fit w-fit md:mb-3 xl:mb-0"
                key={myDashboard.id}
              >
                <Link href={`/dashboard/${myDashboard.id}`}>
                  <SideBarItem myDashboard={myDashboard} />
                </Link>
              </li>
            );
          })}
      </ul>

      <div className="absolute bottom-15 left-12 hidden md:block">
        {allDashboardList && (
          <PaginationBar
            totalPage={totalPage}
            activePage={page}
            onPageChange={onPageChange}
          />
        )}
      </div>
      <DashboardModal isOpen={isModalOpen} onClose={closeModal}>
        <CreateDashboardContent
          closeModal={closeModal}
          onDashboardCreated={handleDashboardCreated}
        />
      </DashboardModal>
    </aside>
  );
};
export default SideBar;
