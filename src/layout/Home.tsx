import CustomLoading from '@/components/CustomLoading';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const WrapperHomeLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .content {
    flex: 1;
    width: 100%;
  }
`;

function HomeLayout() {
  // console.log('homeLayout=============>');
  return (
    <WrapperHomeLayout>
      <Suspense fallback={<CustomLoading />}>
        <div className="content">
          <Outlet />
        </div>
      </Suspense>
    </WrapperHomeLayout>
  );
}

export default HomeLayout;
