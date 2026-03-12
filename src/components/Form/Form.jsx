import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Form.css'

const Form = ({ title, description, submit, footer, inputs, setData }) => {

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        const { name, type, value, files } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }))
    }

    const handleSubmit = (e) => {
    e.preventDefault()
    console.log("📦 البيانات داخل الفورم:", formData)
    
    setData(formData)
}

    return (
        <form id='design' onSubmit={handleSubmit}>
            <img src="/assets/blue.png" alt="" />
            <div className='info'>
                <h1>{title}</h1>
                <p>{description}</p>

                <div className="form-flex">
                    {inputs.map((input) => (
                        <div
                            key={input.name}
                            className="input-group"
                            style={{ width: input.width }}
                        >
                            <label htmlFor={input.name} className='label'>
                                {input.label}
                            </label>

                            <input
                                id={input.name}
                                name={input.name}
                                type={input.type}
                                placeholder={input.placeholder}
                                className={input.className}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>

                <input type="submit" value={submit} className="submit"/>
                <p className='fo'>
                    {footer?.content}
                    <Link to={footer?.url}>{footer?.LinkContent}</Link>
                </p>
            </div>
        </form>
    )
}

export default Form

