import { Suspense } from 'react';
import { Outlet } from 'umi';
import { Provider } from 'react-redux'
import { reduxStore, persistor } from '@/Redux';
import Web3ModalProvider from '@/provider/Web3ModalProvider';
import ModalProvider from '@/provider/modalProvider';
import NoticeProvider from '@/provider/NoticeProvider';
import LoadingProvider from '@/provider/loadingProvider';
import { PersistGate } from 'redux-persist/integration/react';

export default function Layout() {
  return (
    <Suspense fallback={<div/>}>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Web3ModalProvider>
            <LoadingProvider>
              <ModalProvider>
                <NoticeProvider>
                  <Outlet />
                </NoticeProvider>
              </ModalProvider>
            </LoadingProvider>
          </Web3ModalProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}