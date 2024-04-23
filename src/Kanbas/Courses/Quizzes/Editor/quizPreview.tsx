import React, {useEffect, useMemo, useState} from "react";
import { useParams } from "react-router";
import { findParticularQuizForCourse } from "../quizzesService";
import { KanbasState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../quizzesReducer";



const QuizPreview=()=>{
    const {courseId,quizId}=useParams();
    const quizDetails = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     const fetchQuiz = async () => {
    //         console.log("inside preview function");
    //         const quizDetails = await findParticularQuizForCourse(courseId, quizId);
    //         dispatch(setQuiz(quizDetails));
    //         console.log(quizDetails);
    //     };
    //     fetchQuiz();
    // }, [courseId, quizId]); 
    const memoizedFindQuiz = useMemo(() => {
        return findParticularQuizForCourse(courseId, quizId);
    }, [courseId, quizId]);

    const removeHtmlTags = (html:any) => {
        const regex = /(<([^>]+)>)/ig;
        return html.replace(regex, '');
    };

    useEffect(() => {
        memoizedFindQuiz.then((quiz) => dispatch(setQuiz(quiz)));
    }, [memoizedFindQuiz, dispatch]);

    return(
        <div>
            <h3>Quiz Preview</h3>
            <>{console.log(quizDetails.queAndAns)}</>
            <>
            {quizDetails.queAndAns.map((question:any, index:any) => (
                            <div key={index} style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}>
                                <h3>Question {index + 1}</h3>
                                <hr style={{ marginBottom: '5px', border: '1px solid black' }} />
                                <div className="d-flex justify-content-between align-items-center"> {/* Use flexbox to align items horizontally and space between them */}
                                    <span style={{ fontWeight: 'bold' }}>Title: {question.questionTitle}</span> {/* Use span to group the title */}
                                    <span style={{ fontWeight: 'bold' }}>Points: {question.points}</span> {/* Use span to group the points */}
                                </div>
                                <div>Question: {removeHtmlTags(question.questionContent)}</div>
                                {question.questionType === "Multiple Choice" && (
                                    <div>
                                        <h5>Options:</h5>
                                        {question.answers.map((answer:any, answerIndex:any) => (
                                            <div key={answerIndex}>
                                                <input
                                                    type="radio"
                                                    id={`question-${index}-answer-${answerIndex}`}
                                                    name={`question-${index}-answers`}
                                                    value={answer}
                                                />
                                                <label htmlFor={`question-${index}-answer-${answerIndex}`} style={{ marginLeft: '10px' }}> { answer}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {question.questionType === "True/False" && (
                                    <div>
                                        <h5>Options:</h5>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`question-${index}-answer-true`}
                                                name={`question-${index}-answers`}
                                                value="true"
                                            />
                                            <label htmlFor={`question-${index}-answer-true`} style={{ marginLeft: '10px' }}>True</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`question-${index}-answer-false`}
                                                name={`question-${index}-answers`}
                                                value="false"
                                            />
                                            <label htmlFor={`question-${index}-answer-false`} style={{ marginLeft: '10px' }}>False</label>
                                        </div>
                                    </div>
                                )}
                                {question.questionType === "Fill in the Blank" && (
                                    <div>
                                        <h5>Options:</h5>
                                        {question.blanks.map((blank:any, blankIndex:any) => (
                                            <div key={blankIndex}>
                                                <input
                                                    type="radio"
                                                    id={`question-${index}-blank-${blankIndex}`}
                                                    name={`question-${index}-blanks`}
                                                    value={blank}
                                                />
                                                <label htmlFor={`question-${index}-blank-${blankIndex}`} style={{ marginLeft: '10px' }}>{blank}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}</>
        </div>
    );

};
export default QuizPreview;