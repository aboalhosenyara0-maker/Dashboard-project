
import { Outlet } from 'react-router-dom'
import Nav from '../components/component/Nav'
import Sidebar from '../components/component/SideBar'
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className="dashboard-layout">
            <Nav/>
        <div className="dashboard-body">
            <Sidebar/>
        <div className="dashboard-content">
        <Outlet/>
        </div>
        </div>
        </div>
    )
}

export default Dashboard
