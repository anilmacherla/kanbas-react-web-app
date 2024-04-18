import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

const DetailsComponent = () => {
    const [editorHtml, setEditorHtml] = useState<string>('');
    const [quizDetails, Details] = useState<any>({
        title: '',
        description: '',
        points: 0,
        dueDate: '',
        availableFrom: '',
        untilDate: ''
    })

    const handleEditorChange = (html: string) => {
        setEditorHtml(html);
    };

    return (
        <div>
            <input type="text" className="w-25 btn-rad form-control mt-4" placeholder="Unnamed Quiz" />
            <p>Quiz Instructions: </p>
            <h6>
                <ul className="nav nav-tabs ml-2">
                    <a className="nav-link active  text-dark text-sm"><small>Edit</small></a>
                    <a className="nav-link  text-dark" ><small>View</small> </a>
                    <a className="nav-link  text-dark"><small>Insert</small></a>
                    <a className="nav-link text-dark" ><small>Format Table</small></a>
                </ul>
            </h6>

            <ReactQuill
                theme="snow"

                onChange={handleEditorChange}
            />

            <div className='container m-2'>
                <div className='row m-1' >
                    <div className="col-3">
                        <p className="float-end">Quiz Type</p>
                    </div>
                    <div className="col-8 mx-1">
                        <select id="quizType" className="form-control w-50">
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                        </select>
                    </div>
                </div>

                <div className='row m-1' >
                    <div className="col-3">
                        <p className="float-end">Assignment Group</p>
                    </div>
                    <div className="col-8 mx-1">
                        <select id="quizType" className="form-control w-50">
                            <option value="Graded Quiz">Quizzes</option>
                            <option value="Practice Quiz">Exams</option>
                            <option value="Graded Survey">Assignments</option>
                            <option value="Ungraded Survey">Projects</option>
                        </select>
                    </div>
                </div>

                <div className='row m-1' >
                    <div className="col-3">
                        <p className="float-end">Points</p>
                    </div>
                    <div className="col-8 mx-1">
                        <input type="text" className="w-25 form-control" placeholder="" />
                    </div>
                </div>

                <div className='row m-1' >
                    <div className="col-3">
                        <p className="float-end">Access Code</p>
                    </div>
                    <div className="col-8 mx-1">
                        <input type="text" className="w-25 form-control" placeholder="" />
                    </div>
                </div>


                <div className='row m-1' >
                    <div className="col-3">
                    </div>
                    <div className="col-8 mx-1">
                        <p style={{ fontWeight: "bold" }}>Options</p>
                        <label>
                            <input type="checkbox" checked={true} onChange={() => { }} />
                            One question at a time
                        </label> <br />
                        <label>
                            <input type="checkbox" checked={true} onChange={() => { }} />
                            Webcam required
                        </label> <br />
                        <label>
                            <input type="checkbox" checked={true} onChange={() => { }} />
                            Lock questions after answering
                        </label> <br />
                        <label>
                            <input type="checkbox" checked={true} onChange={() => { }} />
                            Show Correct Answers
                        </label> <br />
                        <label>
                            <input type="checkbox" checked={true} onChange={() => { }} />
                            Shuffle Answers
                        </label>
                        <div>
                            <label>
                                <input type="checkbox" checked={true} onChange={() => { }} />
                                Time Limit
                            </label>
                            <input
                                className='' style={{ width: "60px", marginLeft: "20px" }}
                                type="number"
                                value={20}
                                onChange={() => { }}
                                placeholder="20"
                            />Minutes
                        </div>
                        <div className='form-control mt-2'>
                            <label>
                                <input type="checkbox" checked={false} onChange={() => { }} />
                                Allow Multiple Attempts
                            </label>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-3">
                            <label htmlFor="" className="float-end border-black">Assign</label>
                        </div>
                        <div className="card col-5 mx-3 p-4">
                            <div className="flex">
                                <div style={{ fontWeight: "bold" }}>Assign to</div>
                                <input value="Everyone" onChange={() => { }} type="text" className="form-control w-100 border-black" />
                            </div>
                            <div className="flex">
                                <div style={{ fontWeight: "bold" }}>Due</div>
                                <input value={quizDetails?.dueDate} onChange={() => { }} type="date" className="form-control w-100 border-black" />
                            </div>

                            <div className="flex">
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <div style={{ fontWeight: "bold" }}>Available from</div>
                                        <input type="date" value={quizDetails?.availableFrom} onChange={() => { }} className="form-control w-100 border-black" >

                                        </input>
                                    </div>
                                    <div className="col-6">
                                        <div style={{ fontWeight: "bold" }}>Until</div>
                                        <input type="date" value={quizDetails?.untilDate} onChange={(e) => { }} className="form-control w-100 border-black" />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
            <hr />
            <div className='m-2'>
                <label >
                    <input type="checkbox" className='mx-2' checked={false} onChange={() => { }} />
                    Notify users this quiz has changed
                </label>
                <button onClick={() => { }} className="btn btn-danger border-secondary ms-2 float-end">
                    Save
                </button>
                <button onClick={() => { }} className="btn btn-light border-secondary ms-2 float-end">
                    Save and Publish
                </button>
                <button onClick={() => { }} className="btn btn-light border-secondary ms-2 float-end">
                    Cancel
                </button>
            </div>


        </div>
    );
};

export default DetailsComponent
