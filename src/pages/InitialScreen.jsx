import { useNavigate } from "react-router-dom"
import "../css/initialScreen.css"

const InitialScreen = () => {

    const navigation = useNavigate()

    const moveToSelectionBoard = () => {
        navigation("/home")
    }

    return (
        <div className="initial-screen" style={{
            backgroundImage : `url(./src/assets/main-image.jpeg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100vh',
            }}>
            <div className="title-section">
                <h1 className="title">BATALLA NAVAL</h1>
                <button className="button-begin" onClick={() =>moveToSelectionBoard()}> JUGAR</button>
            </div>
        </div>
    )

}

export default InitialScreen