import { useState } from "react";

function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
        <div>
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a href={API}>
            </a>

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