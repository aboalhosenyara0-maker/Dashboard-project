
import { useEffect, useState } from "react"
import Form from "../components/Form/Form"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
    console.log(" useEffect اشتغل", data)

    if (!data) {
        return;
    }

    console.log("DATA SENT:", data)

    const formData = new FormData();
    console.log("DATA SENT:", data || "")
    formData.append("first_name", data.first_name || "");
    formData.append("last_name", data.last_name || "");
    formData.append("user_name", data.user_name || "");
    formData.append("email", data.email || "");
    formData.append("password", data.password || "");
    formData.append("password_confirmation", data.password_confirmation || "");
    formData.append("profile_image", data.profile_image || "");

    fetch("https://vica.website/api/register", {
        method: "POST",
        headers: {
            "Accept": "application/json",
        },
        body: formData
    })
    .then(res => res.json())
    .then(res => {
        console.log("RESPONSE:", res)
        localStorage.setItem("token" , `Bearer ${res.data.token}`)
        navigate("/dashboard")
    })

    .catch(err => console.log(err))
    
    console.log(" رح نبعت الطلب");
}, [data])

    const inputs=[
        {
            type :"text" ,
            placeholder :"First Name",
            name :"first_name",
            label:"First Name",
            className: "input-email",
            width :"45%"
        },
        {
            type :"text" ,
            placeholder :"Last Name",
            name :"last_name",
            label:"Last Name",
            className: "input-email",
            width :"45%"
        },
        {
            type: "text",
            placeholder: "Username",
            name: "user_name",
            label: "Username",
            className: "input-email",
            width: "94%"
        },
        {
            type :"email" ,
            placeholder :"Email",
            name :"email",
            label:"Email",
            className: "input-email",
            width :"94%"
            
        },
        {
            type :"Password" ,
            placeholder :"********",
            name :"password",
            label:"Password",
            className: "input-email",
            width :"45%"
        },
        {
            type :"Password" ,
            placeholder :"********",
            name :"password_confirmation",
            label:"Confirm",
            className: "input-email",
            width :"45%"
        },
        {
            type :"file" ,
            placeholder :"Profile Image",
            name :"profile_image",
            label:"Profile Image",
            className: "Profile_Image",
            width :"95%"
        },
    ]
    return (
        <div>
            <Form
            title="Sign Up"
            description="Create a account to continue"
            submit="Sign Up"
            inputs={inputs}
            footer={{content :"Already have an account? " , url :"/" , LinkContent :"Sign In"}}
            setData={setData}
            />
        </div>
    )
}

export default Register
