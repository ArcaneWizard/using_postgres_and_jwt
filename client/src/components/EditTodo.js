import React, { Fragment, useState } from "react";

function EditTodo(props) {

    const [description, editDescription] = useState(props.todo.description);

    const editTodo = e => {
        e.preventDefault();
        const body = { description };

        fetch(`http://localhost:5000/todos/${props.todo.todo_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(setTimeout(() => { props.change() }, 100));
    }

    return <Fragment>
        <button type="button" onClick={() => editDescription(props.todo.description)} className="btn btn-primary"
            data-toggle="modal" data-target={`#id${props.todo.todo_id}`}>
            Edit
        </button>

        <div className="modal fade" id={`id${props.todo.todo_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => editDescription(props.todo.description)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control" value={description} onChange={e => editDescription(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => editTodo(e)} >Edit</button>
                        <button type="button" className="close" data-dismiss="modal" className="btn btn-primary" onClick={() => editDescription(props.todo.description)}> Close</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}

export default EditTodo;