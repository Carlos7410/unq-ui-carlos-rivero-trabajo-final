import { useState } from "react"
import "./css/gameBoard.css"

const HomeGame = () => {

    const rowGeneration = () => {
        return Array(10).fill(0)
    }

    const initializeGameBoard = () => {
        const boardInitial = Array.from({ length: 10} , rowGeneration)
        console.log(boardInitial)
        return boardInitial
    }

    const [board, setBoard] = useState(initializeGameBoard())

    const handleBlockClick = (row, column) => {
        console.log("Nothing yet " + row + " - " + column)
    }

    return (
        <div className="interface-screen">
            <div className="screen-initial">
                <div className="game-board">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleBlockClick(rowIndex, index)}
                                    className="cell">
                                    Ship #1
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="game-board">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleBlockClick(rowIndex, index)}
                                    className="cell-enemy">
                                    Ship #2
                                </button>
                            ))}
                        </div>
                    ))}
                </div>                  
            </div>
            
        </div>
        
    )
}

export default HomeGame