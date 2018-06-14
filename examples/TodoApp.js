/* eslint react/prop-types: 0 */
/* eslint no-shadow: 0 */
import React from 'react'
import createStore from '../src/index'


let id = 0


const TodoStore = createStore(
  {
    todos: [],
    text: '',
  },
  {
    addTodo: () => ({ todos, text }) => {
      if (text.trim() === '') {
        return {}
      }
      return { todos: [...todos, { id: id++, text, completed: false }] }
    },
    onTextChange: value => () => ({ text: value }),
    toggleTodo: id => ({ todos }) => ({
      todos: todos.map(todo =>
        (todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo)),
    }),
  },
)

const TodoComponent = (props) => {
  const {
    text, onTextChange, addTodo, toggleTodo, todos,
  } = props
  return (
    <div>
      <input type="text" text={text} onChange={onTextChange} />
      <button onClick={addTodo}>add</button>
      <ol>
        {
            todos.map(({ id, completed, text }) => (
              <li
                key={id}
                style={{
                  textDecoration: completed ? 'line-through' : 'none',
                }}
                onClick={() => toggleTodo(id)}
              >
                {text}
              </li>))
          }
      </ol>
    </div>
  )
}

const Todo = TodoStore.connect(
  state => ({ text: state.text, todos: state.todos }),
  actions => ({
    ...actions,
    onTextChange: e => actions.onTextChange(e.target.value),
  }),
)(TodoComponent)


const TodoApp = () => (
  <TodoStore.Provider>
    <Todo />
    <hr />
    <TodoStore.Consumer>
      { ({ text }) => <div>{text}</div> }
    </TodoStore.Consumer>
  </TodoStore.Provider>
)

export default TodoApp
