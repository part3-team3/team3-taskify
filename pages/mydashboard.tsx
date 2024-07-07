import DashboardList from '@/components/MyDashboard/DashboardList';
import InvitedDashboardSection from '@/components/MyDashboard/InvitedDashboardSection';
import NavBarbasic from '@/components/Navbarbasic';
import SideBar from '@/components/sidebar/SideBar';
import { useState } from 'react';

const Mydashboard: React.FC = () => {
  const [dashboardCreated, setDashboardCreated] = useState(false);

  const handleDashboardCreated = () => {
    setDashboardCreated((prev) => !prev);
  };
  return (
    <div className="flex bg-gray-10">
      <SideBar
        onDashboardCreated={handleDashboardCreated}
        dashboardCreated={dashboardCreated}
      />
      <main className="flex flex-1 flex-col">
        <NavBarbasic />
        <DashboardList
          onDashboardCreated={handleDashboardCreated}
          dashboardCreated={dashboardCreated}
        />
        <InvitedDashboardSection onDashboardCreated={handleDashboardCreated} />
      </main>
    </div>
  );
};
export default Mydashboard;
