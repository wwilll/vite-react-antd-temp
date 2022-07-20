import { Link } from 'react-router-dom';
import TestA from '@/components/TestA';
import TestB from '@/components/TestB';
import TestC from '@/components/TestC';
// import styled from 'styled-components';
import styled from '@/assets/lib/px2vw';
import { useTranslation } from 'react-i18next';
import { useModel } from '@/model/plugin-model/useModel';
import { useEffect } from 'react';
import { i18n } from '@/language';

const bgcolors = ['#7B68EE', '#E6E6FA', '#6495ED', '#7FFFAA'];

const WrapperTest = styled.div<{ n: number }>`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px; /** px2vw_ignore */
  background: ${(props) => bgcolors[props.n % 4]};
  a {
    color: white;
  }
  @media screen and (min-width: ${() => 900 + 'px /** px2vw_ignore */'}) {
    width: 900px; /** px2vw_ignore */
  }
`;

let n = 3;
function Test() {
  const { pageInfo } = useModel('useGlobalModel', (modal) => ({ pageInfo: modal.pageInfo }));
  const { t } = useTranslation();
  console.log('TestPage执行===>', n);
  useEffect(() => {
    return () => {
      n = 0;
    };
  }, []);
  return (
    <WrapperTest n={++n}>
      {/* 此处切换语言逻辑应抽成组件，不然其会导致TestA、TestB组件刷新，Test因有memo处理而不参与刷新 */}
      标题国际化测试：{t('title') || t(pageInfo?.menu?.title || '')}
      <span
        className="ghost-btn"
        onClick={() => {
          i18n.changeLanguage(i18n.language == 'en' ? 'cn' : 'en');
        }}
      >
        切换语言
      </span>
      <br />
      背景变化即为组件刷新
      <TestA></TestA>
      <TestB></TestB>
      <TestC></TestC>
      <Link to={`${__APP_DEPLOY__}home/main`}>进入主页</Link>
    </WrapperTest>
  );
}

export default Test;
