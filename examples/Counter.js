/* eslint react/prop-types: 0 */
import React, { Fragment } from 'react'
import createStore from '../src/index'

const { Provider, connect } = createStore(
  { counter: 0 },
  {
    onAdd: () => dispatch =>
      dispatch(({ counter }) => ({ counter: counter + 1 })),
    onSubtract: () => dispatch =>
      dispatch(({ counter }) => ({ counter: counter - 1 })),
  },
)

let Counter = ({ counter, onAdd, onSubtract }) => (
  <Fragment>
    <span>{counter}</span>
    <button onClick={onAdd}>+1</button>
    <button onClick={onSubtract}>-1</button>
  </Fragment>
)
const identity = (x, y) => ({ ...x, ...y })
Counter = connect(identity)(Counter)

const App = () => <Provider><Counter /></Provider>

export default App
