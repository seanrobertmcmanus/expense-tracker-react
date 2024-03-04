import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Styles
import './App.css'
// Pages
import  Home  from './pages/HomePage'; // Landing Page
// Dashboard Pages
import DashboardLayout  from './pages/dashboard/DashboardLayout'; // Dashboard Layout
import  Dashboard  from './pages/dashboard/DashboardPage'; // Dashboard Page
// IIA Pages
import IIALayout from './pages/dashboard/IIA/incomeAndAssetsLayout';
import Overview from './pages/dashboard/IIA/overview';
import Accounts from './pages/dashboard/IIA/accounts';
import Assets from './pages/dashboard/IIA/assets';
import Income from './pages/dashboard/IIA/income';

// Not Found Page
import NotFoundPage from './pages/NotFoundPage';

// Application Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'income-and-assets',
        element: <IIALayout />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: 'accounts',
            element: <Accounts />,
          },
          {
            path: 'assets',
            element: <Assets />,
          },
          {
            path: 'income',
            element: <Income />,
          },
        ]
      },

    ],
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
