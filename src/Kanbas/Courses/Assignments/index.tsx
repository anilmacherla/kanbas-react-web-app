import React from "react";
import { FaCaretDown, FaCheckCircle, FaEllipsisV, FaPenSquare, FaPlus, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { addAssignment, deleteAssignment, selectAssignment, setAssignment, updateAssignment } from "./assignmentsReducer";

function Assignments() {
    const { courseId } = useParams();
    const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const dispatch = useDispatch();
    return (
        <>
            { }
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" className="mx-2 w-25 btn-rad" placeholder="Search for Assignment" />
                <div>
                    <button className="btn btn-secondary btn-sm btn-rad btn-grey-button m-1" style={{ borderRadius: "0.2rem" }}><FaPlus />
                        Group</button>
                    <Link
                        to={`/Kanbas/Courses/${courseId}/Assignments/Create`}>
                        <button className="btn btn-danger btn-sm btn-rad " onClick={() => { dispatch(setAssignment({ title: "New Assignment", course: courseId })) }} style={{ borderRadius: "0.2rem" }}><FaPlus />
                            Assignment</button>
                    </Link>

                    <button className="btn btn-secondary btn-sm btn-rad btn-grey-button m-1" style={{ borderRadius: "0.2rem" }}><FaEllipsisV /></button>
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
                        {assignments
                            .filter((assignment) => assignment.course === courseId)
                            .map((assignment) => (
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