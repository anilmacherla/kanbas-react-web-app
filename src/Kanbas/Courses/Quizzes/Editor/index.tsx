import React, { useEffect, useState } from 'react'
import { addQuiz, setQuiz, updateQuiz } from '../quizzesReducer'
import { createQuiz, findParticularQuizForCourse, updateQuiz as uq } from '../quizzesService';
import { useNavigate, useParams } from 'react-router';
import { KanbasState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBan, FaCheckCircle, FaEllipsisV, FaPen } from 'react-icons/fa';
import "./index.css";
const QuizDetails = () => {
    const { courseId, quizId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [totalPoints, setTotalPoints] = useState(0);


    const handlePublishQuiz = async () => {
        console.log("In Publish");
        console.log("befor quiz", quiz);
        // Toggle the published status locally
        const updatedQuiz = { ...quiz, published: !quiz.published, _id: quizId, courseId: courseId };

        console.log("updatedQuiz", updatedQuiz);
        // Dispatch the action to update the local state
        dispatch(updateQuiz(updatedQuiz));

        // Update the quiz on the server and then dispatch the action with the updated quiz
        const status = await uq(updatedQuiz, quizId);
        if (status) {
            dispatch(setQuiz(updatedQuiz));
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

    const handleOnPreviewClick = () => {
        // Handle preview quiz functionality
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`);
    }

    const handleOnEditClick = () => {
        // Handle preview quiz functionality
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizEditor`);
    }

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const quiz = await findParticularQuizForCourse(courseId, quizId);
                dispatch(setQuiz(quiz));
                if (quiz.queAndAns) {
                    // Calculate total points
                    const pointsArray = quiz.queAndAns.map((question: any) => parseFloat(question.points) || 0);
                    const total = pointsArray.reduce((acc: any, cur: any) => acc + cur, 0);
                    setTotalPoints(total);
                }
            } catch (error) {
                console.error('Error fetching quiz details:', error);
            }
        };

    }, [courseId, quizId, dispatch]);

    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);


    const quizSettings = {
        "Quiz Type": quiz.quizType,
        "Points": quiz.queAndAns?.map((question: any) => parseFloat(question.points) || 0),
        "Assignment Group": quiz.assignmentGroup,
        "Shuffle Answers": quiz.shuffleAnswers ? "Yes" : "No",
        "Time Limit": quiz.options?.timeLimit,
        "Multiple Attempts": quiz.options.allowMultipleAttempts ? "Yes" : "No",
        "View Responses": quiz.options.showCorrectAnswers ? "Yes" : "No",
        "One Question at a Time": quiz.options.oneQAtATime ? "Yes" : "No",
        "Require Respondus LockDown Browser": "No",
        "Required to View Quiz Results": "No",
        "Webcam Required": quiz.options.requireWebCam ? "Yes" : "No",
        "Lock Questions After Answering": quiz.options.lockAnswersAfterFinalSubmission ? "Yes" : "No",
    };


    return (
        <div>
            <div className="d-flex flex-column mx-2">
                <div >
                    <button className="float-end btn btn-secondary m-1  rounded-1"><FaEllipsisV /></button>
                    <button className="btn btn-md btn-secondary float-end  m-1" onClick={handleOnEditClick}  ><FaPen className=" mx-1" />Edit</button>
                    <button className="btn  btn-md  btn-secondary float-end  m-1" onClick={handleOnPreviewClick} >Preview</button>
                    <button className={`float-end btn ${quiz.published ? "btn-success" : "btn-secondary"} m-1`} onClick={handlePublishQuiz}>{quiz.published ? <div className="div"><FaCheckCircle className="text-light m-1" /> Published</div> : <div className="div"><FaBan /> UnPublish</div>} </button>

                </div>
                <hr />
                <div>

                    <div className="quiz-container">
                        <div className="quiz-header">
                            <h1>{quiz.title}</h1>
                        </div>
                        <div className='container'>
                            {Object.entries(quizSettings).map(([key, value]) => (
                                <div className='row' key={key}>
                                    <div className="col-4">
                                        <p className="float-end" style={{ fontWeight: "bold" }}>{key}</p>
                                    </div>
                                    <div className="col-6 mx-1">
                                        <p>{value}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <hr className='border-dark' />
                        <div className="quiz-description">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Due</th>
                                        <th scope="col">For</th>
                                        <th scope="col">Available From</th>
                                        <th scope="col">Until</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-start'>{quiz.dueDate != '' ? `${formatDate(quiz.dueDate)} at ${formatTime(quiz.dueDate)}` : ''}</td>
                                        <td className='text-start'>Everyone</td>
                                        <td className='text-start'>{quiz.availableFromDate != '' ? `${formatDate(quiz.availableFromDate)} at ${formatTime(quiz.availableFromDate)}` : ''}</td>
                                        <td className='text-start'>{quiz.availableUntilDate != '' ? `${formatDate(quiz.availableUntilDate)} at ${formatTime(quiz.availableUntilDate)}` : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuizDetails


