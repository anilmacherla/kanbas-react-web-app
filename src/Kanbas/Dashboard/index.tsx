import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";
import { FaEllipsisV } from "react-icons/fa";
function Dashboard() {
    const [courses, setCourses] = useState(db.courses);
    const [course, setCourse] = useState({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "blue.jpeg", subText1: "New SubText"
    });
    const addNewCourse = () => {
        const newCourse = {
            ...course,
            _id: new Date().getTime().toString()
        };
        setCourses([...courses, { ...course, ...newCourse }]);
    };
    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = () => {
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };




    return (
        <div className="p-4">
            <h1>Dashboard</h1>

            <hr />
            <h2>Published Courses (12)</h2> <hr />

            <div className="w-25">
                <h5>Course</h5>
                <input value={course.name} className="form-control m-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                <input value={course.number} className="form-control m-2" onChange={(e) => setCourse({ ...course, number: e.target.value })} />
                <input value={course.startDate} className="form-control m-2" type="date" onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
                <input value={course.endDate} className="form-control m-2" type="date" onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
                <input value={course.subText1} className="form-control m-2" onChange={(e) => setCourse({ ...course, subText1: e.target.value })} />
                <button className="btn btn-success w-25 mx-2" onClick={addNewCourse} >
                    Add
                </button>
                <button className="btn btn-secondary w-25 mx-2" onClick={updateCourse} >
                    Update
                </button>

            </div>

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
                                        <p className="card-text text-muted">{course.number} <br /> <span style={{ fontSize: "smaller" }}>{course.subText1}</span> </p>
                                        <button className="btn btn-success" onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}>
                                            Edit
                                        </button>

                                        <button className="btn btn-danger mx-2" onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }}>
                                            Delete
                                        </button>

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

