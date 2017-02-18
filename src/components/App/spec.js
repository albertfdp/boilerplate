import React from 'react'
import expect from 'test/expect'

import App from '.'

describe('App', () => {
  it('renders', () => {
    expect(<App />, 'to match snapshot')
  })

  it('renders with', () => {
    expect(
      <App />,
      'to have rendered',
      <div>foo</div>
    )
  })
})
