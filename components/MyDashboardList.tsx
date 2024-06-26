import { Dashboard } from '@/types/myDashboardTypes';
import Image from 'next/image';
import { useState } from 'react';

interface MyDashboardItemProps {
  myDashboard: Dashboard;
}
const MyDashboardItem = ({ myDashboard }: MyDashboardItemProps) => {
  const dashboardColor: { [coloKkey: string]: string } = {
    '#7AC555': 'bg-green',
    '#760DDE': 'bg-purple',
    '#FFA500': 'bg-orange',
    '#E876EA': 'bg-pink',
    '#76A5EA': 'bg-blue',
  };
  return (
    <>
      <div className="flex h-58 w-260 flex-row items-center justify-between rounded-lg border border-solid border-gray-30 p-20">
        <div className="flex flex-row items-center">
          <div
            className={`${dashboardColor[myDashboard.color]} h-8 w-8 rounded-full`}
          ></div>
          <p className="ml-12 mr-4 text-sm font-semibold">
            {myDashboard.title}
          </p>
          {myDashboard.createdByMe && <div className="relative h-12 w-15">
            <Image
              fill
              src="/images/icon/ic-crown.svg"
              alt="내가 만든 대시보드"
            />
          </div>}
        </div>
        <div className="relative h-14 w-8">
          <Image
            fill
            src="/images/icon/ic-on-arrow-right.svg"
            alt="해당 대시보드로 이동"
          />
        </div>
      </div>
    </>
  );
};

interface MyDashboardListProps {
  dashboardList: Dashboard[];
}


const MyDashboardList = ({ dashboardList }: MyDashboardListProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myDashboards, setMyDashboards] = useState(dashboardList);
  return (
    <>
      <ul className="container mx-auto grid h-fit w-fit grid-cols-1 grid-rows-6 gap-y-8">
        <div className="flex h-58 w-260 flex-row items-center justify-between rounded-lg border border-solid border-gray-30 py-23 px-56">
          <p className="text-sm font-semibold">새로운 대시보드</p>
          <div className="relative h-22 w-22">
            <Image
              fill
              src="/images/icon/ic-color-add.svg"
              alt="새로운 대시보드 만들기"
            />
          </div>
        </div>
        {myDashboards &&
          myDashboards.map((myDashboard) => {
            return (
              <li className="w-fit" key={myDashboard.id}>
                <MyDashboardItem myDashboard={myDashboard} />
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default MyDashboardList;
