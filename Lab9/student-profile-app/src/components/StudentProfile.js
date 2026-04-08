import React from "react";

function StudentProfile({ studentData })
{
    return (
        <div className="profile-card">

            <h1 className="profile-title">Student Profile</h1>

            <div className="profile-item name">
                <span>Name</span>
                <h3>{studentData.name}</h3>
            </div>

            <div className="profile-item department">
                <span>Department</span>
                <h3>{studentData.department}</h3>
            </div>

            <div className="profile-item year">
                <span>Year</span>
                <h3>{studentData.year}</h3>
            </div>

            <div className="profile-item section">
                <span>Section</span>
                <h3>{studentData.section}</h3>
            </div>


        </div>
    );
}

export default StudentProfile;