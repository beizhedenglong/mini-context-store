/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import createStore from '../src/index'


describe('createStore', () => {
  const state = { number: 0 }
  const actions = { onAdd: num => ({ number }) => ({ number: number + num }) }
  const { Provider, connect } = createStore(
    state,
    actions,
  )
  let Add = ({ onAdd, number }) => (
    <div>
      {number}
      <button onClick={() => onAdd(1)}>+1</button>
    </div>
  )
  const identityMock = jest.fn(x => x)
  Add = connect(identityMock, identityMock)(Add)


  const App = () => (<Provider>hello, world!<Add /></Provider>)
  const tree = renderer.create(<App />)
  const provider = tree.root.findByType(Provider).instance

  test('renders correctly', () => {
    expect(tree.toJSON()).toMatchSnapshot()
  })

  test('should add state to provider', () => {
    expect(provider.state).toBe(state)
    expect(provider.state.number).toBe(0)
  })

  test('actions', () => {
    const button = tree.root.findByType('button')
    expect(identityMock.mock.calls.length).toBe(2)
    button.props.onClick()
    expect(tree.toJSON()).toMatchSnapshot()
    expect(provider.state.number).toBe(1)
    expect(identityMock.mock.calls.length).toBe(4)
    expect(identityMock.mock.calls[identityMock.mock.calls.length - 2]).toEqual([provider.state])
  })
})
