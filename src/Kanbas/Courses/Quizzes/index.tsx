import React, { useEffect, useState } from 'react';
import { FaBan, FaCaretDown, FaCheckCircle, FaEllipsisV, FaPlus, FaRocket } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz, deleteQuiz, setQuizzes, setQuiz, updateQuiz } from './quizzesReducer';
import { createQuiz, deleteQuiz as deleteQuizByID, updateQuiz as updateQuizByID, findQuizzesForCourse } from './quizzesService';
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
            .then((q) =>
                dispatch(setQuizzes(q))
            );
    }, [courseId]);

    const handleAddQuiz = () => {
        try {
            createQuiz(courseId, { ...quiz, title: "New Title" }).then((quiz: any) => {
                dispatch(addQuiz({ ...quiz, _id: quiz._id }));
                dispatch(setQuiz(quiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
            });
        } catch (error) {
            console.log("Error adding quiz", error);
        }

    };

    const handleDeleteQuiz = (_id: any) => {
        deleteQuizByID(_id).then((status) => {
            dispatch(deleteQuiz(_id));
        });
    }

    const handlePublishQuiz = async (_id: any) => {
        const updatedQuiz = { ...quiz, published: !quiz.published, _id: _id };
        dispatch(setQuiz(updatedQuiz));
        const status = await updateQuizByID(updatedQuiz, _id);
        if (status) {
            dispatch(setQuizzes(updatedQuiz));
        }

    }

    function handleUnpublishQuiz(_id: any) {
        // Handle unpublish quiz functionality
    }

    function handleCopyQuiz(_id: any) {
        // Handle copy quiz functionality
    }

    function handleSortQuizzes(_id: any) {
        // Handle sorting quizzes functionality
    }

    function getAvailabilityStatus(quiz: any) {
        const currentDate = new Date();
        const availableDate = new Date(quiz.availableDate);
        const availableUntilDate = new Date(quiz.availableUntilDate);

        if (currentDate > availableUntilDate) {
            return "Closed";
        } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
            return "Available";
        } else if (currentDate < availableDate) {
            return "Not available until " + quiz.availableDate;
        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" className="mx-2 w-25 btn-rad" placeholder="Search for Quiz" />
                <div>
                    <Link
                        to={`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails`}>
                        <button className="btn btn-danger btn-md btn-rad " style={{ borderRadius: "0.2rem" }} onClick={handleAddQuiz}><FaPlus />
                            Quiz</button>
                    </Link>

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
                                .filter((q: any) => q.course === courseId)
                                .map((a: any) => (
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
                                                        {getAvailabilityStatus(a)} | Due {a.dueDate} | {a.points} points | {a.questionsCount} Questions
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                {a.published
                                                    ? <FaCheckCircle className="text-success" />
                                                    : <button style={{ backgroundColor: "white" }}>
                                                        <FaBan className="text-danger" onClick={() => handlePublishQuiz(a._id)} />
                                                    </button>
                                                }
                                                <button className="mb-1 btn " onClick={() => toggleContextMenu(a._id)}>
                                                    <FaEllipsisV className="ms-2" />
                                                </button>
                                                {openContextId === a._id && (
                                                    <div className="dropdown-menu show">
                                                        <button className="dropdown-item" onClick={() => handleDeleteQuiz(a._id)}>Edit</button>
                                                        <button className="dropdown-item" onClick={() => handleDeleteQuiz(a._id)}>Delete</button>
                                                        <button className="dropdown-item" onClick={() => handlePublishQuiz(a._id)}>{a.published ? 'Unpublish' : 'Publish'}</button>
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
function getTodayDate(): String {
    throw new Error('Function not implemented.');
}

