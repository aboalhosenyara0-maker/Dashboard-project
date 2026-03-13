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
    console.log(" البيانات داخل الفورم:", formData)
    
    setData(formData)
}

    return (
        <form id='design' onSubmit={handleSubmit}>
            <img src="/Dashboard-project/assets/blue.png" alt="" />
            <svg className="waves" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#5c9bff" fillOpacity="0.6"
                d="M0,160L80,165C160,170,320,180,480,170C640,160,800,120,960,110C1120,100,1280,120,1360,130L1440,140V0H0Z">
                </path>

                <path fill="#1e5bd6" fillOpacity="0.5"
                d="M0,96L120,110C240,125,480,155,720,150C960,145,1200,105,1320,85L1440,65V0H0Z">
                </path>
            </svg>
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
                            {input.type === "file" ? (
                            <label className="file-upload">
                                <input
                                id={input.name}
                                name={input.name}
                                type="file"
                                onChange={handleChange}
                                hidden
                                />
                                <div className="upload-box">
                                ☁️
                                <p>Upload image</p>
                                </div>
                            </label>

                            ) : (

                            <input
                                id={input.name}
                                name={input.name}
                                type={input.type}
                                placeholder={input.placeholder}
                                className={input.className}
                                onChange={handleChange}
                            />

                            )}
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

