import React from 'react'
import { addQuiz, setQuiz, updateQuiz } from '../quizzesReducer'
import { createQuiz, updateQuiz as uq } from '../quizzesService';
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

    const handleOnPreviewClick = () => {
        // Handle preview quiz functionality
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizEditor`);
    }

    const handleOnEditClick = () => {
        // Handle preview quiz functionality
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizEditor`);
    }

    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);

    const quizSettings = {
        "Quiz Type": "Graded Quiz",
        "Points": quiz.points,
        "Assignment Group": "QUIZZES",
        "Shuffle Answers": "No",
        "Time Limit": "30 Minutes",
        "Multiple Attempts": "No",
        "View Responses": "Always",
        "One Question at a Time": "Yes",
        "Require Respondus LockDown Browser": "No",
        "Required to View Quiz Results": "No",
        "Webcam Required": "No",
        "Lock Questions After Answering": "No",
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
                                        <td className='text-start'>{quiz.dueDate}</td>
                                        <td className='text-start'>Everyone</td>
                                        <td className='text-start'>{quiz.availableDate}</td>
                                        <td className='text-start'>{quiz.availableUntilDate}</td>
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


