import { memo } from 'react';
import styled from 'styled-components';

const WrapperCustomLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CustomLoading() {
  return (
    <WrapperCustomLoading>
      <div className="custom-loader"></div>
    </WrapperCustomLoading>
  );
}

export default memo(CustomLoading);
