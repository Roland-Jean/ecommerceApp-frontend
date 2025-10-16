// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './pages/routing/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import store from './store/store';
import { Toaster } from 'react-hot-toast';
// Move QueryClient outside component to prevent recreating on each render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minuntes time to be consider data as fresh
      refetchInterval: 1000 * 30, // every 30 seconds
  refetchOnWindowFocus: true, //refresh when user switch back to  the tab
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/ecommerceApp-frontend">
            <Header />
            <AppRoutes />
            <Footer />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="bottom-right" />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;