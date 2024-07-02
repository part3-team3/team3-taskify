import Modal from '@/components/common/Modal';
import { getDashboard } from '@/pages/api/getDashboard';
import { Dashboard, DashboardResponse } from '@/types/myDashboardTypes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import CreateDashboardContent from './CreateDashboardContent';
import MyDashboardItem from './MyDashboardItem';
import PaginationBar from './PaginationBar';

const DashboardList: React.FC = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState(5);
  const [allDashboardList, setAllDashboardList] = useState<Dashboard[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
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
    getDashboardData();
  }, [page, size]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="mx-auto w-fit">
        <ul className="container grid h-388 w-260 grid-cols-1 grid-rows-6 gap-y-8 md:h-224 md:w-504 md:grid-cols-2 md:grid-rows-3 md:gap-x-8 xl:h-152 xl:w-1022 xl:grid-cols-3 xl:grid-rows-2 xl:gap-x-8">
          <div
            onClick={openModal}
            className="flex h-58 w-260 flex-row items-center justify-between rounded-lg border border-solid border-gray-30 bg-white px-56 py-23 cursor-pointer	md:h-68 md:w-247 xl:h-70 xl:w-332"
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
                  <MyDashboardItem myDashboard={myDashboard} />
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
      <Modal // Modal 컴포넌트에 넘겨주고 싶은 값을 prop으로 설정하기
        isOpen={isModalOpen}
        onClose={closeModal}
        width="327px"
        height="293px"
      >
        <CreateDashboardContent closeModal={closeModal}/>
      </Modal>
    </>
  );
};
export default DashboardList;
