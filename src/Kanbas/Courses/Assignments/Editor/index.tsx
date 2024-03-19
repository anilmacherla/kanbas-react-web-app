import React from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { KanbasState } from "../../../store";
import { addAssignment, deleteAssignment, selectAssignment, setAssignment, updateAssignment } from "../assignmentsReducer";
import { useDispatch, useSelector } from "react-redux";

function AssignmentEditor() {
    const { assignmentId } = useParams();
    const dispatch = useDispatch();
    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const shouldCreate = useLocation().pathname.includes("Create");
    const handleSave = () => {
        shouldCreate ? dispatch(addAssignment({ ...assignment, course: courseId })) : dispatch(updateAssignment(assignment))
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    return (
        <div className="d-flex flex-column mx-2">
            <div >
                <button className="float-end btn btn-secondary mx-2 p-1 rounded-1"><FaEllipsisV /></button>
                <label className="float-end p-1 text-success"><FaCheckCircle className=" mx-1" />Published</label>
            </div>
            <hr />
            <div>

                <h3>Assignment Name</h3>
                <div className="w-75">
                    <input value={assignment?.title} onChange={(e) => dispatch(setAssignment({ ...assignment, title: e.target.value }))} className="form-control w-75 mb-3" />
                    <textarea value="New Description" className="form-control w-75 border-danger" />
                    <div className="row mt-2">
                        <div className="col-3">
                            <label htmlFor="" className="float-end">Points</label>
                        </div>
                        <div className="col-8 mx-1">
                            <input value="12/12/2021" className="form-control" />
                        </div>
                    </div>



                    <div className="row mt-2">
                        <div className="col-3">
                            <label htmlFor="" className="float-end">Assign</label>
                        </div>
                        <div className="card col-5 mx-3 p-2">
                            <div className="flex">
                                <div className="font-weight-bold">Due</div>
                                <input value="12/12/2021" className="form-control" />
                            </div>
                        </div>
                    </div>

                </div>


                <hr />
                <button onClick={handleSave} className="btn btn-danger border-secondary ms-2 float-end">
                    Save
                </button>
                <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-light border-secondary float-end">
                    Cancel
                </Link>
            </div>
        </div>

    );
}
export default AssignmentEditor;