import { useModel } from '@/model/plugin-model/useModel';
import styled from 'styled-components';

const bgcolors = ['skyblue', '#7B68EE', '#E6E6FA', '#6495ED', '#7FFFAA'];
const WrapperA = styled.div<{ n: number }>`
  width: 100%;
  background: ${(props) => bgcolors[props.n % 5]};
  padding: 20px;
  border-radius: 5px;
  opacity: 0.7;
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px;
  }
`;

let n = 4;
function TestA() {
  const { mount, setMount } = useModel('useGlobalModel', (modal) => ({ mount: modal.mount, setMount: modal.setMount }));
  console.log('TestA执行===>');
  return (
    <WrapperA n={++n}>
      <div>
        TestA
        <br />
        modal===&gt;({mount})<br />
      </div>
      <button
        onClick={() => {
          setMount((n) => n + 1);
        }}
      >
        点击修改
        <br />
        model
      </button>
    </WrapperA>
  );
}

export default TestA;
