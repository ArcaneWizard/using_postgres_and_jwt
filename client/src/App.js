import './App.css';
import React, { Fragment, useState, useEffect } from "react";

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos"

function App() {

  const [todos, setTodos] = useState([]);

  const refreshTodos = () => {
    try {
      fetch("http://localhost:5000/todos")
        .then(res => res.json())
        .then(res => (setTodos(res)));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    refreshTodos();
    console.log('hi');
  }, []);

  return <Fragment>
    <div className="container">
      <InputTodo change={() => refreshTodos()} />
      <ListTodos change={() => refreshTodos()} todos={todos} />
    </div>
  </Fragment>
}

export default App;
