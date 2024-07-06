import NavBar from '@/components/EditDashboard/Navbar';
import DashboardList from '@/components/MyDashboard/DashboardList';
import InvitedDashboardSection from '@/components/MyDashboard/InvitedDashboardSection';
import SideBar from '@/components/sidebar/SideBar';

const Mydashboard: React.FC = () => {
  return (
    <div className="flex bg-gray-10">
      <SideBar />
      <main className="flex flex-1 flex-col">
        <DashboardList />
        <InvitedDashboardSection />
      </main>
    </div>
  );
};
export default Mydashboard;
