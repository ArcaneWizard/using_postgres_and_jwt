import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

function ListTodos(props) {

    const deleteTodo = todo_id => {
        try {
            fetch(`http://localhost:5000/todos/${todo_id}`, {
                method: "DELETE",
            }).then(setTimeout(() => { props.change() }, 100));
        } catch (err) {
            console.error(err.message);
        }
    }

    return <Fragment>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.todos.map(todo => (
                    <tr tr key={todo.todo_id} >
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo change={() => props.change()} todo={todo} />
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    </Fragment >
}

export default ListTodos;