import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoutes from './utils/PrivateRoutes';
// import Login from './pages/login/Login';
// import './App.css';

function App() {
  let noCheckSidebar = false;
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          noCheckSidebar = route.noSidebar;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page noSidebar={noCheckSidebar} />
                </Layout>
              }
            />
          );
        })}
      </Routes>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {privateRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            noCheckSidebar = route.noSidebar;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page noSidebar={noCheckSidebar}/>
                  </Layout>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
