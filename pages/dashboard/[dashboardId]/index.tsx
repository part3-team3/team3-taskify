import NavBar from '@/components/EditDashboard/Navbar';
import Column from '@/components/column/Column';
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
          <Column />
        </div>
      </div>
    </>
  );
};
export default Index;
