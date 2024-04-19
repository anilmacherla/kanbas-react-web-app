import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { KanbasState } from '../../../store';
import { addQuiz, setQuiz, updateQuiz as uq } from '../quizzesReducer';
import { createQuiz, updateQuiz } from '../quizzesService';
import { FaPlus, FaSearch } from 'react-icons/fa';

const DetailsComponent = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizDetails = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

    const handleSaveQuiz = async () => {
        console.log("ID", quizDetails._id);
        if (quizDetails._id !== "0") {
            await updateQuiz(quizDetails, quizDetails._id).then((quiz: any) => {
                dispatch(setQuiz(quiz));
                dispatch(uq(quiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
            });
        } else {
            await createQuiz(courseId, quizDetails).then((quiz: any) => {
                dispatch(addQuiz({ ...quiz, _id: quiz._id }));
                dispatch(setQuiz(quiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
            });
        }

    }

    const handleSaveAndPublish = async () => {
        const updatedQuizDetails = { ...quizDetails, published: true }; // Ensure published is set to true
        await dispatch(setQuiz(updatedQuizDetails));
        await handleSaveQuiz();
        dispatch(uq(updatedQuizDetails));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizDetails._id}`);
        // Create a new quiz
        console.log("quizDetails after publish", updatedQuizDetails);
    }

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }

    return (
        <div>
            <input type="text" className="w-25 btn-rad form-control mt-4" placeholder="Unnamed Quiz" value={quizDetails.title}
                onChange={(e) => dispatch(setQuiz({ ...quizDetails, title: e.target.value }))} />
            <br />
            <p>Quiz Instructions: </p>
            <ReactQuill
                theme="snow"
                onChange={(content) => dispatch(setQuiz({ ...quizDetails, instructions: content }))} // Handle editor content
                value={quizDetails.instructions || ''}
            />
            <br />
            <div className='container m-2'>
                <div className='row m-1' >
                    <div className="col-3">
                        <p className="float-end">Quiz Type</p>
                    </div>
                    <div className="col-8 mx-1">
                        <select id="quizType" className="form-control w-50" value={quizDetails.quizType}
                            onChange={(e) => dispatch(setQuiz({ ...quizDetails, quizType: e.target.value }))}>
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
                        <select id="quizType" className="form-control w-50" onChange={(e) => dispatch(setQuiz({ ...quizDetails, assignmentGroup: e.target.value }))}
                            value={quizDetails.assignmentGroup}>
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
                        <input type="text"
                            onChange={(e) => dispatch(setQuiz({ ...quizDetails, points: e.target.value }))}
                            className="w-25 form-control" value={quizDetails.points} />
                    </div>
                </div>

                <div className='row m-1' >
                    <div className="col-3">
                        <p className="float-end">Access Code</p>
                    </div>
                    <div className="col-8 mx-1">
                        <input type="text" className="w-25 form-control" value={quizDetails.accessCode}
                            onChange={(e) => dispatch(setQuiz({ ...quizDetails, accessCode: e.target.value }))} />
                    </div>
                </div>


                <div className='row m-1' >
                    <div className="col-3">
                    </div>
                    <div className="col-8 mx-1">
                        <p style={{ fontWeight: "bold" }}>Options</p>
                        <label>
                            <input type="checkbox" checked={quizDetails.options?.oneQAtATime}
                                onChange={(e) => dispatch(setQuiz({
                                    ...quizDetails, options: {
                                        ...quizDetails.options,
                                        oneQAtATime: e.target.value
                                    }
                                }))} />
                            One question at a time
                        </label> <br />
                        <label>
                            <input type="checkbox" checked={quizDetails.options?.requireWebCam}
                                onChange={(e) => dispatch(setQuiz({
                                    ...quizDetails, options: {
                                        ...quizDetails.options,
                                        requireWebCam: e.target.value
                                    }
                                }))} />
                            Webcam required
                        </label> <br />
                        <label>
                            <input type="checkbox" checked={quizDetails.options?.lockAnswersAfterFinalSubmission}
                                onChange={(e) => dispatch(setQuiz({
                                    ...quizDetails, options: {
                                        ...quizDetails.options,
                                        lockAnswersAfterFinalSubmission: e.target.value
                                    }
                                }))}
                            />
                            Lock questions after answering
                        </label> <br />
                        <label>
                            <input type="checkbox" checked={quizDetails.options?.showCorrectAnswers}
                                onChange={(e) => dispatch(setQuiz({
                                    ...quizDetails, options: {
                                        ...quizDetails.options,
                                        showCorrectAnswers: e.target.value
                                    }
                                }))} />
                            Show Correct Answers
                        </label> <br />
                        <label>
                            Correct Answers are displayed at:
                            <input type="text" className="w-25 form-control" value={quizDetails.options?.whenCorrectAnswer}
                                onChange={(e) => dispatch(setQuiz({
                                    ...quizDetails, options: {
                                        ...quizDetails.options,
                                        whenCorrectAnswer: e.target.value
                                    }
                                }))} />

                        </label> <br />
                        <label>
                            <input type="checkbox" checked={quizDetails.options?.shuffleAnswers}
                                onChange={(e) => dispatch(setQuiz({
                                    ...quizDetails, options: {
                                        ...quizDetails.options,
                                        shuffleAnswers: e.target.value
                                    }
                                }))} />
                            Shuffle Answers
                        </label>
                        <div>
                            <label>
                                <input type="checkbox" checked={quizDetails.options?.doesHaveTimer}
                                    onChange={(e) => dispatch(setQuiz({
                                        ...quizDetails, options: {
                                            ...quizDetails.options,
                                            doesHaveTimer: e.target.value
                                        }
                                    }))} />
                                Time Limit
                            </label>
                            <input
                                className='' style={{ width: "60px", marginLeft: "20px" }}
                                type="number"
                                value={quizDetails.options?.timeLimit}
                                onChange={(e) => dispatch(setQuiz({
                                    ...quizDetails, options: {
                                        ...quizDetails.options,
                                        timeLimit: e.target.value
                                    }
                                }))}
                            />Minutes
                        </div>
                        <div className='form-control mt-2'>
                            <label>
                                <input type="checkbox" checked={quizDetails.options?.allowMultipleAttempts}
                                    onChange={(e) => dispatch(setQuiz({
                                        ...quizDetails, options: {
                                            ...quizDetails.options,
                                            allowMultipleAttempts: e.target.value
                                        }
                                    }))} />
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
                                <input
                                    value={quizDetails?.dueDate?.split("T")[0]} // Extract date part
                                    onChange={(e) => dispatch(setQuiz({ ...quizDetails, dueDate: e.target.value }))}
                                    type="date"
                                    className="form-control w-100 border-black"
                                />
                            </div>

                            <div className="flex">
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <div style={{ fontWeight: "bold" }}>Available from</div>
                                        <input type="date" value={quizDetails?.availableFrom?.split("T")[0]} onChange={() => { }} className="form-control w-100 border-black" >

                                        </input>
                                    </div>
                                    <div className="col-6">
                                        <div style={{ fontWeight: "bold" }}>Until</div>
                                        <input type="date" value={quizDetails?.untilDate?.toLocaleString()} onChange={(e) => { }} className="form-control w-100 border-black" />
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
                <button onClick={handleSaveQuiz} className="btn btn-danger border-secondary ms-2 float-end">
                    Save
                </button>
                <button onClick={handleSaveAndPublish} className="btn btn-light border-secondary ms-2 float-end">
                    Save and Publish
                </button>
                <button onClick={handleCancel} className="btn btn-light border-secondary ms-2 float-end">
                    Cancel
                </button>
            </div>


        </div>
    );
};

export default DetailsComponent
