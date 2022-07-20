import { useEffect } from 'react';
import { useModel } from '@/model/plugin-model/useModel';
import styled from 'styled-components';

const bgcolors = ['skyblue', '#7B68EE', '#E6E6FA', '#6495ED', '#7FFFAA'];
const WrapperB = styled.div<{ n: number }>`
  width: 100%;
  background: ${(props) => bgcolors[props.n % 5]};
  padding: 20px;
  border-radius: 5px;
  margin: 20px;
  opacity: 0.8;
`;

let n = 2;
function TestB() {
  const { name } = useModel('useGlobalModel', (modal) => ({ name: modal.name }));
  const { testMount } = useModel('useTestModel');

  console.log('TestB执行===>');

  useEffect(() => {
    return () => {
      n = 2;
    };
  }, []);

  return (
    <WrapperB n={++n}>
      TestB组件显示另一个model值不刷新：{testMount}-{name}
    </WrapperB>
  );
}

export default TestB;
