import { useState } from 'react'

import InputCard from './InputCard'
import "bootstrap/dist/css/bootstrap.min.css"

import "../css/InputCard.css"
import Topbar from './TopBar'


export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Topbar />
      <InputCard />
    </div>
  )
}

