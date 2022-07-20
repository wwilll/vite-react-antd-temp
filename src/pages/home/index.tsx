// import { ReactComponent as Logo } from '@/assets/imgs/logo.svg';
import Logo from '@/assets/imgs/logo.svg';
import { changeTheme } from '@/utils';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WrapperHome = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .logo-svg {
    width: 200px;
    height: 200px;
  }
  button {
    margin: 20px;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    /* transform: rotate(45deg); */
  }
`;

function Home() {
  // const onClick = () => {
  //   console.log('Date.now()', Date.now());
  // };
  return (
    <WrapperHome>
      <img className="App-log1o" src={Logo} alt="" />
      {/* <Logo className="App-logo logo-svg"></Logo> */}
      {/* <button onClick={onClick}>测试Date now</button> */}
      <button className="ghost-btn" onClick={changeTheme}>
        切换主题
      </button>
      <Link to={`${__APP_DEPLOY__}home/test`}>测试全局hooks</Link>
    </WrapperHome>
  );
}

export default Home;
