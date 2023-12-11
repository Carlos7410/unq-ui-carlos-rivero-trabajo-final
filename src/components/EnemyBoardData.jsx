import { useEffect, useState } from "react"

const EnemyBoard = ({setEnemy}) => {

    const rowGeneration = () => {
        return Array(10).fill(1)
    }
    
    const initializeGameBoard = () => Array.from({ length: 10} , rowGeneration)
    const [enemyBoard, setEnemyBoard] = useState(initializeGameBoard)
    const remainingShips = [2,3,4,5]

    const getRandomNumberRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    
    const checkSpaceForShip = (shipLength, row, column) => {
        return column + (shipLength - 1) < 10  
    }
    
    const checkFreeSpaceForShip = (board, shipLength, row, column) => {
        var rowToCheck = board[row].slice(column, column + shipLength)
        return rowToCheck.every(cell => cell === 1)
        
    }
    const assignShipToCellX = (curBoard, rowIndex, row, columnIndex, column, shipLength) => {
        if (row == rowIndex && (column <= columnIndex) && columnIndex < (column + shipLength)) {
            return shipLength
        }else{
            return curBoard[rowIndex][columnIndex];
        }
    }
    
    const generateEnemyBoard = () => {
        
        let updatedBoard = [...enemyBoard];
        for (let i = 0; i < remainingShips.length; i++) {
            
            const actualShip = remainingShips[i]
            let validPosition = false
            let rowChosen
            let columnChosen
            while (!validPosition) {
                rowChosen = getRandomNumberRange(0,9)
                columnChosen = getRandomNumberRange(0,8)

                validPosition = checkSpaceForShip(actualShip,rowChosen, columnChosen) 
                                && checkFreeSpaceForShip(updatedBoard, actualShip,rowChosen, columnChosen)
            }
            updatedBoard = updatedBoard.map((r, rowIndex) => {
                return r.map((cell, columnIndex) => {
                        return assignShipToCellX(updatedBoard, rowIndex, rowChosen, columnIndex, columnChosen, actualShip)
                })
            })
            setEnemy(updatedBoard) 

        }
    }    

    useEffect(() => {
        generateEnemyBoard()
    }, []);
    

}


export default EnemyBoard
