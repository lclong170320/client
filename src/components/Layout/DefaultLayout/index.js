import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.css';
import classNames from 'classnames/bind';
import Footer from './Footer';
import { createContext, useState } from 'react';
import ScrollToTop from 'react-scroll-to-top';
const cx = classNames.bind(styles);

export const onClickCheckCart = createContext();
export const checkCart = createContext();

function DefaultLayout({ children }) {
  const [check, setCheck] = useState(false);
  const onClickCart = () => {
    setCheck(!check);
  };
  return (
    <onClickCheckCart.Provider value={onClickCart}>
      <checkCart.Provider value={check}>
        <div className={cx('default-wrapper')}>
          <Header />
          <div className={cx('default-container')}>
            {!children.props.noSidebar ? <Sidebar /> : <> </>}
            <ScrollToTop
              smooth
              viewBox="0 0 20 20"
              width="30"
              height="30"
              style={{ backgroundColor: '#008848', textAlign: 'center' }}
              svgPath="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"
            />
            <div className={cx('default-content')}>{children}</div>
          </div>
          <Footer />
        </div>
      </checkCart.Provider>
    </onClickCheckCart.Provider>
  );
}

export default DefaultLayout;
