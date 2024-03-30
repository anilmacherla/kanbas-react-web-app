import React, { useState } from "react";
function EncodingParametersInURLs() {
    const [a, setA] = useState(34);
    const [b, setB] = useState(23);
    return (
        <div>
            <h3>Encoding Parameters In URLs</h3>
            <h4>Calculator</h4>
            <input type="number" value={a}
                onChange={(e) => setA(Number(e.target.value))} />
            <input type="number"
                onChange={(e) => setB(Number(e.target.value))} value={b} />
            <h3>Path Parameters</h3>
            <a href={`http://localhost:4000/a5/add/${a}/${b}`} className="mx-2">
                Add {a} + {b}
            </a>

            <a href={`http://localhost:4000/a5/subtract/${a}/${b}`} className="mx-2">
                Subtract {a} - {b}
            </a>
            <a href={`http://localhost:4000/a5/multiply/${a}/${b}`} className="mx-2">
                Multiply {a} * {b}
            </a>
            <a href={`http://localhost:4000/a5/divide/${a}/${b}`} className="mx-2">
                Divide {b} / {a}
            </a>
            <h3>Query Parameters</h3>
            <a className="btn btn-primary mx-1"
                href={`http://localhost:4000/a5/calculator?operation=add&a=${a}&b=${b}`}>
                Add {a} + {b}
            </a>
            <a className="btn btn-danger mx-1"
                href={`http://localhost:4000/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
                Substract {a} - {b}
            </a>
            <a className="btn btn-secondary mx-1"
                href={`http://localhost:4000/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
                Multiply {a} * {b}
            </a>
            <a className="btn btn-success mx-1"
                href={`http://localhost:4000/a5/calculator?operation=divide&a=${a}&b=${b}`}>
                Divide {b} / {a}
            </a>
        </div>
    );
}
export default EncodingParametersInURLs;

