import React, { useState } from 'react';
import { FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { KanbasState } from '../../../store';
import { updateQuiz } from '../quizzesService';
import { setQuiz, updateQuiz as uq } from '../quizzesReducer';

const QuestionsComponent = () => {
    const [question, setQuestion] = useState('');
    const [displayQuestion, setDisplayQuestion] = useState(false);
    const [answers, setAnswers] = useState(['', '']); // Initial state with two empty answers
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizDetails = useSelector((state: KanbasState) => state.quizzesReducer.quiz);


    const handleAnswerChange = (index: any, event: any) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (index: any) => {
        setCorrectAnswerIndex(index);
    };

    const addNewAnswer = () => {
        setAnswers([...answers, '']);
    };

    const removeAnswer = (index: any) => {
        const newAnswers = [...answers];
        newAnswers.splice(index, 1);
        setAnswers(newAnswers);
        if (index === correctAnswerIndex) {
            setCorrectAnswerIndex(null);
        }
    };

    const handleSaveAndPublish = async () => {
        // Save and publish the quiz
        const newQuizDetails = {
            ...quizDetails,
            courseId: courseId,
            published: true,
            queAndAns: { question, answers, correctAnswerIndex }
        };
        await updateQuiz(newQuizDetails, quizDetails._id).then((quiz: any) => {
            dispatch(setQuiz(quiz));
            dispatch(uq(quiz));
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
        });

    };


    return (
        <div>
            <h1>Quiz Questions</h1>
            <div className=''>
                <div className='container'>
                    <form>
                        <div className='row'>
                            <div className='col-4'>
                                <input type='text' className='form-control' style={{ width: "100%" }} placeholder='Question Title' />
                            </div>
                            <div className='col-6'>
                                <select className='form-control  w-50'>
                                    <option value="Multiple Choice">Multiple Choice</option>
                                    <option value="True/False">True/False</option>
                                    <option value="Fill in the Blank">Fill in the Blank</option>
                                    <option value="Matching">Matching</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <input type="number" placeholder='Points' className='form-control' />
                            </div>
                        </div>
                    </form>
                    <hr />
                    {displayQuestion && (<div>
                        <p>Enter your question and multiple answers, then select the correct answer</p>
                        <h4>Question: </h4>
                        <ReactQuill
                            theme="snow"
                            value={question}
                            onChange={(value) => setQuestion(value)}
                        />
                        <h5>Answers: </h5>
                        {answers.map((answer, index) => (
                            <div key={index}>
                                <div className='d-flex' style={{ alignItems: "flex-start" }}>
                                    <input
                                        type="radio" className='my-2'
                                        checked={correctAnswerIndex === index}
                                        onChange={() => handleCorrectAnswerChange(index)}
                                    />
                                    <textarea className='form-control m-1 w-50'
                                        value={answer}
                                        onChange={(event) => handleAnswerChange(index, event)}
                                    />
                                    <button className='btn btn-danger m-2' type="button" onClick={() => removeAnswer(index)}> <FaTrash /></button>

                                </div>


                            </div>
                        ))}
                        <button className='btn btn-light border-dark mx-3 mt-2' type="button" onClick={addNewAnswer}>Add Another Answer</button>
                        <br />
                    </div>)}

                    <div className='d-flex mt-4' style={{ justifyContent: "center" }}>
                        <button className="btn btn-light border-secondary ms-2 float-end" onClick={() => setDisplayQuestion(true)}>
                            <FaPlus /> New Question
                        </button>
                        <button className="btn btn-light border-secondary ms-2 float-end">
                            <FaPlus />New Question Group
                        </button>
                        <button className="btn btn-light border-secondary ms-2 float-end">
                            <FaSearch /> Find Questions
                        </button>
                    </div>
                    <br />
                    <hr />
                    <div className='m-2'>
                        <label >
                            <input type="checkbox" className='mx-2' checked={false} onChange={() => { }} />
                            Notify users this quiz has changed
                        </label>
                        <button className="btn btn-danger border-secondary ms-2 float-end">
                            Save
                        </button>
                        <button className="btn btn-light border-secondary ms-2 float-end" onClick={handleSaveAndPublish}>
                            Save and Publish
                        </button>
                        <button className="btn btn-light border-secondary ms-2 float-end" onClick={() => setDisplayQuestion(false)}>
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default QuestionsComponent;
