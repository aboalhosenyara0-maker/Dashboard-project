import { useLocation } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    const location = useLocation()

    const getPageTitle = () => {
        if (location.pathname.includes("add")) return "Product/Add"
        if (location.pathname.includes("edit")) return "Product/Edit"
        return " Products"
    }
    return (
    <nav>
        <div className="logo">
            <h1><span>Dash</span>Stack</h1>
            <h1>{getPageTitle()}</h1>
        </div>
    <div className="admin">
        <img src="/Dashboard-project/assets/image.png" alt="admin" />
        <div>
            <p>Yara abo alhosen</p>
            <span>Admin</span>
        </div>
    </div>
    </nav>
    )
}

export default Nav
