import axios from "axios";
// const COURSES_API = "https://kanbas-node-server-app-i8wp.onrender.com/api/courses";
// const ASSIGNMENTS_API = "https://kanbas-node-server-app-i8wp.onrender.com/api/assignments";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const ASSIGNMENTS_API = `${API_BASE}/api/assignments`;



export const findAssignmentsForCourse = async (courseId: any) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

export const createAssignment = async (courseId: any, assignment: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};

export const deleteAssignmentForCourse = async (assignmentId: any) => {
    const response = await axios
        .delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};

export const updateAssignmentForCourse = async (assignment: { _id: any; }) => {
    const response = await axios
        .put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return response.data;
};
