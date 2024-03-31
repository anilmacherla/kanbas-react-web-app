import { courses } from "../../Kanbas/Database";
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { FaGlasses } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
function Courses({ courses }: { courses: any[]; }) {
    const COURSES_API = "http://localhost:4000/api/courses";

    const { courseId } = useParams();
    const getPageName = (path: string) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
    };
    const { pathname } = useLocation();
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}`
        );
        setCourse(response.data);
    };
    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);

    return (
        <div className=" m-2">
            <h3 className="d-flex justify-content-between">
                <div>
                    < HiMiniBars3 className="mx-2" />
                    <Link className="text-decoration-none text-danger" to={`/Kanbas/Courses/${course?._id}/Home`}>Course {course?.name}</Link>
                    {

                        pathname.includes("/Assignments/") ? (
                            <span>
                                {">"} Assignments  {">"} <Link className="text-decoration-none text-danger" to={pathname}>{getPageName(pathname)}</Link>
                            </span>
                        ) : (
                            <span>
                                {">"} {getPageName(pathname)}
                            </span>
                        )}

                </div>
                <div>
                    {getPageName(pathname) === "Modules" &&
                        <button className="btn btn-secondary mt-2 mr-3 float-end">
                            <FaGlasses /> Student View</button>}

                </div>


            </h3>
            <hr />
            <div className="d-flex">
                <div className="flex-grow-0 d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-grow-1">
                    <div
                        className="  bottom-0 end-0"
                        style={{ left: "320px", top: "70px" }} >
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Piazza" element={<h1>Piazza</h1>} />
                            <Route path="ZoomMeetings" element={<h1>Zoom Meetings</h1>} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
                            <Route path="Grades" element={<Grades />} />
                            <Route path="People" element={<h1>People</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>
            <div>

            </div>

        </div>
    );
}
export default Courses;