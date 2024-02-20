import { Link, useLocation } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Grades", "Assignments", "ZoomMeetings", "People", "Quizzes"];
    const { pathname } = useLocation();
    return (
        <div>
            <p className="text-muted" style={{ fontSize: "smaller" }}>202410_1Fall 2023 Semester...</p>
            <ul className="wd-navigation">
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
                        <Link to={link}>{link}</Link>
                    </li>
                ))}
            </ul>
        </div>

    );
}
export default CourseNavigation;

