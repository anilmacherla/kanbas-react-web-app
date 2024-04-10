import React, { useState, useEffect } from "react";
import * as client from "./client";
import { BsTrash3Fill, BsPlusCircleFill, BsFillCheckCircleFill, BsPencil } from "react-icons/bs";
import { User } from "./client";
export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "USER"
    });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const selectUser = async (user: User) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    const [role, setRole] = useState("USER");
    const fetchUsersByRole = async (role: string) => {
        const users = await client.findUsersByRole(role);
        setRole(role);
        setUsers(users);
    };



    useEffect(() => { fetchUsers(); }, []);
    return (
        <div>
            <select
                onChange={(e) => fetchUsersByRole(e.target.value)}
                value={role || "USER"}
                className="form-control w-25 float-end mt-3"
            >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select>

            <h1>User Table</h1>
            <table className="table table-responsive">
                <thead>
                    <tr >
                        <th className="text-start">Username</th>
                        <th className="text-start">First Name</th>
                        <th className="text-start">Last Name</th>
                        <th className="text-start">Role</th>
                        <th>&nbsp;</th>
                    </tr>
                    <tr>
                        <td>
                            <div className="row">
                                <input className="form-control w-50" value={user.username} onChange={(e) =>
                                    setUser({ ...user, username: e.target.value })} placeholder="Username" />
                                <input className="form-control w-50" value={user.password} onChange={(e) =>
                                    setUser({ ...user, password: e.target.value })} placeholder="Password" />
                            </div>
                        </td>
                        <td>
                            <input className="form-control" value={user.firstName} onChange={(e) =>
                                setUser({ ...user, firstName: e.target.value })} />
                        </td>
                        <td>
                            <input className="form-control" value={user.lastName} onChange={(e) =>
                                setUser({ ...user, lastName: e.target.value })} />
                        </td>
                        <td>
                            <select className="form-control" value={user.role} onChange={(e) =>
                                setUser({ ...user, role: e.target.value })}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </td>
                        <td>
                            <BsFillCheckCircleFill
                                onClick={updateUser}
                                className="me-2 text-success fs-3 text"
                            />

                            <BsPlusCircleFill className="fs-3 text-success mb-1" onClick={createUser} />
                        </td>
                    </tr>

                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td className="text-start">{user.username}</td>
                            <td className="text-start">{user.firstName}</td>
                            <td className="text-start">{user.lastName}</td>
                            <td className="text-start">{user.role}</td>
                            <td>
                                <button className="btn btn-sm btn-danger text-light " onClick={() => deleteUser(user)}>
                                    <BsTrash3Fill />
                                </button>
                                <button className="btn btn-sm btn-warning ms-2">
                                    <BsPencil onClick={() => selectUser(user)} />
                                </button>
                            </td>

                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}

