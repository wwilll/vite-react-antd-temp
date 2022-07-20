import { goBack } from '@/utils';
import { memo } from 'react';
import styled from 'styled-components';

const WrapperNotFound = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  font-size: 50px;
  background: linear-gradient(-45deg, #80908a, #3f524e);
  span {
    border: 1px solid #c1b2b2;
    margin-top: 30px;
    padding: 10px 50px;
    cursor: pointer;
    font-size: 18px;
    background: linear-gradient(-45deg, #130e0d, #810836, #141718);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function NotFound() {
  return (
    <WrapperNotFound>
      <h1>404</h1>
      <span onClick={goBack}>返回</span>
    </WrapperNotFound>
  );
}

export default memo(NotFound);
