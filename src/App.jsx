import { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeGame from './HomeGame'
//import './index.css'

export default class App extends Component {

  render() {

    return (
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomeGame />} />
          </Routes>
        </Router>       
      </>
    )

  }
}



// const [count, setCount] = useState(0)

//<div>
//        <a href="https://vitejs.dev" target="_blank">
//          <img src={viteLogo} className="logo" alt="Vite logo" />
//        </a>
//        <a href="https://react.dev" target="_blank">
//          <img src={reactLogo} className="logo react" alt="React logo" />
//        </a>
//      </div>
//      <h1>Vite + React</h1>
//      <div className="card">
//        <button onClick={() => setCount((count) => count + 1)}>
//          count is {count}
//        </button>
//        <p>
//          Edit <code>src/App.jsx</code> and save to test HMR
//        </p>
//      </div>
//      <p className="read-the-docs">
//        Click on the Vite and React logos to learn more
//      </p>