import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const save = async () => {
        await client.updateUser(profile);
    };


    return (
        <div>
            <h1>Profile</h1>
            <Link to="/Kanbas/Account/Admin/Users"
                className="btn btn-warning w-100">
                Users
            </Link>

            {profile && (
                <div>
                    <input className="form-control m-1" value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })} />
                    <input className="form-control m-1" value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })} />
                    <input className="form-control m-1" value={profile.firstName} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })} />
                    <input className="form-control m-1" value={profile.lastName} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })} />
                    <input className="form-control m-1" value={profile.dob} type="date" onChange={(e) =>
                        setProfile({ ...profile, dob: e.target.value })} />
                    <input className="form-control m-1" value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })} />
                    <select className="form-control m-1" style={{ width: "70%" }} onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <button className="btn btn-primary m-1" onClick={save}>
                        Save
                    </button>

                </div>
            )}
        </div>
    );
}

