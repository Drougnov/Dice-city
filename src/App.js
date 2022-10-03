import React from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";

export default function App(){
  const [dice, setDice] = React.useState(generateNewDice());
  const [victory, setVictory] = React.useState(false);
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [playAudio, setPlayAudio] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [timerActive, setTimerActive] = React.useState(false);

  React.useEffect(()=>{
    const someDiceHeld = dice.some(die=> die.isHeld);
    const allDiceHeld = dice.every(die=> die.isHeld);
    const firstDiceValue = dice[0].value;
    const allDiceMatched = dice.every(die => die.value===firstDiceValue);
    
    if(someDiceHeld && !allDiceHeld){
      setTimerActive(true);
    }

    if(allDiceHeld && allDiceMatched){
      setVictory(true);
      setTimerActive(false);
    }

    let interval;
    if(timerActive){
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 10);
      }, 10);
    }else if(!timerActive){
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[dice,timerActive])

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
      setRollCount(count=> count + 1);
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

  function startNewGame(){
    setVictory(false);
    setDice(generateNewDice());
    setRollCount(0);
    setTimer(0)
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

  function formattedRollCount(count){
    return ('0'+count).slice(-2);
  }

  function formattedTime(time){
    const formattedMinute = ("0" + Math.floor((timer / 60000) % 60)).slice(-2)
    const formattedSecond = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
    const formattedMilliSecond = ("0" + ((time / 10) % 100)).slice(-2)

    return `${formattedMinute} : ${formattedSecond} : ${formattedMilliSecond}`
  }

  function calculateScore(count,time){
    return Math.round(((1/count)+(1/time))*100000);
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
            <span>{formattedTime(timer)}</span>
          </div>
          <div className="counter__roll">
            <i className="fa-solid fa-dice"></i>
            <span>{formattedRollCount(rollCount)}</span>
          </div>
        </div>
        <div className="die-container">
          {dieElements}
        </div>
        <button className="roll-btn" onClick={rollDice}><i className="fa-solid fa-dice"></i></button>
        <div className="features">
          <div>Sound: <span onClick={toggleAudio}>{playAudio ? <i className="fa-solid fa-volume-high"></i> : <i className="fa-solid fa-volume-xmark"></i>}</span></div>
          <span onClick={toggleHelpMenu}><i className="fa-solid fa-circle-info"></i></span>{showInfo && <div className="help-menu"><p>Roll untill the dice are the same. Click each die to freeze it at it's current value between rolls.</p></div>}
          <div>Theme: <span onClick={toggleTheme}>{darkTheme ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}</span></div>
        </div>
        {victory && 
          <div className="score-board">
            <h2>Congratulations!</h2>
            <p>You scored: <span>{calculateScore(rollCount,timer)}</span></p>
            <p>High Score: <span>0000</span></p>
            <button onClick={startNewGame}>New Game</button>
          </div>
        }
      </div>
    </div>
  )
}