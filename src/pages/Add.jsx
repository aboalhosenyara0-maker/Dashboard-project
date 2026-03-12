import { useState } from "react"
import axios from "axios"
import './Add.css'
import { useNavigate } from "react-router-dom"

const Add = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("image", image)

        axios.post("https://vica.website/api/items", formData, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            console.log("Saved:", res.data)
            navigate("/dashboard/products")
        })
        .catch(err => console.log(err))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add product</h1>

            <div className="parent">

                <div className="add_product">
                    <label htmlFor="Name">Product Name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        id="Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="Price">Price</label>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        id="Price"
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <button type="submit" className="save-btn">
                        Save
                    </button>
                </div>

                <div className="image">
                    <label htmlFor="imageUpload" className="upload-box">
                        {preview ? (
                            <img src={preview} alt="preview" />
                        ) : (
                            <span>⬆ Click to Upload</span>
                        )}
                    </label>

                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                </div>

            </div>
        </form>
    )
}

export default Add


