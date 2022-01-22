import * as React from 'react'
import loadable from '@loadable/component'

import useStore from './store'

export default function App() {
  const mode = useStore(state => state.mode)
  const checkMode = useStore(state => state.checkMode)
  const Component = loadable(() => import(`./screen/${mode || 'pending'}`))

  React.useEffect(() => {
    checkMode()
  }, [])

  return <Component />
}
