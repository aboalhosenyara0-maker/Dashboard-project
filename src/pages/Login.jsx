import { useEffect, useState } from "react"
import Form from "../components/Form/Form"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [data, setData] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (data.email && data.password) {
            fetch("https://vica.website/api/task-login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {console.log(res)
                localStorage.setItem("token" , res.data.token)
                navigate("/dashboard")
            })
            .catch(err => console.log(err))
        }
    }, [data])

    const inputs = [
        {
            type: "email",
            placeholder: "Email",
            name: "email",
            label: "Email",
            className: "input-email",
            width: "95%"
        },
        {
            type: "password",
            placeholder: "password",
            name: "password",
            label: "Password",
            className: "input-password",
            width: "95%"
        }
    ]

    return (
        <div>
            <Form
                title="Sign In"
                description="Please enter your email and password to continue"
                submit="Sign In"
                footer={{ content: "Don't have an account? ", url: "/register", LinkContent: "Sign Up" }}
                inputs={inputs}
                setData={setData}  
            />
        </div>
    )
}

export default Login

