import React from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import { FaEllipsisV, FaPenSquare } from "react-icons/fa";
function Dashboard() {
    return (
        <div className="p-4">
            <h1>Dashboard</h1>              <hr />
            <h2>Published Courses (12)</h2> <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="col" style={{ width: 300 }}>
                            <div className="card" style={{ position: "relative" }}>
                                <img src={`/images/${course.image}`} className="card-img-top" alt="courseImage" style={{ height: 150 }} />
                                <div style={{ position: "absolute", top: 5, right: 5 }}>
                                    <FaEllipsisV className="text-white" />
                                </div>
                                <div className="card-body">
                                    <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                                        style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                        {course.name}
                                        <p className="card-text text-muted">{course.subText1} <br /> <span style={{ fontSize: "smaller" }}>{course.subText2}</span> </p>
                                    </Link>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                                        Go
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;

