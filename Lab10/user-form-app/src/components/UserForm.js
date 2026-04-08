import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserForm()
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
    {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleChange(event)
    {
        const { name, value } = event.target;

        setFormData(
        {
            ...formData,
            [name]: value
        });

        setErrors(
        {
            ...errors,
            [name]: ""
        });

        if (name === "password")
        {
            if (value.length > 8)
            {
                setStrength("strong");
            }
            else if (value.length >= 6)
            {
                setStrength("medium");
            }
            else
            {
                setStrength("weak");
            }
        }
    }

    function validate()
    {
        let newErrors = {};

        if (!formData.name)
        {
            newErrors.name = "Name required";
        }

        if (!/\S+@\S+\.\S+/.test(formData.email))
        {
            newErrors.email = "Invalid email";
        }

        if (formData.password.length < 6)
        {
            newErrors.password = "Min 6 characters";
        }

        if (formData.password !== formData.confirmPassword)
        {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        setIsSubmitted(true);

        if (validate())
        {
            navigate("/welcome", { state: { name: formData.name } });
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>

            {/* Name */}
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
            />
            {isSubmitted && errors.name && <span className="error">{errors.name}</span>}

            {/* Email */}
            <input
                type="text"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
            />
            {isSubmitted && errors.email && <span className="error">{errors.email}</span>}

            {/* Password */}
            <div className="password-box">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                    👁️
                </span>
            </div>

            <div className={`strength ${strength}`}></div>
            {isSubmitted && errors.password && <span className="error">{errors.password}</span>}

            {/* Confirm Password */}
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            {isSubmitted && errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
            )}

            {/* Submit */}
            <button>
                Register
            </button>

        </form>
    );
}

export default UserForm;