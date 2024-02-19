import React from "react";
import { FaCaretDown, FaCheckCircle, FaEllipsisV, FaPenSquare, FaPlus, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
function Assignments() {
    const { courseId } = useParams();
    const assignmentList = assignments.filter(
        (assignment) => assignment.course === courseId);
    return (
        <>
            { }
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" className="form-control w-25 btn-rad" placeholder="Search for Assignment" />
                <div>
                    <button className="btn btn-secondary btn-rad btn-grey-button" style={{ borderRadius: "0.2rem" }}><FaPlus />
                        Group</button>
                    <button className="btn btn-danger btn-rad" style={{ borderRadius: "0.2rem" }}><FaPlus />
                        Assignment</button>
                    <button className="btn btn-secondary btn-rad btn-grey-button" style={{ borderRadius: "0.2rem" }}><FaEllipsisV /></button>
                </div>

            </div>
            <hr />
            <ul className="list-group wd-modules rounded-0">
                <li className="list-group-item">
                    <div className="d-flex justify-content-between">
                        <div>
                            <FaEllipsisV className="me-1" /> <FaCaretDown />ASSIGNMENTS
                        </div>
                        <div className="d-flex">
                            <div className="rounded-pill border border-secondary p-1">40% of Total</div>
                            <FaPlus className="mt-2 mx-1" /><FaEllipsisV className="mt-2 mx-1" />
                        </div>
                    </div>
                    <ul className="list-group assignment-list">
                        {assignmentList.map((assignment) => (
                            <li className="list-group-item assignment-list-item ">
                                <div className="d-flex align-items-center justify-content-between ">
                                    <div>
                                        <FaEllipsisV className="me-1" />
                                        <FaPenSquare className="text-success mx-2" />
                                        <Link className="text-decoration-none text-dark" to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
                                            {assignment.title}
                                        </Link>
                                        <div className="mx-5" style={{ fontSize: "small" }}>
                                            <a href="" className="text-decoration-none text-danger">Multiple Modules</a> | Not available yet | 100 points
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <FaCheckCircle className="text-success" />
                                        <FaEllipsisV className="ms-2" />
                                    </div>
                                </div>
                            </li>))}
                    </ul>
                </li>
            </ul>
        </>
    );
}
export default Assignments;