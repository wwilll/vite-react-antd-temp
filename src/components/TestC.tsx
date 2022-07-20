import { memo, useState } from 'react';
import { useModel } from '@/model/plugin-model/useModel';
import styled from 'styled-components';

const bgcolors = ['skyblue', '#7B68EE', '#E6E6FA', '#6495ED', '#7FFFAA'];
const WrapperC = styled.div<{ n: number }>`
  width: 100%;
  background: ${(props) => bgcolors[props.n % 5]};
  padding: 20px;
  border-radius: 5px;
  opacity: 0.5;
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px;
  }
`;

let n = 4;
function TestC() {
  const { mount } = useModel('useGlobalModel', (model) => ({
    mount: model.mount,
  }));
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount((count) => count + 1);
  };

  console.log('TestC执行===>');

  return (
    <WrapperC n={++n}>
      <p>
        TestC
        <br />
        modal：{mount}
        <br />
        组件属性count: {count}
      </p>
      <button type="button" onClick={onClick}>
        点击修改
        <br />
        state
      </button>
    </WrapperC>
  );
}

export default memo(TestC);
