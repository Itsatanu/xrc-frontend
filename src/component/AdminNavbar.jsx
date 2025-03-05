import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Menu from '../asset/Menu.png'
import './AdminNavbar.css'
export default function AdminNavbar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar open/close

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className={`adminsidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <nav>
          <ul>
          <li className='admin-sidebar-list-view'><button onClick={()=>{navigate('/admin/user')}}>Find User</button></li>
            <li className='admin-sidebar-list-view'><button onClick={()=>{navigate('/admin/all-user')}}>All User</button></li>
            <li className='admin-sidebar-list-view'><button onClick={()=>{navigate('/admin/deposit')}}>All Deposite</button></li>
            <li className='admin-sidebar-list-view'><button onClick={()=>{navigate('/admin/withdrawal')}}>All withdrawal</button></li>
            <li className='admin-sidebar-list-view'><button onClick={()=>{navigate('/admin/find-user-deposit-history')}}>Find User Deposit History</button></li>
            <li className='admin-sidebar-list-view'><button onClick={()=>{navigate('/admin/find-user-withdrawal-history')}}>Find User withdrawal History</button></li>
            <li className='admin-sidebar-list-view'><button onClick={()=>{navigate('/admin/update-deposit')}}>update-deposit</button></li>
            <li className='admin-sidebar-list-view'><button onClick={()=>{navigate('/admin/update-withdrawal')}}>update-withdrawal</button></li>
          </ul>
        </nav>
      </div>


      <nav className="admin-navbar">
        <div className='admin-nav-btn-div'>
          <button onClick={toggleSidebar}>
            <img width="30" height="30" src={Menu} alt="menu--v3" />
          </button>
        </div>
        <div className="admin-nav-app-name">Daman999</div>
      </nav>

    </div>
  );

}