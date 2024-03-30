import axios from "axios";
import { useEffect, useState } from "react";

function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";
    const [errorMessage, setErrorMessage] = useState(null);
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const [todos, setTodos] = useState<any[]>([]);

    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };

    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const removeTodo = async (todo: { id: any; }) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };
    const fetchTodoById = async (id: any) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };
    const deleteTodo = async (todo: { id: any; }) => {
        try {
            const response = await axios.delete(
                `${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }

    };

    const updateTodo = async () => {
        try {
            const response = await axios.put(
                `${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (
                t.id === todo.id ? todo : t)));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }

    };

    return (
        <div>

            {errorMessage && (
                <div className="alert alert-danger mb-2 mt-2">
                    {errorMessage}
                </div>
            )}

            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a href={API}>
            </a>
            <div className="form">
                <textarea className="form-control" value={todo.description}
                    onChange={(e) => setTodo({
                        ...todo,
                        description: e.target.value
                    })} />
                <input className="form-control" value={todo.due} type="date"
                    onChange={(e) => setTodo({
                        ...todo, due: e.target.value
                    })} />
                <label>
                    <input value={todo.completed.toString()} type="checkbox"
                        onChange={(e) => setTodo({
                            ...todo, completed: e.target.checked
                        })} />
                    Completed
                </label> <br />
                <button className="btn btn-primary" onClick={postTodo}> Post Todo </button>

                <button className="btn btn-secondary" onClick={updateTodo}>
                    Update Todo
                </button>

            </div>

            <br />
            <button className="btn btn-primary" onClick={createTodo} >
                Create Todo
            </button>


            <br />
            <input value={todo.id} onChange={(e) => setTodo({
                ...todo,
                id: Number(e.target.value)
            })} />
            <input value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
            <button className="btn btn-success m-1" onClick={updateTitle} >
                Update Title
            </button>
            <ul>
                {todos.map((todo: {
                }) => (
                    <li key={(todo as { id: any }).id} className="list-group-item d-flex align-items-center">
                        <div>
                            <input className="form-check-input" checked={(todo as { completed: boolean }).completed}
                                type="checkbox" readOnly />
                            <label className="form-check-label">
                                {(todo as { title: string }).title}
                            </label>
                            <p>{(todo as { description: string }).description}</p>
                            <p>{(todo as { due: string }).due}</p>
                        </div>

                        <div className="ml-auto">
                            <button className="btn btn-danger m-1" onClick={() => deleteTodo(todo as { id: any })} >
                                Delete
                            </button>
                            <button className="btn btn-success m-1" onClick={() => fetchTodoById((todo as { id: any }).id)} >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}

            </ul>

            <div className="btn btn-primary mx-2">
                <a href={API} className="text-white text-decoration-none ">
                    Get Todos

                </a>
            </div>
            <h4>Retrieving an Item from an Array by ID</h4>
            <input value={todo.id}
                onChange={(e) => setTodo({
                    ...todo,
                    id: Number(e.target.value)
                })} />
            <div className="btn btn-primary mx-2">
                <a href={`${API}/${todo.id}`} className="text-white text-decoration-none ">
                    Get Todo by ID
                </a>
            </div>
            <h3>Filtering Array Items</h3>
            <div className="btn btn-primary mx-2</div>">
                <a href={`${API}?completed=true`} className="text-white text-decoration-none ">
                    Get Completed Todos

                </a>
            </div>

            <h3>Creating new Items in an Array</h3>
            <div className="btn btn-primary mx-2">
                <a href={`${API}/create`} className="text-white text-decoration-none ">
                    Create Todo
                </a>
            </div>
            <h3>Deleting from an Array</h3>
            <div className="btn btn-primary m-2">
                <a href={`${API}/${todo.id}/delete`} className="text-white text-decoration-none ">
                    Delete Todo with ID = {todo.id}

                </a>
            </div>
            <br />


            <h3>Updating an Item in an Array</h3>
            <input type="number" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo, id: Number(e.target.value)
                })} />
            <input type="text" value={todo.title}
                onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} />
            <div className="btn btn-primary m-2">
                <a href={`${API}/${todo.id}/title/${todo.title}`} className="text-white text-decoration-none ">
                    Update Title to {todo.title}
                </a>
            </div>
            <br />
            <div>
                <input type="text" value={todo.description}
                    onChange={(e) => setTodo({
                        ...todo, description: e.target.value
                    })} />
                <div className="btn btn-primary m-2">
                    <a href={`${API}/${todo.id}/description/${todo.description}`} className="text-white text-decoration-none ">
                        Update Description to {todo.description}
                    </a>
                </div>
            </div>
            <div>
                <input type="checkbox" checked={todo.completed}
                    onChange={(e) => setTodo({
                        ...todo, completed: e.target.checked
                    })} />
                <div className="btn btn-primary m-2">
                    <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="text-white text-decoration-none ">
                        Update Completed Status to {todo.completed.toString()}
                    </a>
                </div>
            </div>

        </div>
    );
}
export default WorkingWithArrays;