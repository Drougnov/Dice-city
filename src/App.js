import React from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";

export default function App(){
  const [dice, setDice] = React.useState(generateNewDice());
  const [darkTheme, setDarkTheme] = React.useState(false);

  function dieValueObject(){
    return {
      value: Math.floor((Math.random() * 6) + 1),
      id: nanoid()
    }
  }

  function generateNewDice(){
    let newDice = [];
    for(let i=0; i<15; i++){
      newDice.push(dieValueObject())
    }
    return newDice;
  }

  function rollDice(){
    setDice(generateNewDice())
  }

  function toggleTheme(){
    setDarkTheme(prevTheme => !prevTheme)
  }

  const dieElements = dice.map(die =>{
    return <Die key={die.id}
              value={die.value}
              theme={darkTheme} />
  })

  return(
    <div className={darkTheme ? "dark-mode container":"container"}>
      <div className={darkTheme ? "dark-mode board":"board"}>
        <div className="counter">
          <div className="counter__time">
            <i className="fa-solid fa-stopwatch"></i>
            <span>00:00:00</span>
          </div>
          <div className="counter__roll">
            <i className="fa-solid fa-dice"></i>
            <span>00</span>
          </div>
        </div>
        <div className="die-container">
          {dieElements}
        </div>
        <button className="roll-btn" onClick={rollDice}><i className="fa-solid fa-dice"></i></button>
        <div className="features">
          <div>Sound: <span><i className="fa-solid fa-volume-xmark"></i><i className="fa-solid fa-volume-high"></i></span></div>
          <div>Theme: <span onClick={toggleTheme}>{darkTheme ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}</span></div>
        </div>
      </div>
    </div>
  )
}