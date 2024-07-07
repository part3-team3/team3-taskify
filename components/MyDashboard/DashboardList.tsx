import DashboardModal from '@/components/MyDashboard/DashboardModal';
import { getDashboard } from '@/pages/api/mydashboard/getDashboard';
import { Dashboard, DashboardResponse } from '@/types/myDashboardTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import CreateDashboardContent from './CreateDashboardContent';
import MyDashboardItem from './MyDashboardItem';
import PaginationBar from './PaginationBar';

interface DashboardListProps {
  onDashboardCreated: () => void;
  dashboardCreated: boolean;
}
const DashboardList: React.FC<DashboardListProps> = ({
  onDashboardCreated,
  dashboardCreated,
}:DashboardListProps) => {
  const [page, setPage] = useState(1);
  const size = 5;
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
    <>
      <div className="mx-auto mt-24 w-fit md:mt-40">
        <ul className="container grid h-388 w-260 grid-cols-1 grid-rows-6 gap-y-8 md:h-224 md:w-504 md:grid-cols-2 md:grid-rows-3 md:gap-x-8 xl:h-152 xl:w-1022 xl:grid-cols-3 xl:grid-rows-2 xl:gap-x-8">
          <div
            onClick={openModal}
            className="flex h-58 w-260 cursor-pointer flex-row items-center justify-between rounded-lg border border-solid border-gray-30 bg-white px-56 py-23 md:h-68 md:w-247 xl:h-70 xl:w-332"
          >
            <p className="text-sm font-semibold">새로운 대시보드</p>
            <div className="relative h-22 w-22">
              <Image
                fill
                src="/images/icon/ic-color-add.svg"
                alt="새로운 대시보드 만들기"
              />
            </div>
          </div>
          {allDashboardList &&
            allDashboardList.map((myDashboard) => {
              return (
                <li className="w-fit" key={myDashboard.id}>
                  <Link href={`/dashboard/${myDashboard.id}`}>
                    <MyDashboardItem myDashboard={myDashboard} />
                  </Link>
                </li>
              );
            })}
        </ul>
        <div className="mt-8 flex items-center justify-end">
          {allDashboardList && (
            <>
              <p className="mr-12 text-xs font-normal">
                {totalPage}페이지 중 {page}
              </p>
              <PaginationBar
                totalPage={totalPage}
                activePage={page}
                onPageChange={onPageChange}
              />
            </>
          )}
        </div>
      </div>
      <DashboardModal isOpen={isModalOpen} onClose={closeModal}>
        <CreateDashboardContent
          closeModal={closeModal}
          onDashboardCreated={handleDashboardCreated}
        />
      </DashboardModal>
    </>
  );
};
export default DashboardList;
