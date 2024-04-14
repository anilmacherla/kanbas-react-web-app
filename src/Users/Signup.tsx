import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(user);
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            console.log(err)
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            <h1>Signup</h1>
            {error && <div>{error}</div>}
            <input className="form-control m-1" value={user.username} placeholder="User Name" onChange={(e) => setUser({
                ...user, username: e.target.value
            })} />
            <input className="form-control m-1" value={user.password} placeholder="Password" type="password" onChange={(e) => setUser({
                ...user, password: e.target.value
            })} />
            <button className="btn btn-primary m-1" onClick={signup}> Signup </button>
        </div>
    );
}

