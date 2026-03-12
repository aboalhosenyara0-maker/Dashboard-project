import { Link, useNavigate } from 'react-router-dom'
import './Sidebar.css'
import { useState } from 'react'

const Sidebar = () => {
    const [showPopup , setshowPopup] = useState()
    const navigate = useNavigate()

    const confirmLogout = () =>{
        fetch("https://vica.website/api/logout" , {
            method :"POST" ,
            headers :{
                "Accept" :"application/json" ,
                "Authorization" : localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(res =>{ console.log(res)
            localStorage.removeItem("token")
            navigate("/")
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
        <div className="dash">
            <img src="/assets/clock.png" alt="clock" />
            <Link to="/dashboard/products">dashboard</Link>
        </div>
        <div className="product">
            <img src="/assets/square.png" alt="square" />
            <Link to="/dashboard/products">products</Link>
        </div>
        <div className='Logout'>
            <img src="/assets/img.png" alt="clock" />
            <button style={{border:"none" , backgroundColor:"white" , cursor:"pointer"}} onClick={() => setshowPopup(true)} >Logout</button>
            {showPopup&& (
            <div className="popup-overlay">
                <div className="popup">
                <p>Are you sure you want to Logout?</p>
                <button style={{backgroundColor:"red"}} onClick={confirmLogout}>Yes</button>
                <button style={{backgroundColor :"blue"}} onClick={() =>setshowPopup(false)}>No</button>
                </div>
            </div>
            )}
        </div>
        </div>
    )
}

export default Sidebar
