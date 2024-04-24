import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { findParticularQuizForCourse } from "../quizzesService";
import { KanbasState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../quizzesReducer";

const QuizPreview = () => {
    const { courseId, quizId } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const dispatch = useDispatch();

    const memoizedFindQuiz = useMemo(() => {
        return findParticularQuizForCourse(courseId, quizId);
    }, [courseId, quizId]);

    const removeHtmlTags = (html: string) => {
        const regex = /(<([^>]+)>)/ig;
        return html.replace(regex, '');
    };

    useEffect(() => {
        memoizedFindQuiz.then((quiz) => dispatch(setQuiz(quiz)));
    }, [memoizedFindQuiz, dispatch]);

    const quizDetails = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizDetails.queAndAns.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div>
            <h3>Quiz Instructions</h3>
            {console.log(quizDetails?.queAndAns)}
{
   quizDetails.queAndAns.length ==0 && (<>
    <li className="list-group-item assignment-list-item">
                                <div className="d-flex align-items-center justify-content-center py-1">
                                    No quiz questions available. Please add questions and try again.
                                </div>
                            </li>
   </>)
}
            {quizDetails.queAndAns.length >0 && quizDetails?.queAndAns && (
                <div key={currentQuestionIndex} className="card" style={{ border: '1px solid black', width: '80%', marginBottom: '10px' }}>
                    <div className="card-header">
                        <h3>Question {currentQuestionIndex}</h3>
                    </div>
                    <div className="card-body">
                        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold' }}>Title: {quizDetails.queAndAns[currentQuestionIndex].questionTitle}</span>
                            <span style={{ fontWeight: 'bold' }}>Points: {quizDetails.queAndAns[currentQuestionIndex].points}</span>
                        </div>
                        <div><h4>Question: {removeHtmlTags(quizDetails.queAndAns[currentQuestionIndex].questionContent)}</h4></div>
                        {quizDetails.queAndAns[currentQuestionIndex].questionType === "Multiple Choice" && (
                            <div>
                                <h5>Options:</h5>
                                {quizDetails.queAndAns[currentQuestionIndex].answers.map((answer: any, answerIndex: any) => (
                                    <div key={answerIndex}>
                                        <input
                                            type="radio"
                                            id={`question-${currentQuestionIndex}-answer-${answerIndex}`}
                                            name={`question-${currentQuestionIndex}-answers`}
                                            value={answer}
                                        />
                                        <label htmlFor={`question-${currentQuestionIndex}-answer-${answerIndex}`} style={{ marginLeft: '10px' }}> {answer}</label>
                                        <hr style={{ margin: '5px 0', border: '1px solid black' }} />
                                    </div>
                                ))}
                            </div>
                        )}
                        {quizDetails.queAndAns[currentQuestionIndex].questionType === "True/False" && (
                            <div>
                                <h5>Options:</h5>
                                <div>
                                    <input
                                        type="radio"
                                        id={`question-${currentQuestionIndex}-answer-true`}
                                        name={`question-${currentQuestionIndex}-answers`}
                                        value="true"
                                    />
                                    <label htmlFor={`question-${currentQuestionIndex}-answer-true`} style={{ marginLeft: '10px' }}>True</label>
                                    <hr style={{ margin: '5px 0', border: '1px solid black' }} />
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id={`question-${currentQuestionIndex}-answer-false`}
                                        name={`question-${currentQuestionIndex}-answers`}
                                        value="false"
                                    />
                                    <label htmlFor={`question-${currentQuestionIndex}-answer-false`} style={{ marginLeft: '10px' }}>False</label>
                                    <hr style={{ margin: '5px 0', border: '1px solid black' }} />
                                </div>
                            </div>
                        )}
                        {quizDetails.queAndAns[currentQuestionIndex].questionType === "Fill in the Blank" && (
                            <div>
                                <h5>Options:</h5>
                                {quizDetails.queAndAns[currentQuestionIndex].blanks.map((blank: any, blankIndex: any) => (
                                    <div key={blankIndex}>
                                        <input
                                            type="text"
                                            id={`question-${currentQuestionIndex}-blank-${blankIndex}`}
                                            name={`question-${currentQuestionIndex}-blanks`}
                                            style={{ marginRight: '10px' }} // Add some spacing between input fields
                                        />
                                        <hr style={{ margin: '5px 0', border: '1px solid black' }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', alignItems: 'center' }} className="m-5">
                <button className="btn btn-primary" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 1}>Previous</button>
                <button className="btn btn-danger" onClick={handleNextQuestion} disabled={currentQuestionIndex === quizDetails.queAndAns.length - 1}>Next</button>
            </div>
                </div>
            )}
           
            
        </div>
    );
};

export default QuizPreview;
