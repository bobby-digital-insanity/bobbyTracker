import { useState } from 'react'
import './App.css'

function App() {
  // State for each input section
  const [inputValues, setInputValues] = useState(['', '', '', '', '', ''])
  const [focusedStates, setFocusedStates] = useState([false, false, false, false, false, false])
  const [tableColors, setTableColors] = useState<string[][]>(Array(6).fill(Array(10).fill('')))

  const updateInputValue = (index: number, value: string) => {
    const newValues = [...inputValues]
    newValues[index] = value
    setInputValues(newValues)
  }

  const updateFocusedState = (index: number, isFocused: boolean) => {
    const newStates = [...focusedStates]
    newStates[index] = isFocused
    setFocusedStates(newStates)
  }

  const handleSubmit = async (sectionIndex: number) => {
    try {
      // Use Render URL in production, localhost in development
      const API_URL = import.meta.env.PROD 
        ? 'https://bobby-tracker-backend.onrender.com'
        : 'http://localhost:3000';
      
      const response = await fetch(`${API_URL}/api/randomizeColors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      
      // Update the colors for this specific section
      const newTableColors = [...tableColors]
      newTableColors[sectionIndex] = data.colors
      setTableColors(newTableColors)
    } catch (error) {
      console.error('Error fetching colors:', error)
    }
  }

  // Generate array of 10 columns for the table
  const tableColumns = Array.from({ length: 10 })

  // Format current date as "Thursday October 9th 2025"
  const formatDate = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return now.toLocaleDateString('en-US', options)
  }

  return (
    <>
      <div>
      </div>
      <h1>Bobby Tracker V1</h1>
      <p className="current-date">{formatDate()}</p>
      <p>Streak: 0
      </p>
      
      {/* Section 1 */}
      <div>
        <table className="tracker-table">
          <tbody>
            <tr>
              {tableColumns.map((_, index) => (
                <td 
                  key={index} 
                  className={`table-cell table-cell-${index + 1}`}
                  style={{ backgroundColor: tableColors[0]?.[index] || '' }}
                >
                  {index + 1}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <section className="card">
          {/* First button: Static text "Sleep" */}
          <button disabled className="static-button">
            Sleep
          </button>
          
          {/* Second button: Text input with placeholder 0 that disappears when typing */}
          <input 
            type="number" 
            value={inputValues[0]} 
            onChange={(e) => updateInputValue(0, e.target.value)}
            onFocus={() => updateFocusedState(0, true)}
            onBlur={() => updateFocusedState(0, false)}
            placeholder={focusedStates[0] ? "" : "0"}
            className="input-button"
          />
          
          {/* Third button: Submit button */}
          <button onClick={() => handleSubmit(0)} className="submit-button">
            Submit
          </button>
        </section>
      </div>

      {/* Section 2 */}
      <div>
        <table className="tracker-table">
          <tbody>
            <tr>
              {tableColumns.map((_, index) => (
                <td 
                  key={index} 
                  className={`table-cell table-cell-${index + 1}`}
                  style={{ backgroundColor: tableColors[1]?.[index] || '' }}
                >
                  {index + 1}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <section className="card">
          <button disabled className="static-button">
            Food
          </button>
          <input 
            type="number" 
            value={inputValues[1]} 
            onChange={(e) => updateInputValue(1, e.target.value)}
            onFocus={() => updateFocusedState(1, true)}
            onBlur={() => updateFocusedState(1, false)}
            placeholder={focusedStates[1] ? "" : "0"}
            className="input-button"
          />
          <button onClick={() => handleSubmit(1)} className="submit-button">
            Submit
          </button>
        </section>
      </div>

      {/* Section 3 */}
      <div>
        <table className="tracker-table">
          <tbody>
            <tr>
              {tableColumns.map((_, index) => (
                <td 
                  key={index} 
                  className={`table-cell table-cell-${index + 1}`}
                  style={{ backgroundColor: tableColors[2]?.[index] || '' }}
                >
                  {index + 1}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <section className="card">
          <button disabled className="static-button">
            Social
          </button>
          <input 
            type="number" 
            value={inputValues[2]} 
            onChange={(e) => updateInputValue(2, e.target.value)}
            onFocus={() => updateFocusedState(2, true)}
            onBlur={() => updateFocusedState(2, false)}
            placeholder={focusedStates[2] ? "" : "0"}
            className="input-button"
          />
          <button onClick={() => handleSubmit(2)} className="submit-button">
            Submit
          </button>
        </section>
      </div>

      {/* Section 4 */}
      <div>
        <table className="tracker-table">
          <tbody>
            <tr>
              {tableColumns.map((_, index) => (
                <td 
                  key={index} 
                  className={`table-cell table-cell-${index + 1}`}
                  style={{ backgroundColor: tableColors[3]?.[index] || '' }}
                >
                  {index + 1}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <section className="card">
          <button disabled className="static-button">
            Gym
          </button>
          <input 
            type="number" 
            value={inputValues[3]} 
            onChange={(e) => updateInputValue(3, e.target.value)}
            onFocus={() => updateFocusedState(3, true)}
            onBlur={() => updateFocusedState(3, false)}
            placeholder={focusedStates[3] ? "" : "0"}
            className="input-button"
          />
          <button onClick={() => handleSubmit(3)} className="submit-button">
            Submit
          </button>
        </section>
      </div>

      {/* Section 5 */}
      <div>
        <table className="tracker-table">
          <tbody>
            <tr>
              {tableColumns.map((_, index) => (
                <td 
                  key={index} 
                  className={`table-cell table-cell-${index + 1}`}
                  style={{ backgroundColor: tableColors[4]?.[index] || '' }}
                >
                  {index + 1}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <section className="card">
          <button disabled className="static-button">
            Learning
          </button>
          <input 
            type="number" 
            value={inputValues[4]} 
            onChange={(e) => updateInputValue(4, e.target.value)}
            onFocus={() => updateFocusedState(4, true)}
            onBlur={() => updateFocusedState(4, false)}
            placeholder={focusedStates[4] ? "" : "0"}
            className="input-button"
          />
          <button onClick={() => handleSubmit(4)} className="submit-button">
            Submit
          </button>
        </section>
      </div>

      {/* Section 6 */}
      <div>
        <table className="tracker-table">
          <tbody>
            <tr>
              {tableColumns.map((_, index) => (
                <td 
                  key={index} 
                  className={`table-cell table-cell-${index + 1}`}
                  style={{ backgroundColor: tableColors[5]?.[index] || '' }}
                >
                  {index + 1}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <section className="card">
          <button disabled className="static-button">
            Work
          </button>
          <input 
            type="number" 
            value={inputValues[5]} 
            onChange={(e) => updateInputValue(5, e.target.value)}
            onFocus={() => updateFocusedState(5, true)}
            onBlur={() => updateFocusedState(5, false)}
            placeholder={focusedStates[5] ? "" : "0"}
            className="input-button"
          />
          <button onClick={() => handleSubmit(5)} className="submit-button">
            Submit
          </button>
        </section>
      </div>
    </>
  )
}

export default App
