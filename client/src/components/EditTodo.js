import React, { Fragment, useState } from "react";
import { tokenFetchHeader } from "../actions/authActions";

function EditTodo(props) {

    const [description, editDescription] = useState(props.todo.description);

    const editTodo = e => {
        e.preventDefault();
        const body = { description };

        fetch(`http://localhost:5000/todos/${props.todo.todo_id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: tokenFetchHeader()
        }).then(setTimeout(() => { props.change() }, 100));
    }

    return <Fragment>
        <button type="button" onClick={() => editDescription(props.todo.description)} class="btn btn-primary"
            data-bs-toggle="modal" data-bs-target={`#id${props.todo.todo_id}`}>
            Edit
            </button>
        <div className="modal fade" id={`id${props.todo.todo_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => editDescription(props.todo.description)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control" value={description} onChange={e => editDescription(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={e => editTodo(e)} >Edit</button>
                        <button type="button" className="close" data-bs-dismiss="modal" className="btn btn-primary" onClick={() => editDescription(props.todo.description)}> Close</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment >
}

export default EditTodo;