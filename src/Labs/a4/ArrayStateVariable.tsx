import React, { useState } from "react";
function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div >
            <h2>Array State Variable</h2>
            <button className="btn btn-success m-2" onClick={addElement}>Add Element</button>
            <ul className="list-group">
                {array.map((item, index) => (
                    <li className="list-group-item" style={{ width: "15%" }} key={index}>
                        {item}
                        <button className="btn btn-danger mx-5" onClick={() => deleteElement(index)}>
                            Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ArrayStateVariable;

