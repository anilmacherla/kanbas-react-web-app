import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { KanbasState } from "../../../store";
import { addAssignment, setAssignment, updateAssignment } from "../assignmentsReducer";
import { useDispatch, useSelector } from "react-redux";
import { createAssignment, updateAssignmentForCourse } from "../assignmentsService";

function AssignmentEditor() {
    const { assignmentId } = useParams();
    const dispatch = useDispatch();
    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const shouldCreate = useLocation().pathname.includes("Create");
    const handleSave = () => {
        shouldCreate ? handleAddAssignment() : handleUpdateAssignment();
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    const handleAddAssignment = () => {
        createAssignment(courseId, assignment).then((assignment) => {
            dispatch(addAssignment(assignment));
        });
    };

    const handleUpdateAssignment = () => {
        updateAssignmentForCourse(assignment).then((assignment) => {
            dispatch(updateAssignment(assignment));
        });
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
                    <input value={assignment?.title} onChange={(e) => dispatch(setAssignment({ ...assignment, title: e.target.value }))} className="form-control w-75 mb-3 border-black" />
                    <textarea value={assignment?.description} onChange={(e) => dispatch(setAssignment({ ...assignment, description: e.target.value }))} className="form-control w-75 border-black" />
                    <div className="row mt-2">
                        <div className="col-3">
                            <label htmlFor="" className="float-end">Points</label>
                        </div>
                        <div className="col-8 mx-1">
                            <input value={assignment?.points} onChange={(e) => dispatch(setAssignment({ ...assignment, points: e.target.value }))} className="form-control border-black" />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-3">
                            <label htmlFor="" className="float-end border-black">Assign</label>
                        </div>
                        <div className="card col-5 mx-3 p-4">
                            <div className="flex">
                                <div style={{ fontWeight: "bold" }}>Due</div>
                                <input value={assignment?.dueDate} onChange={(e) => dispatch(setAssignment({ ...assignment, dueDate: e.target.value }))} type="date" className="form-control w-100 border-black" />
                            </div>

                            <div className="flex">
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <div style={{ fontWeight: "bold" }}>Available from</div>
                                        <input type="date" value={assignment?.availableFrom} onChange={(e) => dispatch(setAssignment({ ...assignment, availableFrom: e.target.value }))} className="form-control w-100 border-black" >

                                        </input>
                                    </div>
                                    <div className="col-6">
                                        <div style={{ fontWeight: "bold" }}>Until</div>
                                        <input type="date" value={assignment?.untilDate} onChange={(e) => dispatch(setAssignment({ ...assignment, untilDate: e.target.value }))} className="form-control w-100 border-black" />
                                    </div>
                                </div>
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