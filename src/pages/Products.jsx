import axios from "axios"
import { useEffect, useState } from "react"
import './Products.css'
import {  useNavigate } from "react-router-dom"

const Products = () => {
    const navigate = useNavigate()
    const [showPopup , setshowPopup] = useState(false)
    const [selectedId , setSelectedId] = useState(null)
    const [items , setitems] = useState([])
    useEffect( ()=> {
        axios.get("https://vica.website/api/items" , {
            headers : {
                "Accept" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            console.log("TYPE:", typeof res.data)
            console.log("IS ARRAY:", Array.isArray(res.data))
            setitems(res.data)
})
        .catch(err => console.log(err))
    } , [])
    const delProducte = () => {
    axios.delete(`https://vica.website/api/items/${selectedId}`, {
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => {
        console.log(res.data)

        // تحديث الجدول بدون ريفريش
        setitems(items.filter(item => item.id !== selectedId))

        setshowPopup(false)
        setSelectedId(null)
    })
    .catch(err => console.log(err))
}

    return (
        <div className="products-wrapper">
            <div className="add">
                <h1>Manage Products</h1>
                <button onClick={ ()=>  navigate("/dashboard/products/add")}>+ Add product</button>
            </div>
            <table className="products-table">
        <thead>
            <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>price</th>
            <th>Image</th>
            <th>Action</th>
            </tr>
        </thead>

        <tbody>
            {items.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                <img src={item.image_url} alt={item.name} />
                </td>
                <td className="edit">
                    <button onClick={() => navigate(`edit/${item.id}`)}><img src="/assets/edit.png" alt="" /></button>
                    <button  onClick={() => {
                        setSelectedId(item.id)
                        setshowPopup(true)}}><img src="/assets/delete.png" alt="" /></button>
                    {showPopup && (
            <div className="parent">
                <div className="child">
                <p>Are You Sure You Want To Delete This Product?</p>
                <div className="btn">
                    <button onClick={delProducte} style={{backgroundColor:"red"}}>Yes</button>
                    <button onClick={() => setshowPopup(false)} style={{backgroundColor:"blue"}}>No</button>
                </div>
            </div>
        </div>
            )}
            </td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>
    )
}

export default Products
