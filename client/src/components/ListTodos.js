import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import { tokenFetchHeader } from "../actions/authActions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

function ListTodos(props) {

    const isAuthenticated = props.isAuthenticated;

    const deleteTodo = todo_id => {
        try {
            fetch(`http://localhost:5000/todos/${todo_id}`, {
                method: "DELETE",
                headers: tokenFetchHeader()
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
                    <tr key={todo.todo_id} >
                        <td>{todo.description}</td>
                        <td>
                            {isAuthenticated
                                ? <EditTodo change={() => props.change()} todo={todo} />
                                : null
                            }
                        </td>
                        <td>
                            {isAuthenticated
                                ? <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                                : null
                            }
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    </Fragment >
}

ListTodos.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(ListTodos);