import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from '../src/Components/Routing/Routing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Router>
  <Routing/>
</Router>
    </>
  )
}

export default App
