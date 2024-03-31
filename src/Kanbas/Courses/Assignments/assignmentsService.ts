import axios from "axios";
const COURSES_API = "http://localhost:4000/api/courses";
const ASSIGNMENTS_API = "http://localhost:4000/api/assignments";

export const findAssignmentsForCourse = async (courseId: any) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};