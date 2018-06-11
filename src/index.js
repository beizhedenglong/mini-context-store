import React, { createContext } from 'react'

const createProvider = (Provider, initialState, actions) =>
  class EnchancedProvider extends React.Component {
    state = initialState || {}
    actions = Object.keys(actions).reduce((fns, fnName) => {
      fns[fnName] = (...args) => // eslint-disable-line
        this.setState(state => actions[fnName](...args)(state))
      return fns
    }, {})
    render() {
      return (
        <Provider value={{ state: this.state, actions: this.actions }}>
          {this.props.children}
        </Provider>
      )
    }
  }

const identity = () => ({})
const createConnect = Consumer =>
  (mapStateToProps = identity, mapActionsToProps = identity) =>
    BaseComponent => props => (
      <Consumer>
        {
        ({ state, actions }) =>
          <BaseComponent {...props} {...mapStateToProps(state)} {...mapActionsToProps(actions)} />
        }
      </Consumer>
    )
const createStore = (state, actions) => {
  const context = createContext()
  const Provider = createProvider(context.Provider, state, actions)
  const Consumer = context.Consumer // eslint-disable-line
  const connect = createConnect(Consumer)

  return {
    Provider,
    Consumer,
    connect,
  }
}

export default createStore
