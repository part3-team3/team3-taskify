import DashboardList from '@/components/MyDashboard/DashboardList';
import InvitedDashboardSection from '@/components/MyDashboard/InvitedDashboardSection';
import NavBarbasic from '@/components/Navbarbasic';
import SideBar from '@/components/sidebar/SideBar';

const Mydashboard: React.FC = () => {
  return (
    <div className="flex bg-gray-10">
      <SideBar />
      <main className="flex flex-1 flex-col">
        <NavBarbasic />
        <DashboardList />
        <InvitedDashboardSection />
      </main>
    </div>
  );
};
export default Mydashboard;
