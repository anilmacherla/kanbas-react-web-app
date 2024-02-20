import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaPlusCircle } from "react-icons/fa";

import { useParams } from "react-router";
function ModuleList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.course === courseId);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    return (
        <>

            <div className="row mt-3">
                <div className="button-group">
                    <div className="col-md-auto">
                        <button className="btn btn-sm btn-secondary module-button course-home-col">Collapse
                            All</button>
                    </div>
                    <div className="col-md-auto">
                        <button className="btn btn-sm btn-secondary module-button course-home-col">View
                            Progress</button>
                    </div>
                    <div className="col-md-auto dropdown">
                        <button
                            className="btn btn-sm btn-secondary dropdown-toggle module-button course-home-col"
                            type="button" id="dropdownMenu" data-toggle="dropdown" aria-expanded="false">
                            <span>
                                <FaCheckCircle className="text-success" />
                            </span> Publish All
                        </button>
                    </div>
                    <div className="col-md-auto">
                        <button className="btn btn-sm  course-home-col mr-2 btn-danger" style={{ backgroundColor: "red", color: "white" }}>
                            <span>
                                <FaPlus />
                            </span> Module</button>
                    </div>
                    <div className="col-md-auto">
                        <button className="btn btn-sm btn-secondary module-button course-home-col"
                        ><FaEllipsisV />
                        </button>
                    </div>
                </div>

            </div>
            <ul className="list-group wd-modules rounded-0">
                {modulesList.map((module) => (
                    <li
                        className="list-group-item"
                        onClick={() => setSelectedModule(module)}>
                        <div>
                            <FaEllipsisV className="me-2" />
                            {module.name}
                            <span className="float-end">
                                <FaCheckCircle className="text-success" />
                                <FaPlusCircle className="ms-2" />
                                <FaEllipsisV className="ms-2" />
                            </span>
                        </div>
                        {selectedModule._id === module._id && (
                            <ul className="list-group rounded-0">
                                {module.lessons?.map((lesson) => (
                                    <li className="list-group-item">
                                        <FaEllipsisV className="me-2" />
                                        {lesson.name}
                                        <span className="float-end">
                                            <FaCheckCircle className="text-success" />
                                            <FaEllipsisV className="ms-2" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}
export default ModuleList;