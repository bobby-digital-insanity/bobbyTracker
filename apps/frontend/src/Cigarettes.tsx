import { useNavigate } from 'react-router-dom'
import './Cigarettes.css'

function Cigarettes() {
  const navigate = useNavigate()

  return (
    <div className="cigarettes-page">
      <div className="content-overlay">
        <h1>🚬 Cigarettes 🚬</h1>
        <p>You love cigarettes!</p>
        <button onClick={() => navigate('/')} className="back-button">
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Cigarettes

