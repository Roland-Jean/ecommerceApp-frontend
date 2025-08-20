import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ecommerce Frontend</h1>
      <div className="card">
        <p>
          Welcome to your new ecommerce application! Built with React + Vite for blazing fast development.
        </p>
        <button onClick={() => setCount((count) => count + 1)}>
          Products viewed: {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Ready to start building your ecommerce features!
      </p>
    </>
  )
}

export default App
