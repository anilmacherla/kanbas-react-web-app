import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignment = assignments.find(
        (assignment) => assignment._id === assignmentId);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    return (
        <div className="d-flex flex-column mx-2">
            <div >
                <button className="float-end btn btn-secondary mx-3 p-1 rounded-0"><FaEllipsisV /></button>
                <label className="float-end p-1"><FaCheckCircle className="text-success mx-1" />Published</label>
            </div>
            <hr />

            <div>

                <h3>Assignment Name</h3>
                <input value={assignment?.title} className="form-control mb-2" />
                <button onClick={handleSave} className="btn btn-success ms-2 float-end">
                    Save
                </button>
                <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger float-end">
                    Cancel
                </Link>
            </div>
        </div>

    );
}
export default AssignmentEditor;