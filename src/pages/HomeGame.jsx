import { useState, useEffect } from "react"
import "../css/gameBoard.css"
import "../css/shipsOnBoard.css"
import SelectionShipSection from "../components/SelectionShip"
import { useNavigate } from "react-router-dom"

const HomeGame = () => {

    const rowGeneration = () => {
        return Array(10).fill(1)
    }

    const initializeGameBoard = () => {
        const boardInitial = Array.from({ length: 10} , rowGeneration)
        return boardInitial
    }

    const navigate = useNavigate()
    const [board, setBoard] = useState(initializeGameBoard())
    const [positionedShips, setPositionedShips] = useState([])
    const [shipSelectioned, setShipSelectioned] = useState('')
    const [shipPositions, setShipsPositions] = useState([])
    const [verticalShip, setVerticalShip] = useState(true)
    const [fitError, setFitError] = useState(false)


    const addShipPositioned = (lengthShip) => {
        setPositionedShips([...positionedShips, lengthShip])
        document.removeEventListener('keypress', handleKeyPress)
        setVerticalShip(true)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'f') {
            setVerticalShip((verticalShip) => !verticalShip)
        }
    }

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
    }, [])

    // Función que determina si hay espacio en el barco según limitaciones del tablero
    const checkSpaceForShip = (shipLength, row, column) => {
        if (verticalShip) {
            return row + (shipLength - 1) < 10
        } else {
            return column + (shipLength - 1) < 10 
        }
    }

    // Funcion que determina si se encuentra un barco o más en las celdas que ocuparía el nuevo barco
    const checkFreeSpaceForShip = (shipLength, row, column) => {
        if (verticalShip) {
            const sectionToCheck = board.slice(row, row + shipLength)
            return sectionToCheck.every(row => row[column] === 1)
        } else {
            var rowToCheck = board[row]
            rowToCheck = rowToCheck.slice(column, column + shipLength)
            return rowToCheck.every(cell => cell === 1)
        }
    }

    // Funciones que posicionan una porción del barco provisto según su orientación y la celda revisada
    const assignShipToCellX = (curBoard, rowIndex, row, columnIndex, column, shipLength) => {
        if (row == rowIndex && column === columnIndex) {
            return shipLength
        } else if (row == rowIndex && column < columnIndex && columnIndex < (column + shipLength)) {
            return shipLength + 0.5
        }else{
            return curBoard[rowIndex][columnIndex];
        }
    }

    const assignShipToCellY = (curBoard, rowIndex, row, columnIndex, column, shipLength) => {
        if (column === columnIndex && row === rowIndex) {
            return shipLength
        } else if (column === columnIndex && row < rowIndex && rowIndex < (row + shipLength)) {
            return shipLength + 0.5
        } else {
            return curBoard[rowIndex][columnIndex];
        }
    } 

    const updateBoard = (actualBoard, ship, row, column) => {
        const updatingBoard = actualBoard.map((r, rowIndex) => {
            return r.map((cell, columnIndex) => {
                if (verticalShip) {
                    return assignShipToCellY(actualBoard, rowIndex, row, columnIndex, column, ship)
                } else {
                    return assignShipToCellX(actualBoard, rowIndex, row, columnIndex, column, ship)
                }
            })
        })
        return updatingBoard
    }

    const takeDirection = (shipLength) => {
        const shipData = shipPositions.find(ship => ship.ship === shipLength)
        return shipData ? shipData.verticalShip : false
    }

    // Función principal para posicionar barcos
    const handleBlockClick = (row, column) => {
        if(shipSelectioned) {
            const checkingShipFits = checkSpaceForShip(shipSelectioned, row, column)

            if (checkingShipFits && checkFreeSpaceForShip(shipSelectioned, row, column)) {
                const newestShipPosition = [...shipPositions, {ship: shipSelectioned, row, column, verticalShip}]
                setShipsPositions(newestShipPosition)
                
                const updatedBoard = updateBoard(board, shipSelectioned, row, column)
                setBoard(updatedBoard)
                setFitError(false)
                addShipPositioned(shipSelectioned)
                setShipSelectioned('')
            } else {
                setFitError(true)
            }
        } 
    }

    const gameStart = () => {
        const boardToString = JSON.stringify(board);
        const positionsToString = JSON.stringify(shipPositions);
        navigate(`/gameplay?board=${encodeURIComponent(boardToString)}&positions=${encodeURIComponent(positionsToString)}`)
    }

    return (
        <div className="interface-screen">
            <h2 className="title-game">Coloque los barcos del recuadro en el tablero</h2>
            <h3 className="subtitle-game">Presione la tecla 'f' para cambiar la orientación del barco a colocar</h3>
            <div className="screen-initial">
                <SelectionShipSection onPositionedShip={setShipSelectioned} positionedShips={positionedShips} verticalPos={verticalShip}/>
                <div className="game-board">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, columnIndex) => (
                                <button
                                    key={`${rowIndex}-${columnIndex}`}
                                    onClick={() => handleBlockClick(rowIndex, columnIndex)}
                                    className="cell">
                                    
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
            {fitError ? 
                <p style={{color:'black', fontSize:'18px'}}>No hay espacio para el barco o hay un barco bloqueando el paso</p> 
                : <></>}
            <div>
                {positionedShips.length === 4 ?
                <button onClick={() => gameStart() } className="button-try"> Iniciar partida </button>
                :
                <></>
                }
            </div> 
        </div>
        
    )
}

export default HomeGame