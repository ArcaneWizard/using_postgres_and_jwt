import './App.css';
import React, { Fragment, useState, useEffect } from "react";
import ListTodos from "./components/ListTodos";
import InputTodo from "./components/InputTodo";
import RegisterModal from './components/auth/RegisterModal';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser, tokenFetchHeader } from './actions/authActions';

function App() {

  const [todos, setTodos] = useState([]);
  let [mode, setMode] = useState("Register");

  const refreshTodos = () => {
    try {
      fetch("http://localhost:5000/todos", {
        headers: tokenFetchHeader()
      }).then(res => res.json())
        .then(res => {
          if (res[0])
            setTodos(res)
          else
            setTodos([]);
        });
    } catch (err) {
      console.error(err.message);
      setTodos([])
    }
  }

  useEffect(() => {
    console.log("hello")
    refreshTodos();
    store.dispatch(loadUser());
  }, []);

  const setTheMode = newMode => {
    setMode(newMode);
  }

  return <Provider store={store}>
    <Fragment>
      <div className="container">
        <RegisterModal mode={mode} setTheMode={() => setTheMode()} refreshTodos={() => refreshTodos()} />
        <InputTodo change={() => refreshTodos()} />
        <ListTodos change={() => refreshTodos()} todos={todos} />
      </div>
    </Fragment>
  </Provider>
}

export default App;
