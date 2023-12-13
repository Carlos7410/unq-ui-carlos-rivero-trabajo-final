import { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeGame from './pages/HomeGame'
import GamePlay from './pages/GamePlay'
import InitialScreen from './pages/InitialScreen'

export default class App extends Component {

  render() {

    return (
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={<InitialScreen />}/>
            <Route exact path="/home" element={<HomeGame />} />
            <Route exact path="/gameplay" element={<GamePlay />}/>
          </Routes>
        </Router>       
      </>
    )

  }
}
