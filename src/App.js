import React from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";

export default function App(){
  const [dice, setDice] = React.useState(generateNewDice());
  const [victory, setVictory] = React.useState(false);
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [playAudio, setPlayAudio] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);

  React.useEffect(()=>{
    const allDiceHeld = dice.every(die=> !die.isHeld)
    const firstDiceValue = dice[0].value;
    const allDiceMatched = dice.every(die => die.value===firstDiceValue);

    if(allDiceHeld && allDiceMatched){
      setVictory(true);
    }
  },[dice])

  function dieValueObject(){
    return {
      value: Math.floor((Math.random() * 6) + 1),
      id: nanoid(),
      isHeld: false
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
    if(!victory){
      setDice(prevDice => prevDice.map(die =>{
        return die.isHeld ? die : dieValueObject();
      }))
    }else{
      setDice(generateNewDice());
      setVictory(false);
    }
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die=>{
      return die.id===id? {
        ...die,
        isHeld: !die.isHeld
      }:die
    }))
  }

  function toggleTheme(){
    setDarkTheme(prevState => !prevState)
  }
  function toggleAudio(){
    setPlayAudio(prevState => !prevState)
  }
  function toggleHelpMenu(){
    setShowInfo(prevState => !prevState)
  }

  const dieElements = dice.map(die =>{
    return <Die key={die.id}
              value={die.value}
              theme={darkTheme}
              isHeld={die.isHeld}
              holdDice={()=> holdDice(die.id)} />
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
          <div>Sound: <span onClick={toggleAudio}>{playAudio ? <i className="fa-solid fa-volume-high"></i> : <i className="fa-solid fa-volume-xmark"></i>}</span></div>
          <span onClick={toggleHelpMenu}><i class="fa-solid fa-circle-info"></i></span>{showInfo && <div className="help-menu"><p>Roll untill the dice are the same. Click each die to freeze it at it's current value between rolls.</p></div>}
          <div>Theme: <span onClick={toggleTheme}>{darkTheme ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}</span></div>
        </div>
      </div>
    </div>
  )
}