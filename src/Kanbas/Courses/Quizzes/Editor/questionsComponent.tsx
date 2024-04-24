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


    useEffect(() => {
        findParticularQuizForCourse(courseId, quizId).then((quiz) => dispatch(setQuiz(quiz)));
    }, [quizId])

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

    const setDefaultBlanks =() =>{
        setQuestionTitle('');
        setQuestionContent('');
        setPoints('');
        setBlanks(['']);
        setAnswers(['']);
    }

    const handleSaveAndPublish = async () => {
        const { queAndAns } = quizDetails;
        const updatedList = [...queAndAns, ...quizQuestions];
        const updatedQuiz = { ...quizDetails, queAndAns: updatedList, published:true };
        console.log("updated quiz", updatedQuiz)
        try {
            await updateQuiz(updatedQuiz, quizId).then(()=>{
                dispatch(uq(updatedQuiz));
                dispatch(setQuiz(updatedQuiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
            })
            
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };

    const handleSave = async () => {
        const { queAndAns } = quizDetails;
        const updatedList = queAndAns.length >1 ? [...queAndAns, ...quizQuestions] : [...quizQuestions];
        const updatedQuiz = { ...quizDetails, queAndAns: updatedList};
        console.log(queAndAns)
        try {
            await updateQuiz(updatedQuiz, quizId).then(()=>{
                dispatch(uq(updatedQuiz));
                dispatch(setQuiz(updatedQuiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
            })
            
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    }

    const handleCancel = () => {
        setSelectedQuestionType("Select Question Type");
        setShowForm(false);
    }

    const removeHtmlTags = (html: any) => {
        const regex = /(<([^>]+)>)/ig;
        return html.replace(regex, '');
    };


    // const handleFetchQuiz = async () =>{
    //     // const quizOne = await findParticularQuizForCourse(courseId, quizId);
    //     //setquizOne(quizOne);
    //     //console.log(setquizOne);

    // }

    const handleSaveQuestion = async () => {
        const newQuestion: QuizQuestion = { questionTitle, questionContent, questionType: selectedQuestionType, points, answers, blanks, };
        quizQuestions.length>0 ? 
        setQuizQuestions([...quizQuestions, newQuestion]): setQuizQuestions([newQuestion]);
        handleCancel();
    };

    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuestionType(event.target.value);
        setAnswers([]);
        setBlanks([]);

    };

    return (
        <div>
            <h1>Quiz Questions</h1>
            <div className=''>
                <div className='container'>
                    {showForm && (
                        <form>
                            <div className='row'>
                                <div className='col-4'>
                                    <input type='text' className='form-control' style={{ width: "100%" }} placeholder='Question Title' value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} />
                                </div>
                                <div className='col-6'>
                                    <select className='form-control  w-50' onChange={handleQuestionTypeChange} value={selectedQuestionType}>
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
                            <hr />
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
<>{showForm && (<div className='m-2'>
                            <button className="btn btn-light border-secondary ms-2 " onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className="btn btn-danger border-secondary ms-2" onClick={handleSaveQuestion}>
                                Save Question
                            </button></div>
                            
                        )}
</>
                    <div className='d-flex mt-4' style={{ justifyContent: "center" }}>
                        
                        <br/>
                        <button className="btn btn-light border-secondary ms-2 float-end" onClick={() => {setShowForm(true); setSelectedQuestionType('Multiple Choice'); setDefaultBlanks()}}>
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
                                    <div className="d-flex justify-content-between align-items-center"> {/* Use flexbox to align items horizontally and space between them */}
                                        <span style={{ fontWeight: 'bold' }}>Title: {question.questionTitle}</span> {/* Use span to group the title */}
                                        <span style={{ fontWeight: 'bold' }}>Points: {question.points}</span> {/* Use span to group the points */}
                                    </div>
                                    <div>Question: {removeHtmlTags(question.questionContent)}</div>
                                    {question.questionType === "Multiple Choice" && (
                                        <div>
                                            <h5>Options:</h5>
                                            {question.answers.map((answer, answerIndex) => (
                                                <div key={answerIndex}>
                                                    <input
                                                        type="radio"
                                                        id={`question-${index}-answer-${answerIndex}`}
                                                        name={`question-${index}-answers`}
                                                        value={answer}
                                                    />
                                                    <label htmlFor={`question-${index}-answer-${answerIndex}`} style={{ marginLeft: '10px' }}> {answer}</label>
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
                                            {question.blanks.map((blank, blankIndex) => (
                                                <div key={blankIndex}>
                                                    <input
                                                        type="text"
                                                        id={`question-${index}-blank-${blankIndex}`}
                                                        name={`question-${index}-blanks`}
                                                        defaultValue={blank} // Assign the value of the blank option to the input field
                                                        style={{ marginRight: '10px', marginBottom: '5px' }} // Add some spacing between input fields
                                                    />
                                                </div>
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
                        <button className="btn btn-light border-secondary ms-2 float-end" onClick={() => { setShowForm(false); navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`); }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsComponent;
