import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            setProfile(account);
        }
        catch (err: any) {
            navigate("/Kanbas/Account/Signin");
            //setError(err.response.data.message);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);


    const save = async () => {
        if (!profile.username) {
            setError("Username is required.");
            return;
        }
        if (!profile.password) {
            setError("Password is required.");
            return;
        }
        try {
            await client.updateUser(profile);
        } catch (err: any) {
            setError(err.response.data.message);
            return;
        }
    };

    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };



    return (
        <div >
            <div className="card-body"></div>
            <h1 className="card-title">Profile</h1>
            <Link to="/Kanbas/Account/Admin/Users"
                className="btn btn-warning w-100">
                Users
            </Link>

            {profile && (
                <div className="card py-3 px-2">

                    <label>Username:</label>
                    <input className="form-control m-1" value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })} />

                    <label>Password:</label>
                    <input className="form-control m-1" value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })} />

                    <label>First Name:</label>
                    <input className="form-control m-1" value={profile.firstName} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })} />

                    <label>Last Name:</label>
                    <input className="form-control m-1" value={profile.lastName} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })} />

                    <label>Date of Birth:</label>
                    <input className="form-control m-1" value={profile.dob} type="date" onChange={(e) =>
                        setProfile({ ...profile, dob: e.target.value })} />

                    <label>Email:</label>
                    <input className="form-control m-1" value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })} />

                    <label>Role:</label>
                    <select className="form-control m-1" style={{ width: "70%" }} onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className="btn btn-primary m-1" onClick={save}>
                            Save
                        </button>
                        <button className="btn btn-danger m-1" onClick={signout}>
                            Signout
                        </button>
                    </div>

                </div>
            )}
        </div>

    );
}

