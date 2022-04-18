import { useState } from 'react'
import './App.css'

import Signup from './components/Signup'
import Login from './components/Login'
import SignUpAntD from './components/SignUpAntD'

function App() {
  const [loginDisplay, setLoginDisplay] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav">
          <span> Demo Form </span>
          <div>
            {' '}
            <button onClick={() => setLoginDisplay(true)}>Login</button>
            <button onClick={() => setLoginDisplay(false)}>Signup</button>{' '}
          </div>
        </nav>
      </header>

      {/* {loginDisplay ? <Login /> : <Signup />} */}
      {loginDisplay ? <Login /> : <SignUpAntD />}
    </div>
  )
}

export default App
