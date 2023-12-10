import "../css/gameSelection.css"

const MiniShip = ({ shipLength, position, verticalPosition }) => {

    return (
        <img src={`./src/assets/warship-[${shipLength}].png`}
             alt={`ship-${shipLength.toString()}`}
             className={`mini-ship ${verticalPosition ? 'vertical' : 'horizontal'}`}
             style={{ left: position.x, top: position.y }}/>
    )
    
}

export default MiniShip