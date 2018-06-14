/* eslint react/prop-types: 0 */
import React from 'react'
import creteStore from '../src/index'
import withLoading from './withLoading'

const { Provider, connect } = creteStore(
  {
    loading: false,
    posts: [],
  },
  {
    onChange: subreddit => async () => {
      if (subreddit === '') return { posts: [], loading: false }
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
      const json = await response.json()
      const posts = json.data.children.map(child => child.data)
      return { posts, loading: false }
    },
    setLoading: loading => () => ({ loading }),
  },
)

let Picker = ({ value, onChange, options }) => (
  <span>
    <h1>{value}</h1>
    <select
      onChange={e => onChange(e.target.value)}
      value={value}
    >
      <option value="">Please Select</option>
      {options.map(option =>
          (
            <option value={option} key={option}>
              {option}
            </option>))
        }
    </select>
  </span>
)

Picker = connect(
  ({ selectedSubreddit }) => ({ value: selectedSubreddit }),
  ({ onChange, setLoading }) => ({
    onChange: (value) => {
      setLoading(true)
      onChange(value)
    },
  }),
)(Picker)

let Posts = ({ posts }) => (
  <ul>
    {
      posts.map((post, i) =>
        <li key={i}>{post.title}</li>)
    }
  </ul>
)


Posts = connect(({ posts, loading }) => ({ posts, loading }))(withLoading(Posts))

const AsyncPosts = () => (
  <Provider>
    <Picker options={['reactjs', 'vuejs', 'angularjs']} />
    <Posts />
  </Provider>
)

export default AsyncPosts
