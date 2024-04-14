import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signup = async () => {
        if (!user.username || !user.password) {
            setError("Please enter a username and password.");
            return;
        }

        try {
            await client.signup(user);
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            console.log(err)
            setError(err.response.data.message);
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card">
                <div className="card-body">
                    <h1>Signup</h1>
                    <input className="form-control m-1" value={user.username} placeholder="User Name" onChange={(e) => setUser({
                        ...user, username: e.target.value
                    })} />
                    <small id="userNameHelp" className="form-text text-muted mx-2">We'll never share your details with anyone else.</small>
                    <input className="form-control m-1" value={user.password} placeholder="Password" type="password" onChange={(e) => setUser({
                        ...user, password: e.target.value
                    })} />
                    {error && <div className="alert alert-danger">{error}</div>}

                    <button className="btn btn-primary m-1" onClick={signup}> Signup </button>
                </div>
            </div>
        </div>
    );
}

