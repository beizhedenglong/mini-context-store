import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { getDisplayName } from './utils'

const createProvider = (Provider, initialState, actions) => {
  class EnchancedProvider extends React.Component {
    state = initialState || {}
    actions = Object.keys(actions).reduce((fns, fnName) => {
      fns[fnName] = (...args) => { // eslint-disable-line
        const outerResult = actions[fnName](...args)
        const innerResult = outerResult(this.state)

        if (innerResult.then) {
          innerResult.then(res => this.setState(res))
        } else {
          this.setState(state => outerResult(state))
        }
      }
      return fns
    }, {})
    render() {
      return (
        <Provider
          value={{ state: this.state, actions: this.actions }}
          {...this.props}
        />
      )
    }
  }
  return EnchancedProvider
}


const empty = () => ({})
const createConnect = Consumer =>
  (mapStateToProps = empty, mapActionsToProps = empty) =>
    (BaseComponent) => {
      const Connect = props => (
        <Consumer>
          {
          ({ state, actions }) =>
            <BaseComponent {...props} {...mapStateToProps(state)} {...mapActionsToProps(actions)} />
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
        {({ state, actions }) => props.children(state, actions) }
      </Consumer>
    )

  EnchancedConsumer.propTypes = {
    children: PropTypes.func.isRequired,
  }
  EnchancedConsumer.displayName = 'EnchancedConsumer'
  return EnchancedConsumer
}

const createStore = (state, actions) => {
  const context = createContext()
  const Provider = createProvider(context.Provider, state, actions)
  const Consumer = creatConsumer(context.Consumer)
  const connect = createConnect(context.Consumer)

  return {
    Provider,
    Consumer,
    connect,
  }
}

export default createStore
