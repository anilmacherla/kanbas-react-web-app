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
        }
        catch (err: any) {
            setError("Invalid credentials!");

        }
    };
    const signup = () => {
        navigate("/Kanbas/Account/Signup");
    }
    return (
        <div>
            <h1>Signin</h1>
            <div className="container-fluid">
                <input className="form-control m-1" value={credentials.username} placeholder="User name" onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })} />
                <input className="form-control m-1" value={credentials.password} placeholder="Password" onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })} />
                {error && <div className="text-danger mx-2">{error}</div>}
                <button className="btn btn-primary m-1" onClick={signin}> Sign In </button>
                <button className="btn btn-success m-1" onClick={signup}> Sign Up </button>

            </div>

        </div>
    );
}

