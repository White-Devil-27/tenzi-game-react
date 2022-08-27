import React, { useEffect } from 'react';
import './App.css';
import Die from "./Components/Die"
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dice,setDice] = useState(() => allNewDice())
  const [tenzies,setTenzies] = useState(() => false )

  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const sameValue = dice[0].value
    const allSameValue = dice.every(die => die.value===sameValue)
    if (allHeld && allSameValue ){
       setTenzies(true)
      //  console.log("You Won")
    }
  },[dice])

  function allNewDice(){
    const newDice = []
    for(let i = 1 ; i <= 10 ; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function generateNewDie(){
      return {
        value : Math.ceil(Math.random() * 6), 
        isHeld : false,
        id : nanoid()
      }
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ? die : generateNewDie()
      }))
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld : !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(dice => {
  return <Die key = {dice.id} value = {dice.value} isHeld={dice.isHeld} toggle={()=>holdDice(dice.id)} /> 
  })

  return (
    <main>
      {tenzies && <Confetti /> }
      <div className='container col-sm-7 main mt-5'>
        <h1 className='text-center'>Tenzies</h1>
        <p className='text-center'>Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
        {tenzies && <h4 className='text-center text-info'>You Won !</h4>}
        <div className='col-sm-12'>
          <div className='row'>
              {diceElements}
          </div>
        </div><br/><br/>
        <div className='col-sm-12 text-center roll'>
          <button className='col-sm-3 btn btn-primary' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </div>
      </div>
    </main>
  )
}

export default App; 
