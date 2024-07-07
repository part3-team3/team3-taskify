import NavBar from '@/components/EditDashboard/Navbar';
import ColumnList from '@/components/column/ColumnList';
import SideBarDashboard from '@/components/sidebar/SideBarDashboard';
import React from 'react';

const Index = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[300px]">
          <SideBarDashboard />
        </div>
        <div className="flex-1 min-w-0">
          <NavBar />
          <ColumnList />
        </div>
      </div>
    </>
  );
};
export default Index;
