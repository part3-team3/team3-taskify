import NavBar from '@/components/EditDashboard/Navbar';
import ColumnList from '@/components/column/ColumnList';
import SideBarDashboard from '@/components/sidebar/SideBarDashboard';
import React from 'react';

const Index = () => {
  return (
    <>
      <div className="flex">
        <div className="">
          <SideBarDashboard />
        </div>
        <div className="min-w-0 flex-1">
          <NavBar />
          <ColumnList />
        </div>
      </div>
    </>
  );
};
export default Index;
