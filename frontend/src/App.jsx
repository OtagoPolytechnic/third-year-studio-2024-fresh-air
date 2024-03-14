import { useState } from 'react'
import './App.css'
import Co2Level from './Component/Co2Level'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <Co2Level />
   </>
  )
}

export default App
