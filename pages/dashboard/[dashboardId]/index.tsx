import NavBar from '@/components/EditDashboard/Navbar';
import ColumnList from '@/components/column/ColumnList';
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
          <ColumnList />
        </div>
      </div>
    </>
  );
};
export default Index;
