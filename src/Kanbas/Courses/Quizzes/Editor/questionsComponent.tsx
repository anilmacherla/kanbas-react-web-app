import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { KanbasState } from '../../../store';
import { createQuiz, findParticularQuizForCourse, updateQuiz } from '../quizzesService';
import { addQuiz, setQuiz, updateQuiz as uq } from '../quizzesReducer';

interface QuizQuestion {
    questionTitle: string;
    questionContent: string;
    questionType: string;
    points: string;
    answers: string[];
    blanks: string[];
}

const QuestionsComponent = () => {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const [points, setPoints] = useState('');
    const [blanks, setBlanks] = useState(['']);
    const [answers, setAnswers] = useState(['']);
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]); // Define type for quizQuestions
    const { courseId, quizId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizDetails = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const [showQuestions, setShowQuestions] = useState(false);
    const [quizOne, setquizOne]=useState('')

    useEffect(()=>{
        findParticularQuizForCourse(courseId, quizId).then((quiz)=>  dispatch(setQuiz(quiz)));
    },[quizId])

    const handleAnswerChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
    };

    const addNewAnswer = () => {
        setAnswers([...answers, '']);
    };

    const removeAnswer = (index: number) => {
        const newAnswers = [...answers];
        newAnswers.splice(index, 1);
        setAnswers(newAnswers);
    };

    const handleBlankChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newBlanks = [...blanks];
        newBlanks[index] = event.target.value;
        setBlanks(newBlanks);
    };

    const addNewBlank = () => {
        setBlanks([...blanks, '']);
    };

    const removeBlank = (index: number) => {
        const newBlanks = [...blanks];
        newBlanks.splice(index, 1);
        setBlanks(newBlanks);
    };

    const handleSaveAndPublish = async () => {
        // Save and publish the quiz
        const newQuizDetails = {
            ...quizDetails,
            courseId: courseId,
            published: true,
            queAndAns: quizQuestions.map((question) => ({
                questionTitle: question.questionTitle,
                questionContent: question.questionContent,
                answers: question.answers,
                questionType: question.questionType,
                blanks: question.blanks,
                points: question.points
            }))
        };
        if (quizDetails._id !== 0) {
            await updateQuiz(newQuizDetails, quizDetails._id).then((quiz: any) => {
                dispatch(setQuiz(quiz));
                dispatch(uq(quiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
                
            });
        } else {
            await createQuiz(courseId, quizDetails).then((quiz: any) => {
                dispatch(addQuiz({ ...quiz, _id: quiz._id }));
                dispatch(setQuiz(quiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
                //setShowQuestions(true);
            });
        }
    };

    const handleSave = async () => {
        const { queAndAns } = quizDetails;
        const updatedList = [...queAndAns, ...quizQuestions];
        const updatedQuiz = { ...quizDetails, queAndAns: updatedList };
        try {
            const quiz = await updateQuiz(updatedQuiz, quizId);
            dispatch(uq(quiz));
            dispatch(setQuiz(updatedQuiz));
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
        // setShowQuestions(true);
    }
    

    const handleFetchQuiz = async () =>{
        // const quizOne = await findParticularQuizForCourse(courseId, quizId);
        //setquizOne(quizOne);
        //console.log(setquizOne);
    
    }

    const handleSaveQuestion = async () => {
        // Save the current question to the quizQuestions array
        const newQuestion: QuizQuestion = { questionTitle, questionContent, questionType: selectedQuestionType, points, answers, blanks, };
        setQuizQuestions([...quizQuestions, newQuestion]);
        console.log("Temp List", quizQuestions)
    };

    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuestionType(event.target.value);
        setAnswers([]);
        setBlanks([]);
    };

    return (
        <div>
            <h1>Quiz Questions</h1>
            quizQuestions && (
            <>
                {quizQuestions.map(q => (
                    <div >
                        <p>Title: {q.questionTitle}</p>
                        <p>Content: {q.questionContent}</p>
                    </div>
                ))}
            </>
            )
            <div className=''>
                <div className='container'>
                    {showForm && (
                        <form>
                            <div className='row'>
                                <div className='col-4'>
                                    <input type='text' className='form-control' style={{ width: "100%" }} placeholder='Question Title' value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} />
                                </div>
                                <div className='col-6'>
                                    <select className='form-control  w-50' onChange={handleQuestionTypeChange}>
                                        <option value="">Select Question Type</option>
                                        <option value="Multiple Choice">Multiple Choice</option>
                                        <option value="True/False">True/False</option>
                                        <option value="Fill in the Blank">Fill in the Blank</option>
                                        <option value="Matching">Matching</option>
                                    </select>
                                </div>
                                <div className="col-2">
                                    <input type="number" placeholder='Points' className='form-control' value={points} onChange={(e) => setPoints(e.target.value)} />
                                </div>
                                <br />
                            </div>
                            <hr/>
                        </form>
                    )}
                    {selectedQuestionType === "Fill in the Blank" && (
                        <div>
                            <p>Enter your question and add blanks for the missing parts</p>
                            <h4>Question: </h4>
                            <ReactQuill
                                theme="snow"
                                value={questionContent}
                                onChange={(value) => setQuestionContent(value)}
                            />
                            <h5>Blanks: </h5>
                            {blanks.map((blank, index) => (
                                <div key={index}>
                                    <div className='d-flex' style={{ alignItems: "flex-start" }}>
                                        <input
                                            className='form-control m-1 w-50'
                                            value={blank}
                                            onChange={(event) => handleBlankChange(index, event)}
                                        />
                                        <button className='btn btn-danger m-2' type="button" onClick={() => removeBlank(index)}> <FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                            <button className='btn btn-light border-dark mx-3 mt-2' type="button" onClick={addNewBlank}>Add Another Blank</button>
                        </div>
                    )}
                    {selectedQuestionType === "True/False" && (
                        <div>
                            <p>Enter your True/False question</p>
                            <h4>Question: </h4>
                            <ReactQuill
                                theme="snow"
                                value={questionContent}
                                onChange={(value) => setQuestionContent(value)}
                            />
                            <h5>Answers: </h5>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="trueOption"
                                    value="true"
                                    checked={answers[0] === "true"}
                                    onChange={(e) => handleAnswerChange(0, e)}
                                />
                                <label className="form-check-label" htmlFor="trueOption">True</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="falseOption"
                                    value="false"
                                    checked={answers[0] === "false"}
                                    onChange={(e) => handleAnswerChange(0, e)}
                                />
                                <label className="form-check-label" htmlFor="falseOption">False</label>
                            </div>
                        </div>
                    )}
                    {selectedQuestionType === "Multiple Choice" && (
                        <div>
                            <p>Enter your Multiple Choice question and its options</p>
                            <h4>Question: </h4>
                            <ReactQuill
                                theme="snow"
                                value={questionContent}
                                onChange={(value) => setQuestionContent(value)}
                            />
                            <h5>Answers: </h5>
                            {answers.map((answer, index) => (
                                <div key={index}>
                                    <div className='d-flex' style={{ alignItems: "flex-start" }}>
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            checked={quizDetails.correctAnswer === index}
                                            onChange={() => dispatch(setQuiz({ ...quizDetails, correctAnswer: index }))}
                                        />
                                        <input
                                            className='form-control m-1 w-50'
                                            value={answer}
                                            onChange={(event) => handleAnswerChange(index, event)}
                                        />
                                        {index > 0 && <button className='btn btn-danger m-2' type="button" onClick={() => removeAnswer(index)}> <FaTrash /></button>}
                                    </div>
                                </div>
                            ))}
                            <button className='btn btn-light border-dark mx-3 mt-2' type="button" onClick={addNewAnswer}>Add Another Answer</button>
                        </div>
                    )}

                    <div className='d-flex mt-4' style={{ justifyContent: "center" }}>
                        <button className="btn btn-danger border-secondary ms-2" onClick={handleSaveQuestion}>
                            Save Question
                        </button>
                        <button className="btn btn-light border-secondary ms-2 float-end" onClick={() => setShowForm(true)}>
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
                    <div>
                    <>
                        {quizQuestions.map((question, index) => (
                            <div key={index}>
                                <h3>Question {index + 1}</h3>
                                <p>Title: {question.questionTitle}</p>
                                <p>Content: {question.questionContent}</p>
                                <p>Points: {question.points}</p>
                                {question.questionType === "Multiple Choice" && (
                                    <div>
                                        <h5>Answers:</h5>
                                        {question.answers.map((answer, answerIndex) => (
                                            <div key={answerIndex}>
                                                <input
                                                    type="radio"
                                                    id={`question-${index}-answer-${answerIndex}`}
                                                    name={`question-${index}-answers`}
                                                    value={answer}
                                                />
                                                <label htmlFor={`question-${index}-answer-${answerIndex}`}>{answer}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {question.questionType === "True/False" && (
                                    <div>
                                        <h5>Answers:</h5>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`question-${index}-answer-true`}
                                                name={`question-${index}-answers`}
                                                value="true"
                                            />
                                            <label htmlFor={`question-${index}-answer-true`}>True</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`question-${index}-answer-false`}
                                                name={`question-${index}-answers`}
                                                value="false"
                                            />
                                            <label htmlFor={`question-${index}-answer-false`}>False</label>
                                        </div>
                                    </div>
                                )}
                                {question.questionType === "Fill in the Blank" && (
                                    <div>
                                        <h5>Blanks:</h5>
                                        {question.blanks.map((blank, blankIndex) => (
                                            <p key={blankIndex}>{blank}</p>
                                        ))}
                                    </div>
                                )}
                                <hr />
                            </div>
                        ))}
                    </>

                    </div>
                    <div className='m-2'>
                        <label >
                            <input type="checkbox" className='mx-2' checked={false} onChange={() => { }} />
                            Notify users this quiz has changed
                        </label>
                        <button className="btn btn-danger border-secondary ms-2 float-end" onClick={handleSave}>
                            Save
                        </button>
                        <button className="btn btn-light border-secondary ms-2 float-end" onClick={handleSaveAndPublish}>
                            Save and Publish
                        </button>
                        <button className="btn btn-light border-secondary ms-2 float-end" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsComponent;
