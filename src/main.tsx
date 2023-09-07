import Layout from '@/components/layouts/default';
import Subject from '@/components/layouts/subject';
import '@/globals.css';
import Home from '@/pages/home';
import Subjects from '@/pages/subjects';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/subjects',
    element: (
      <Layout>
        <Subjects />
      </Layout>
    ),
  },
  {
    path: '/subjects/:subjectId',
    element: (
      <Layout>
        <Subject />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
