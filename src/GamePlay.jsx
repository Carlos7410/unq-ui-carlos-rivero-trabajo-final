import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/gameBoard.css"
import "./css/shipsOnBoard.css"
import "./css/gameplayBoard.css"
import EnemyBoard from "./components/EnemyBoardData";

const GamePlay = () => {

    const rowGeneration = () => {
        return Array(10).fill(1)
    }
    
    const initializeGameBoard = () => Array.from({ length: 10} , rowGeneration)


    const direction = useLocation();
    const boardWithShips = new URLSearchParams(direction.search).get('board')
    const shipsPositions = new URLSearchParams(direction.search).get('positions')
    const rearmingBoard = JSON.parse(decodeURIComponent(boardWithShips))

    const [playerBoard, setPlayerBoard] = useState(rearmingBoard)
    const [enemyBoard, setEnemyBoard] = useState(initializeGameBoard)
    const [shipPositionsPlayer, setShipsPositionsPlayer] = useState(JSON.parse(decodeURIComponent(shipsPositions)))
    const [attackedPositions, setAttackedPositions] = useState([])
    const [countPlayerHit, setCountPlayerHit] = useState(0)
    const [countEnemyHit, setCountEnemyHit] = useState(0)

    const getRandomNumberRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    


    ///-----------------------------------------------------------------------


    const takeDirection = (shipLength) => {
        const shipData = shipPositionsPlayer.find(ship => ship.ship === shipLength)
        return shipData ? shipData.verticalShip : false
    }

    const handleClickAttack = (cell, row, column) => {
        console.log('Value on:', cell)
        //if (enemyBoard[row][column] != 1) {
        //    setCountPlayerHit((countPlayerHit) => countPlayerHit + 1)
        //}
        // Marcar celda golpeada ya sea de agua o barco
        handleCPUAttack()
    }

    const handleCPUAttack = () => {

        let rowChosen = getRandomNumberRange(0,9)
        let columnChosen = getRandomNumberRange(0,9)
        // Marcar celda golpeada por IA 
        setAttackedPositions([...attackedPositions, [rowChosen,columnChosen]])
    }

    return (
        <div>
            <EnemyBoard setEnemy={setEnemyBoard}/>
            <div className="additional-info">
                <p className="info-board">Tablero enemigo al que atacar</p>
                <p className="info-board">Tu tablero a resistir los ataques</p>
            </div>
            
            <div className="screen-initial">
                <div className="game-board">
                    {enemyBoard.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleClickAttack(cell,rowIndex, index)}
                                    className="cell-enemy">
                                    #
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="game-board">
                    {playerBoard.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, index) => (
                                <button
                                    key={index}
                                    className="cell-ally">
                                    {cell && [2,3,4,5].includes(cell) ? <img 
                                        src={`./src/assets/warship-[${cell}].png`} alt={`ship-`} 
                                        className={`ship-${cell} ${takeDirection(cell) ? 'vertical': 'horizontal'}`}/>
                                        : 
                                        <></>}
                                </button>
                            ))}
                        </div>
                    ))}
                </div> 
            </div>
            
            <div className="separation-button">
                <button onClick={() => console.log(enemyBoard) } className="button-try"> Enemy board</button>
                <button onClick={() => console.log(playerBoard) } className="button-try"> Player board</button>
            </div> 
        </div>
    )
}

export default GamePlay
