import { useState, useEffect } from 'react'
import MiniShip from './MiniShip'
import '../css/gameSelection.css'


const SelectionShipSection = ({onPositionedShip, positionedShips, verticalPos}) => {

    const [selectedShip, setSelectedShip] = useState('')
    const [miniShipPosition, setMiniShipPosition] = useState({ x : 0, y : 0})

    const handleShipClick = (shipLength, event) => {
        setSelectedShip(shipLength)
        onPositionedShip(shipLength) 

        document.addEventListener('mousemove', handleMouseMove);
    }

    const handleMouseMove = (event) => {
      const x = event.clientX +5;
      const y = event.clientY +5;
      setMiniShipPosition({ x , y });
    };


    useEffect(() => {
      console.log('positionedShips:', positionedShips);
      console.log('selectedShip:', selectedShip);
      if (positionedShips.includes(selectedShip)) {
        document.removeEventListener('mousemove', handleMouseMove);
        setSelectedShip('')
        console.log('selectedShip:', selectedShip);
      }
    }, [positionedShips]);


    return (
        <>
          <div className='selection-box'>
            <p style={{fontWeight: 'bold', fontSize: 20}}>Barcos a colocar</p>

            <div className='up-row-selection'>
              <img src='./src/assets/warship-[2].png' alt='2' 
                  className={`image-ship2 ${positionedShips.includes(2) ? 'positioned' : ''} ${selectedShip === 2 ? 'selected':''}`}
                  onClick={(event) => handleShipClick(2, event)}/>
              <img src='./src/assets/warship-[3].png' alt='3' 
                  className={`image-ship3 ${positionedShips.includes(3) ? 'positioned' : ''} ${selectedShip === 3 ? 'selected':''}`}
                  onClick={(event) => handleShipClick(3, event)}/>
            </div>

            <div className='down-row-selection'>
              <img src='./src/assets/warship-[5].png' alt='5' 
                  className={`image-ship5 ${positionedShips.includes(5) ? 'positioned' : ''} ${selectedShip === 5 ? 'selected':''}`}
                  onClick={(event) => handleShipClick(5, event)}/>
              <img src='./src/assets/warship-[4].png' alt='4' 
                  className={`image-ship4 ${positionedShips.includes(4) ? 'positioned' : ''} ${selectedShip === 4 ? 'selected':''}`}
                  onClick={(event) => handleShipClick(4, event)}/>
            </div>
            {selectedShip && <MiniShip shipLength={selectedShip} position={miniShipPosition} verticalPosition={verticalPos}/>}
          </div>
        </>
    )
}

export default SelectionShipSection