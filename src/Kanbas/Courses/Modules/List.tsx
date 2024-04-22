import React, { useEffect, useState } from "react";
import "./index.css";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule, setModules
} from "./reducer";
import { KanbasState } from "../../store";
import { findModulesForCourse, createModule } from "./client";

function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();
    const [selectedModule, setSelectedModule] = useState(moduleList[0]);
    useEffect(() => {
        findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    const handleAddModule = () => {
        createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };

    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };

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
                                <button className="btn btn-success m-1 btn-sm float-end" onClick={handleAddModule}>Add</button>
                                <button className="btn btn-primary m-1 btn-sm float-end" onClick={handleUpdateModule}>
                                    Update
                                </button>
                            </div>
                        </div>

                    </div>
                </li>

                {moduleList.length > 0 && moduleList
                    .filter((m) => m.course === courseId)
                    .map((m, index) => (
                        <li key={index}
                            className="list-group-item"
                            onClick={() => { setSelectedModule(m) }}>
                            <button className="btn btn-success btn-sm float-end mx-1"
                                onClick={() => { dispatch(setModule({ ...module, _id: m._id, name: m.name, description: m.description, course: m.course, lessons: m.lessons })); }}>
                                Edit
                            </button>

                            <button className="btn btn-danger btn-sm float-end"
                                onClick={() => { handleDeleteModule(m._id) }}>
                                Delete
                            </button>

                            <div>
                                <FaEllipsisV className="me-2" />
                                {m.name}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaPlusCircle className="ms-2" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </div>
                            {selectedModule && selectedModule._id === m._id && (
                                <ul className="list-group rounded-0">
                                    {m.lessons?.map((lesson: { name: string }, index: string) => (
                                        <li key={index} className="list-group-item">
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