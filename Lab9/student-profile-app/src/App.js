import React, { useState } from "react";
import StudentProfile from "./components/StudentProfile";
import "./App.css";

function App()
{
    const [studentData, setStudentData] = useState({
        name: "",
        department: "",
        year: "",
        section: ""
    });

    const [submittedData, setSubmittedData] = useState(null);

    function handleChange(event)
    {
        const { name, value } = event.target;

        setStudentData({
            ...studentData,
            [name]: value
        });
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        // Save to localStorage
        localStorage.setItem("student", JSON.stringify(studentData));

        setSubmittedData(studentData);
    }

    function loadFromLocalStorage()
    {
        const savedData = localStorage.getItem("student");

        if (savedData)
        {
            const parsedData = JSON.parse(savedData);
            setSubmittedData(parsedData);
        }
        else
        {
            alert("No data found in localStorage");
        }
    }

    return (
        <>
            <div className="app">

                <form className="form" onSubmit={handleSubmit}>

                    <h2>Enter Student Details</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={studentData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={studentData.department}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="year"
                        placeholder="Enter Year"
                        value={studentData.year}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="section"
                        placeholder="Enter Section"
                        value={studentData.section}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Save & Submit</button>

                    {/* Load Button */}
                    <button type="button" onClick={loadFromLocalStorage}>
                        Load Saved Data
                    </button>

                </form>

                {submittedData && <StudentProfile studentData={submittedData} />}

            </div>

            {/* Fixed Footer */}
            <div className="fixed-footer">
                © 2026 Rajavarapu Siva Kumar. All Rights Reserved.
            </div>
        </>
    );
}

export default App;