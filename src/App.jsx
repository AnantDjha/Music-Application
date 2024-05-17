import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const code =new URLSearchParams(window.location.search).get("code")

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      {code ? <Dashboard code={code}/> :<Login/>}
      {/* <Login/> */}

    
    </>
  )
}

export default App
