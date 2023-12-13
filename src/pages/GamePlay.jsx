import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/gameBoard.css"
import "../css/shipsOnBoard.css"
import "../css/gameplayBoard.css"
import EnemyBoard from "../components/EnemyBoardData";
import { SiFireship  } from "react-icons/si";
import { ImCross  } from "react-icons/im";

const GamePlay = () => {

    const rowGeneration = () => {
        return Array(10).fill(1)
    }
    
    const initializeGameBoard = () => Array.from({ length: 10} , rowGeneration)

    const navigate = useNavigate()
    const direction = useLocation();
    const boardWithShips = new URLSearchParams(direction.search).get('board')
    const shipsPositions = new URLSearchParams(direction.search).get('positions')
    const rearmingBoard = JSON.parse(decodeURIComponent(boardWithShips))

    const [playerBoard, setPlayerBoard] = useState(rearmingBoard)
    const [enemyBoard, setEnemyBoard] = useState(initializeGameBoard)
    const shipPositionsPlayer = JSON.parse(decodeURIComponent(shipsPositions))

    const [cellHitsByEnemy, setCellHitsByEnemy] = useState([])
    const [cellHitsByPlayer, setCellHitsByPlayer] = useState([])
    const [countPlayerHit, setCountPlayerHit] = useState(0)
    const [countEnemyHit, setCountEnemyHit] = useState(0)
    const [countAttack, setCountAttack] = useState(0)

    const [availablePositions, setAvailablePositions] = useState([]);

    useEffect(() => {
        const positions = [];
        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                positions.push({ row, column });
            }
        }
    
        shuffleArray(positions);
        setAvailablePositions(positions);
    }, []);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const restartGame = () => {
        navigate("/home")
    }


    const disabledApplied = (row, column) => {
        return countPlayerHit === 14 || countEnemyHit === 14 || (cellHitsByPlayer.some((hit) => hit.row === row && hit.column === column))
    }

    const takeDirection = (shipLength) => {
        const shipData = shipPositionsPlayer.find(ship => ship.ship === shipLength)
        return shipData ? shipData.verticalShip : false
    }

    const handleCPUAttack = () => {

        const {row, column} = availablePositions[countAttack]
       
        if (playerBoard[row][column] != 1) {
            setCountEnemyHit((countEnemyHit) => countEnemyHit + 1)
        }
        console.log('Actual hits by enemy:', countEnemyHit)
        setCellHitsByEnemy([...cellHitsByEnemy, {row,column}])

        setCountAttack((countAttack) => countAttack + 1)
        console.log("Remaining pos: ", availablePositions)
    }


    const handleClickAttack = (cell, row, column) => {
        console.log('Value on:', cell)
        if (enemyBoard[row][column] != 1) {
            setCountPlayerHit((countPlayerHit) => countPlayerHit + 1)
        }
        setCellHitsByPlayer([...cellHitsByPlayer, { row, column }]);

        console.log('Actual hits by player:', countPlayerHit)
        handleCPUAttack()
    }


    const renderAttackPlayer = (row, column) => {
        if (cellHitsByPlayer.some((hit) => hit.row === row && hit.column === column)) {
            return enemyBoard[row][column] === 1 ? (
                <ImCross className="water-hit"/>
            ) : (
                <SiFireship className="ship-hit"/>
            );
        }
        return null
    }

    const renderAttackCPU = (row, column) => {
        if (cellHitsByEnemy.some((hit) => hit.row === row && hit.column === column)) {
            return playerBoard[row][column] === 1 ? (
                <ImCross className="water-hit"/>
            ) : (
                <SiFireship className="ship-hit"/>
            );
        }
        return null
    }


    return (
        <div>
            <EnemyBoard setEnemy={setEnemyBoard}/>
            <h2 className="title-gameplay">Derriba los cuatro barcos del enemigo antes que el CPU derribe los tuyos</h2>
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
                                    onClick={() => handleClickAttack(cell,rowIndex, index) } 
                                    disabled={disabledApplied(rowIndex,index)}
                                    className="cell-enemy">
                                    {renderAttackPlayer(rowIndex, index)}
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
                                    <div className="hitIcon">
                                        {renderAttackCPU(rowIndex, index)}
                                    </div>
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

            {countPlayerHit >= 14 ?
            <div className="final-result">
                <p className="result" >GANASTE</p>
                <button onClick={() => restartGame()} className="button-end">JUGAR DE NUEVO</button>
            </div>
            :<></>}
            {countEnemyHit >= 14 ?
            <div className="final-result">
                <p className="result">PERDISTE</p>
                <button onClick={() => restartGame()} className="button-end">JUGAR DE NUEVO</button>
            </div>
            :<></>}
        </div>
    )
}

export default GamePlay
