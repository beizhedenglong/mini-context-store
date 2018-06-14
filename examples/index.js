import 'babel-polyfill'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './TodoApp'
import AsyncPosts from './AsyncPosts'
import Counter from './Counter'


ReactDOM.render(
  <Fragment>
    <h1>Async Posts</h1>
    <AsyncPosts />
    <h1>Todo App</h1>
    <TodoApp />
    <h1>Counter</h1>
    <Counter />
  </Fragment>,
  document.getElementById('root'),
)
