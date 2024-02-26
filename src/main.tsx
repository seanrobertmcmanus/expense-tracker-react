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
import IncomeAndAssetsPage from './pages/dashboard/IncomeAndAssetsPage'; // Income and Assets Page

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
        element: <IncomeAndAssetsPage />,
      },

    ],
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
