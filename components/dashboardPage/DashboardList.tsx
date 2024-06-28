import { getDashboard } from '@/pages/api/getDashboard';
import { Dashboard, DashboardResponse } from '@/types/myDashboardTypes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import MyDashboardItem from './MyDashboardItem';
import PaginationBar from './PaginationBar';

const DashboardList: React.FC = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState(5);
  const [allDashboardList, setAllDashboardList] = useState<Dashboard[]>([]);
  const [totalPage, setTotalPage] = useState(1);
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
        <ul className="h-388 container grid w-260 grid-cols-1 grid-rows-6 gap-y-8">
          <div className="flex h-58 w-260 flex-row items-center justify-between rounded-lg border border-solid border-gray-30 px-56 py-23">
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
    </>
  );
};
export default DashboardList;
