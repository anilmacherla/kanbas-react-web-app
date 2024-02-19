import { FaCaretDown, FaCog, FaDownload, FaFileExport, FaSearch, FaSquare } from "react-icons/fa";
import { assignments, enrollments, grades, users } from "../../Database";
import { useLocation, useParams } from "react-router-dom";
import './index.css'
function Grades() {
    const { courseId } = useParams();
    const as = assignments.filter((assignment) => assignment.course === courseId);
    const es = enrollments.filter((enrollment) => enrollment.course === courseId);
    console.log(useLocation())
    return (
        <div className="m-2 p-2">
            <div className="row">
                <div className="mb-4">
                    <button type="button" className="btn btn-secondary btn-grey-button float-end mx-2">
                        <FaCog /></button>
                    <button type="button" className="btn btn-secondary btn-grey-button float-end mx-2">
                        <FaFileExport /> Export <FaCaretDown /></button>
                    <button type="button" className="btn btn-secondary btn-grey-button  float-end mx-2">
                        <FaDownload /> Import</button>
                </div>
            </div>

            <div className="row mt-1">
                <div className="col-sm-6 ">
                    <h5 className="font-weight-bolder">Student Names</h5>
                    <div className="input-group-text bg-white" style={{ height: "55%" }}>
                        <span><FaSearch /></span>
                        <select className="form-control form-select bg-white border-white">
                            <option value="" selected>Search Students
                            </option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-6">
                    <h5 className="font-weight-bold">Assignment Names</h5>
                    <div className="input-group-text bg-white" style={{ height: "55%" }}>
                        <span><FaSearch /></span>
                        <select className="form-control form-select bg-white border-white">
                            <option value="" selected>Search Assignment
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6">
                    <button type="button" className="btn btn-secondary btn-grey-button"><i className="fa fa-filter"
                        aria-hidden="true"></i> Apply Filters</button>
                </div>
            </div>

            <div className="table-responsive-xl mt-2" style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <table className="table table-bordered table-striped table-hover" style={{ tableLayout: "fixed", minWidth: "100%" }}>
                    <colgroup>
                        <col style={{ width: "15%" }} />
                        {as.map((assignment) => (
                            <col key={assignment._id} style={{ width: `${85 / as.length}%` }} />
                        ))}
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            {as.map((assignment) => (
                                <th key={assignment._id}>{assignment.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {es.map((enrollment) => {
                            const user = users.find((user) => user._id === enrollment.user);
                            return (
                                <tr key={enrollment.user}>
                                    <td>{user?.firstName} {user?.lastName}</td>
                                    {as.map((assignment) => {
                                        const grade = grades.find(
                                            (grade) => grade.student === enrollment.user && grade.assignment === assignment._id
                                        );
                                        return <td key={assignment._id}>{grade?.grade || ""}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>);
}
export default Grades;

