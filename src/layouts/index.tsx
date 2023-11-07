import { Suspense } from 'react';
import { Outlet } from 'umi';
import { Provider } from 'react-redux'
import { reduxStore, persistor } from '@/Redux';
import Web3ModalProvider from '@/provider/Web3ModalProvider';
import ModalProvider from '@/provider/modalProvider';
import NoticeProvider from '@/provider/NoticeProvider';
import LoadingProvider from '@/provider/loadingProvider';
import { PersistGate } from 'redux-persist/integration/react';
import './index.less'
import 'animate.css'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { ReactQueryProvider } from '@/provider/ReactQueryProvider';


export default function Layout() {
  return (
    <Suspense fallback={<div/>}>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactQueryProvider>
            <Web3ModalProvider>
              <LoadingProvider>
                <ModalProvider>
                  <NoticeProvider>
                    <Header/>
                    <Outlet/>
                    <Footer/>
                  </NoticeProvider>
                </ModalProvider>
              </LoadingProvider>
            </Web3ModalProvider>
          </ReactQueryProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}