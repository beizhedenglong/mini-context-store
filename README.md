# Mini Context Store

## Installation
`npm i mini-context-store --save`

## Basic Usage
```js
  import React, { Fragment } from 'react'
  import createStore from 'mini-context-store'

  const { Provider, connect } = createStore(
    { counter: 0 },
    {
      onAdd: () => ({ counter }) => ({ counter: counter + 1 }),
      onSubtract: () => ({ counter }) => ({ counter: counter - 1 }),
    },
  )
  const identity = x => x
  let Counter = ({ counter, onAdd, onSubtract }) => (
    <Fragment>
      <span>{counter}</span>
      <button onClick={onAdd}>+1</button>
      <button onClick={onSubtract}>-1</button>
    </Fragment>
  )
  Counter = connect(identity, identity)(Counter)

  const App = () => <Provider><Counter /></Provider>
```

## Examples
  More examples click [here](https://github.com/beizhedenglong/reactablejs/tree/master/examples)
## API
### createStore
```js
  const {Provider, Consumer, connect} = createStore(initialState, actions)
```
### Provider
```js
  <Provider>
    {/* children */}
  <Provider/>
```
A react component allows Consumers or `connected` component to subscribe the state changes. <br />
*NOTE*: No need to pass `value` to Provider

### Consumer
```js
  <Consumer>
    {(state, actions) => /* use state and actions here */}
  </Consumer>
```
A react component subscribes state changes. 

### connect
```js
  const EnchancedComponent = connect(mapStateToProps, mapStateToProps)(BaseComponent)
```
connect is a high-order component receives two map functions and a BaseComponent, then  return a EnchancedComponent that subscribes state changes. <br />
mapStateToProps and mapStateToProps are two pure functions. mapStateToProps receives state and return an object that will be merged in EnchancedComponent' props. mapStateToProps receives actions and and return an object that will be merged in EnchancedComponent' props.


## Reference
- [react-waterfall](https://github.com/didierfranc/react-waterfall)
- [react-contextual](https://github.com/drcmda/react-contextual)