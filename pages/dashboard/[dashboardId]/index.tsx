import NavBar from '@/components/EditDashboard/Navbar';
import Column from '@/components/column/Column';
import SideBar from '@/components/sidebar/SideBar';
import React from 'react';

const Index = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '300px' }}>
          <SideBar />
        </div>
        <div style={{ width: '1620px' }}>
          <NavBar />
          <Column />
        </div>
      </div>
    </>
  );
};
export default Index;
