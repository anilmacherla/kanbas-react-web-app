import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
function Courses() {
    const { courseId } = useParams();
    const getPageName = (path: string) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
    };
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === courseId);
    return (
        <div className=" m-2">
            <h1 ><HiMiniBars3 /> <a className="text-decoration-none text-danger" href="/">Course {course?.name}</a> {">"} {getPageName(pathname)}</h1> <hr />
            <div className="d-flex">
                <div className="flex-grow-0 d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-grow-1">
                    <div
                        className="overflow-y-scroll  bottom-0 end-0"
                        style={{ left: "320px", top: "70px" }} >
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Piazza" element={<h1>Piazza</h1>} />
                            <Route path="Piazza" element={<h1>Zoom Meetings</h1>} />
                            <Route path="Assignments" element={<h1>Assignments</h1>} />
                            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                            <Route path="Grades" element={<h1>Grades</h1>} />
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