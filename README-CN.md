# Mini Context Store

## 安装
`npm i mini-context-store --save`

## 基本使用
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
  更多例子点击 [这里](https://github.com/beizhedenglong/mini-context-store/tree/master/examples)
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
Provider 允许 Consumers 或 connect 修饰过的组件订阅 state 的改变。 <br />
*注意*: 不用再给 creteStore 返回的 Provider 传递 `value` 了。

### Consumer
```js
  <Consumer>
    {(state, actions) => /* 在这里使用 state 和 actions */}
  </Consumer>
```
Consumer 会订阅 state 的改变. 

### connect
```js
  const EnchancedComponent = connect(mapStateToProps, mapStateToProps)(BaseComponent)
```
connect 接受两个纯函数返回一个高阶组件，被该高阶组件修饰过的基础组件可以订阅 state 的改变。 <br />
mapStateToProps 和 mapStateToProps 是两个纯函数。 mapStateToProps 接受 state、mapStateToProps 接收 actions, 它们返回的对象会被 merge 到 EnchancedComponent 的 props 中去。


## 引用
- [react-waterfall](https://github.com/didierfranc/react-waterfall)
- [react-contextual](https://github.com/drcmda/react-contextual)