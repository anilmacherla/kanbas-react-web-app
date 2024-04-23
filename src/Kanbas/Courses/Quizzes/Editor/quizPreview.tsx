import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { findParticularQuizForCourse } from "../quizzesService";
import { KanbasState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../quizzesReducer";



const QuizPreview = () => {
    const { courseId, quizId } = useParams();
    const quizDetails = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();

    useEffect(() => {
        findParticularQuizForCourse(courseId, quizId).then((quiz) => dispatch(setQuiz(quiz)));
    }, [courseId, quizId, dispatch])

    return (
        <div>
            <h3>Quiz Preview</h3>
            <>{console.log(quizDetails.queAndAns)}</>
        </div>
    );

};
export default QuizPreview;