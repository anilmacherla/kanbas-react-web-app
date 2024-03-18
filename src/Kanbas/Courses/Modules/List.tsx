import React, { useState } from "react";
import "./index.css";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();
    const [selectedModule, setSelectedModule] = useState(moduleList[0]);

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
                <li className="list-group-item">
                    <div className="form w-100 bg-white">
                        <div className="row">
                            <div className="col">
                                <div className="form">
                                    <input className="form-control m-1 w-100" value={module.name}
                                        onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
                                    />
                                    <textarea className="form-control m-1 w-100" value={module.description}
                                        onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
                                    />
                                </div>

                            </div>
                            <div className="col">
                                <button className="btn btn-success m-1 btn-sm float-end" onClick={() => dispatch(addModule({ ...module, course: courseId }))}>Add</button>
                                <button className="btn btn-primary m-1 btn-sm float-end" onClick={() => dispatch(updateModule(module))}>
                                    Update
                                </button>

                            </div>
                        </div>

                    </div>
                </li>

                {moduleList
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index}
                            className="list-group-item"
                            onClick={() => setSelectedModule(module)}>
                            <button className="btn btn-success btn-sm float-end mx-1"
                                onClick={(event) => { setModule(module); }}>
                                Edit
                            </button>


                            <button className="btn btn-danger btn-sm float-end"
                                onClick={() => dispatch(deleteModule(module._id))}>
                                Delete
                            </button>

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
                                    {module.lessons?.map((lesson: { name: string }) => (
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