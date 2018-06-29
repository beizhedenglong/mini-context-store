import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { getDisplayName } from './utils'

const createProvider = (Provider, initialState, handlers) => {
  class EnchancedProvider extends React.Component {
    state = initialState || {}
    handlers = Object.keys(handlers).reduce((fns, fnName) => {
      fns[fnName] = (...args) => { // eslint-disable-line
        handlers[fnName](...args)(this.setState.bind(this), this.state)
      }
      return fns
    }, {})
    render() {
      return (
        <Provider
          value={{ state: this.state, handlers: this.handlers }}
          {...this.props}
        />
      )
    }
  }
  return EnchancedProvider
}


const createConnect = Consumer =>
  (mapStoreToProps = () => ({})) =>
    (BaseComponent) => {
      const Connect = props => (
        <Consumer>
          {
          ({ state, handlers }) =>
            <BaseComponent {...props} {...mapStoreToProps(state, handlers)} />
          }
        </Consumer>
      )
      Connect.displayName = `connect(${getDisplayName(BaseComponent)})`
      return Connect
    }

const creatConsumer = (Consumer) => {
  const EnchancedConsumer = props =>
    (
      <Consumer>
        {({ state, handlers }) => props.children(state, handlers) }
      </Consumer>
    )

  EnchancedConsumer.propTypes = {
    children: PropTypes.func.isRequired,
  }
  EnchancedConsumer.displayName = 'EnchancedConsumer'
  return EnchancedConsumer
}

const createStore = (state, handlers) => {
  const context = createContext()
  const Provider = createProvider(context.Provider, state, handlers)
  const Consumer = creatConsumer(context.Consumer)
  const connect = createConnect(context.Consumer)

  return {
    Provider,
    Consumer,
    connect,
  }
}

export default createStore
