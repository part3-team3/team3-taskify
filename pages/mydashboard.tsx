import MyDashboardList from '@/components/MyDashboardList';
import axios from '@/lib/axiosMyDashboard';
import { DashboardResponse, Dashboard } from '@/types/myDashboardTypes';
import { GetStaticProps } from 'next';


export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await axios.get(`dashboards?navigationMethod=pagination`);
    const data: DashboardResponse = res.data;
    return {
      props: {
        dashboardList: data.dashboards,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        dashboardList: [],
      },
    };
  }
};

interface mydashboardProps {
  dashboardList: Dashboard[];
}

export default function mydashboard({ dashboardList }: mydashboardProps) {
  return (
    <>
      <MyDashboardList dashboardList={dashboardList} />
    </>
  );
}