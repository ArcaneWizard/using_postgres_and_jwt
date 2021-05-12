import React, { Fragment, useState } from "react";

function InputTodo(props) {

    const [description, setDescription] = useState("");

    const onSubmitForm = e => {
        e.preventDefault(); 

        try {
            const body = { description };

            fetch("http://localhost:5000/todos/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(setTimeout(() => { props.change() }, 100));;
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="mt-4 d-flex justify-content-center" onSubmit={onSubmitForm}>
                <div className="form-group col-lg-6 d-flex">
                    <input
                        type="text"
                        className="form-control mr-2"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <button type="submit" className="btn btn-success">Add</button>
                </div>
            </form>

        </div>

    );
}

export default InputTodo;