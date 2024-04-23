
import { Navigate, Route, Routes } from "react-router";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";

function Kanbas() {
    const API_BASE = process.env.REACT_APP_API_BASE;

    const [courses, setCourses] = useState<any[]>([]);
    const COURSES_API = `${API_BASE}/api/courses`;
    const findAllCourses = async () => {
        const response = await axios.get(COURSES_API);
        setCourses(response.data);
    };
    useEffect(() => {
        findAllCourses();
    }, []);

    const [course, setCourse] = useState({
        _id: "1234", id: "89", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New description", department: "CSE", credits: "4",
    });

    const addNewCourse = async () => {
        const response = await axios.post(COURSES_API, course);
        setCourses([...courses, response.data]);
    };

    const deleteCourse = async (courseId: string) => {
        const response = await axios.delete(
            `${COURSES_API}/${courseId}`
        );
        setCourses(courses.filter(
            (c) => c._id !== courseId));
    };

    const updateCourse = async () => {
        const response = await axios.put(
            `${COURSES_API}/${course._id}`,
            course
        );
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                }
                return c;
            })
        );
    };

    return (
        <Provider store={store}>
            <div className="d-flex">
                <KanbasNavigation />
                <div style={{ flexGrow: 1 }} className="content">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account/Signin" />} />
                        <Route path="Account/*" element={<Account />} />
                        <Route path="Dashboard" element={<Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse} />} />
                        <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />

                    </Routes>

                </div>
            </div>
        </Provider>
    );
}
export default Kanbas;



