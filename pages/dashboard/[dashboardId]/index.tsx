// tsconfig.json 또는 jsconfig.json 설정을 확인하고, 필요하다면 경로를 수정하세요.
import NavBar from '@/components/EditDashboard/Navbar';
import Column from '@/components/column/Column';
import DashboardExample from '@/pages/mydashboard';
import React from 'react';

const Index = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* <div style={{ width: '300px' }}>
          <DashboardExample />
        </div> */}
        <div style={{ width: '1620px' }}>
          <Column /> {/* Add the required 'columnId' prop */}
        </div>
      </div>
    </>
  );
};

export default Index;
