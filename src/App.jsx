import { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeGame from './HomeGame'
import GamePlay from './GamePlay'

export default class App extends Component {

  render() {

    return (
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomeGame />} />
            <Route exact path="/gameplay" element={<GamePlay />}/>
          </Routes>
        </Router>       
      </>
    )

  }
}
