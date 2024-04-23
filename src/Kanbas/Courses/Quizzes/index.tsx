import React, { useEffect, useState } from 'react';
import { FaBan, FaCaretDown, FaCheckCircle, FaEllipsisV, FaPlus, FaRocket } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz, deleteQuiz, setQuizzes, setQuiz, updateQuiz } from './quizzesReducer';
import { createQuiz, deleteQuiz as deleteQuizByID, updateQuiz as updateQuizByID, findQuizzesForCourse } from './quizzesService';
import { current } from '@reduxjs/toolkit';
const Quizzes = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [openContextId, setOpenContextId] = useState(null);
    const dispatch = useDispatch();
    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const quiz = useSelector((state: any) => state.quizzesReducer.quiz);

    const toggleContextMenu = (_id: any) => {
        setOpenContextId(_id === openContextId ? null : _id);
    };

    useEffect(() => {
        // fetch quizzes for the course
        findQuizzesForCourse(courseId)
            .then((q) => {
                dispatch(setQuizzes(q));

            }
            );
    }, [courseId]);


    const handleDeleteQuiz = (_id: any) => {
        deleteQuizByID(_id).then((status) => {
            dispatch(deleteQuiz(_id));
        });
    }

    const handlePublishQuiz = async (_id: any, value: any) => {
        const updatedQuiz = { ...quiz, published: value, _id: _id, course: courseId };
        await updateQuizByID(updatedQuiz, _id).then((status: any) => {
            console.log("inside publishquiz after await", status)
            dispatch(updateQuiz(updatedQuiz));
        });

    }

    function handleEditQuiz(_id: any) {
        console.log("inside handle Edit Quiz", _id);
        dispatch(setQuiz(quizzes.find((q: any) => q._id === _id)));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${_id}/QuizEditor`);
    }

    const getAvailabilityStatus = (quiz: any) => {
        const currentDate = new Date();
        const availableDate = new Date(quiz.availableFromDate);
        const availableUntilDate = new Date(quiz.availableUntilDate);
        console.log("currentDate", currentDate, "availableDate", availableDate, "availableUntilDate", availableUntilDate)
        if (currentDate > availableUntilDate) {
            return "Closed";
        } else if (currentDate < availableDate) {
            return "Not available until " + quiz.availableDate;
        }

        else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
            return "Available";
        }
    }

    const formatDate = (dateString: any) => {
        console.log("date", dateString);
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day); // Month is 0-indexed in Date constructor
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };



    const handleAddQuiz = async () => {
        const newQuiz = {
            title: "New Sample Quiz",
            course: courseId,
            isAvailable: false,
            availableDate: '',
            availableUntilDate: '',
            dueDate: '',
            points: 0,
            questionsCount: 0,
            published: false,
            quizType: "Graded Quiz",
            assignmentGroup: "Quizzes",
            accessCode: "",
            instructions: "",
            options: {
                oneQAtATime: true,
                requireWebCam: false,
                lockAnswersAfterFinalSubmission: false,
                showCorrectAnswers: false,
                whenCorrectAnswer: "Immediately",
                shuffleAnswers: true,
                doesHaveTimer: false,
                timeLimit: 20,
                allowMultipleAttempts: false,
            },
            queAndAns: [{
                question: "",
                answers: [],
                questionType: "",
                correctAnswer: "",
            }]
        };
        await createQuiz(courseId, newQuiz).then((quiz) => {
            dispatch(setQuiz(quiz));
            addQuiz(quiz);
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/QuizEditor`);
        });

    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" className="mx-2 w-25 btn-rad" placeholder="Search for Quiz" />
                <div>

                    <button className="btn btn-danger btn-md btn-rad " onClick={handleAddQuiz} style={{ borderRadius: "0.2rem" }} ><FaPlus />
                        Quiz</button>

                    <button className="btn btn-secondary btn-md btn-rad btn-grey-button m-1" style={{ borderRadius: "0.2rem" }}><FaEllipsisV /></button>
                </div>
            </div>
            <hr />
            <ul className="list-group wd-modules rounded-0">
                <li className="list-group-item">
                    <div className="d-flex justify-content-between">
                        <div>
                            <FaCaretDown />Assignment Quizzes
                        </div>
                    </div>
                    <ul className="list-group assignment-list">
                        {quizzes.length === 0 ? (
                            <li className="list-group-item assignment-list-item">
                                <div className="d-flex align-items-center justify-content-center py-1">
                                    No quizzes available. Please add quizzes by clicking on +Quiz button above.
                                </div>
                            </li>
                        ) : (
                            quizzes
                                ?.filter((q: any) => q.course === courseId)
                                ?.map((a: any) => (
                                    <li key={a._id} className="list-group-item assignment-list-item">
                                        <div className="d-flex align-items-center justify-content-between py-1">
                                            <div>
                                                <FaRocket className="text-success mx-2" />
                                                <Link
                                                    className="text-decoration-none text-dark"
                                                    onClick={() => {
                                                        dispatch(setQuiz({ ...a, title: a.title, course: courseId }));
                                                    }}
                                                    to={`/Kanbas/Courses/${courseId}/Quizzes/${a._id}`}
                                                >
                                                    {a.title}
                                                </Link>
                                                <div className="mx-4 px-2" style={{ fontSize: "small" }}>
                                                    <div className='text-muted'>
                                                        {getAvailabilityStatus(a)} | Due {quiz.dueDate != '' ? `${formatDate(quiz.dueDate)} at ${formatTime(quiz.dueDate)}` : new Date().toDateString()} | {a.queAndAns.map((question: any) => parseFloat(question.points) || 0)} points | {a.queAndAns.map((question: any) => parseFloat(question.question) || 0)} Questions
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                {a.published
                                                    ? <FaCheckCircle className="text-success" />
                                                    : <button style={{ backgroundColor: "white" }}>
                                                        <FaBan className="text-danger" onClick={() => handlePublishQuiz(a._id, !a.published)} />
                                                    </button>
                                                }
                                                <button className="mb-1 btn " onClick={() => toggleContextMenu(a._id)}>
                                                    <FaEllipsisV className="ms-2" />
                                                </button>
                                                {openContextId === a._id && (
                                                    <div className="dropdown-menu show">
                                                        <button className="dropdown-item" onClick={() => handleEditQuiz(a._id)}>Edit</button>
                                                        <button className="dropdown-item" onClick={() => handleDeleteQuiz(a._id)}>Delete</button>
                                                        <button className="dropdown-item" onClick={() => handlePublishQuiz(a._id, !a.published)}>{a.published ? 'Unpublish' : 'Publish'}</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))
                        )}
                    </ul>
                </li>
            </ul>
        </>
    );
};

export default Quizzes;


