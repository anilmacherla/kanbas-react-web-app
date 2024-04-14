import axios from "axios";
import React, { useEffect, useState } from "react";
function WorkingWithObjects() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 1, name: "NodeJS Module", description: "NodeJS and ExpressJS", course: "CS572",
    });
    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);


    const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`
    const MODULE_URL = `${API_BASE}/a5/module`

    return (
        <div>
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <div className="btn btn-primary">
                <a href={`${API_BASE}/a5/assignment`} className="text-white text-decoration-none">
                    Get Assignment
                </a>
            </div>
            <h4>Retrieving Properties</h4>
            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                value={assignment.title} type="text" />
            <button className="btn btn-primary mx-1" onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <button className="btn btn-primary mx-1" onClick={fetchAssignment} >
                Fetch Assignment
            </button>

            <div className="btn btn-primary">
                <a href={`${API_BASE}/a5/assignment/title`} className="text-white text-decoration-none">
                    Get Title
                </a>
            </div>
            <h4>Modifying Properties</h4>

            <div className="btn btn-primary mx-1">
                <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`} className="text-white text-decoration-none ">
                    Update Title
                </a>
            </div>
            <input type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />
            <div className="btn btn-primary mx-1">
                <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`} className="text-white text-decoration-none ">
                    Update Score
                </a>
            </div>
            <input type="number"
                onChange={(e) => setAssignment({
                    ...assignment,
                    score: Number(e.target.value)
                })}
                value={assignment.score} />

            <div className="btn btn-primary mx-1">
                <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`} className="text-white text-decoration-none ">
                    Update Completed Status
                </a>
            </div>
            <input type="checkbox"
                onChange={(e) => setAssignment({
                    ...assignment,
                    completed: e.target.checked
                })}
                checked={assignment.completed} />

            <h4>Retrieving Module</h4>
            <div className="btn btn-primary">
                <a href={`${API_BASE}/a5/module`} className="text-white text-decoration-none">
                    Get Module
                </a>
            </div>
            <div className="btn btn-primary mx-2">
                <a href={`${API_BASE}/a5/module/name`} className="text-white text-decoration-none">
                    Get Module Name
                </a>
            </div>


            <h4>Modifying Module</h4>
            <div className="btn btn-primary mx-1">
                <a href={`${MODULE_URL}/title/${module.name}`} className="text-white text-decoration-none ">
                    Update Module Name
                </a>
            </div>
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    name: e.target.value
                })}
                value={module.name} />
            <div className="btn btn-primary mx-2">
                <a href={`${MODULE_URL}/description/${module.description}`} className="text-white text-decoration-none ">
                    Update Module Description
                </a>
            </div>
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    description: e.target.value
                })}
                value={module.description} />
        </div>

    );
}
export default WorkingWithObjects;