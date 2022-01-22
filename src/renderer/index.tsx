import { render } from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'

import 'react-virtualized/styles.css'

import App from './App'

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
)
