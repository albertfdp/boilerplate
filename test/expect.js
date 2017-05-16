import unexpected from 'unexpected'
import unexpectedReact from 'unexpected-react'

import TestRenderer from 'react-test-renderer'

const jestExpect = global.expect

module.exports = unexpected
  .clone()
  .use(unexpectedReact)
  .addAssertion('<ReactElement> to match snapshot', (expect, subject) => {
    const tree = TestRenderer.create(subject).toJSON()
    jestExpect(tree).toMatchSnapshot()
  })
