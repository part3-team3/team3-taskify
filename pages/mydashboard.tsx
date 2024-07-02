import DashboardList from '@/components/MyDashboard/DashboardList';
import SideBar from '@/components/sidebar/SideBar';

const dashboardExample: React.FC = () => {
  return (
    <div className="flex bg-gray-10">
      <SideBar />
      <main className="flex flex-1">
        <DashboardList />
      </main>
    </div>
  );
};
export default dashboardExample;
