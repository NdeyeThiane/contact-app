import { useState } from 'react'

import './App.css'
import { Contacts } from './component/Contacts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Contacts />
      
    </>
  )
}

export default App
