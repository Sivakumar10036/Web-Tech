import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import Welcome from "./components/Welcome";
import "./App.css";

function App()
{
    return (
        <BrowserRouter>

            <div className="app">

                <div className="card">
                    <h1 className="heading">🚀 Smart Registration</h1>

                    <Routes>
                        <Route path="/" element={<UserForm />} />
                        <Route path="/welcome" element={<Welcome />} />
                    </Routes>

                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;