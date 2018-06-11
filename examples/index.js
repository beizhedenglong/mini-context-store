/*eslint-disable*/
import React, { createContext, Fragment } from 'react'
import ReactDOM from 'react-dom'
import createStore from '../src/index'








const TodoStore = createStore(
  {
    todos: [],
    text: ""
  },
  {
    addTodo: () => ({todos, text}) =>{
      if(text.trim() === "") {
        return
      }
      return {todos:[...todos, text]}
    },
    onTextChange: (value) => ({text}) =>{
     return ({text: value})
    },
  }
)

const Todo =  TodoStore.connect(
  state => ({text: state.text, todos: state.todos}), 
  (actions) => ({
    onTextChange: (e) => actions.onTextChange(e.target.value),
    onAdd: actions.addTodo
  })
)(
  ({text, onTextChange, onAdd, todos, test}) => {
    return <div>
      {test}
      <input type="text" text={text} onChange={onTextChange}/>
      <button onClick={onAdd}>add</button>
      <ol>
        {
          todos.map((todo, index) => <li key={index}>{todo}</li>)
        }
      </ol>
    </div>
})

const Test = ({test}) => <div>{test}</div>
class App extends React.Component {
  
  render() {
    return (
    <div>
      <TodoStore.Provider>
        <Todo test="ok"></Todo>
        -------------------------------
        <TodoStore.Consumer>
          {
            ({text}, actions) => <div>{text}</div>
          }
        </TodoStore.Consumer>
      </TodoStore.Provider>
    </div> 
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
