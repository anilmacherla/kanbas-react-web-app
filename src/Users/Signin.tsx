import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "USER"
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const signin = async (res: any) => {
        try {
            await client.signin(credentials);
            navigate("/Kanbas/Dashboard");
        }
        catch (err: any) {
            setError("Invalid credentials!");

        }
    };
    const signup = () => {
        navigate("/Kanbas/Account/Signup");
    }

    return (

        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card">
                <div className="card-body">
                    <h1>Sign In</h1>
                    <input className="form-control m-1" value={credentials.username} placeholder="User name" onChange={(e) =>
                        setCredentials({ ...credentials, username: e.target.value })} />
                    <small id="userNameHelp" className="form-text text-muted mx-2">We'll never share your details with anyone else.</small>
                    <input className="form-control m-1" value={credentials.password} placeholder="Password" onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })} />
                    {error && <div className="alert alert-danger">{error}</div>}

                    <button className="btn btn-primary m-1" onClick={signin}> Sign In </button>
                    <button className="btn btn-success m-1" onClick={signup}> Sign Up </button>
                </div>
            </div>
        </div>
    );
}

