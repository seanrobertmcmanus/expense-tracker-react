
import { Outlet } from 'react-router-dom';
// Dashboard Navigation
// Side Navigation 
import DashSideNav from '../../components/NavBar/DashSideNav';

function DashboardLayout() {
  return (
    <div>
      <DashSideNav />
      <Outlet /> {/* This is where your nested dashboard pages will be rendered */}
    </div>
  );
}

export default DashboardLayout;