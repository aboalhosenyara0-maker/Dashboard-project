import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import './Edit.css'

const Edit = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    //  نجيب بيانات المنتج
    useEffect(() => {
        console.log("TOKEN:", localStorage.getItem("token"))
        axios.get(`https://vica.website/api/items/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then(res => {
            const item = res.data
            setName(item.name)
            setPrice(item.price)
            setPreview(item.image_url)
        })
        .catch(err => {
        console.log("ERROR:", err.response)
    })

    }, [id])

    // تغيير الصورة
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    // تحديث المنتج
    const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("_method", "PUT")

        if (image) {
            formData.append("image", image)
        }

        const response = await axios.post(
            `https://vica.website/api/items/${id}`,
            formData,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        console.log("Updated:", response.data)

        // الرجوع لصفحة المنتجات
        navigate("/dashboard/products")

    } catch (error) {
        console.log("FULL ERROR:", error.response)
    }
}





    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit product</h1>

            <div className="parent">

                <div className="add_product">
                    <label>Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} //  لجلب القيمة المدخلة بالانبت
                    />

                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <button type="submit" className="save-btn">
                        Update
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
                        style={{ display: "none" }}// لنخفي اختيار ملف
                    />
                </div>

            </div>
        </form>
    )
}

export default Edit

