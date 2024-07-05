import NavBar from '@/components/EditDashboard/Navbar';
import ColumnList from '@/components/column/ColumnList';
import SideBar from '@/components/sidebar/SideBar';
import React from 'react';

const Index = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[300px]">
          <SideBar />
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
