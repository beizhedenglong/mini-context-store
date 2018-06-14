/* eslint react/prop-types: 0 */
import React from 'react'
import { getDisplayName } from '../src/utils'

export default (BaseComponent) => {
  const WithLoading = ({ loading, ...restProps }) =>
    (loading
      ? <h2>Loading...</h2>
      : <BaseComponent {...restProps} />)
  WithLoading.displayName = `withLoading(${getDisplayName(BaseComponent)})`
  return WithLoading
}
