import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './index.css'
import Start from './Start'
import Setup from './Setup'
import CategoryView from './CategoryView'
import QuestionsView from './QuestionsView'
import EndView from './EndView'
import WinView from './WinView'

function App() {
  const [setup, setSetup] = useState({
    initialized: false,
    done:false,
    numberOfPlayers: "1",
    difficulty: "",
    numberOfRounds: "3"
  })
  const [gameData, setGameData] = useState({
    token:"",
    categories:[],
    index: 0, 
    round: 0,
    questions: []
  })
  const [fetchQuestions, setFetchQuestions] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const [showWinner, setShowWinner] = useState(false)
  const [players, setPlayers] = useState(null)

  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then(res => res.json())
      .then(data => setGameData(prevGameData => ({...prevGameData, token: data.token})))
      .then(fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => setGameData(prevGameData => ({...prevGameData, categories: data.trivia_categories}))))
  }, [])




  function startSetup() {
    setSetup(prevSetup => ({...prevSetup, initialized:true}))
  }

  function handleSetup(event) {
    setSetup(prevSetup => ({...prevSetup, [event.target.name]:event.target.value}))
    console.log(setup)
  }

  function startPlaying() {
    setSetup(prevSetup => ({...prevSetup, done:true}))
    initializePlayers()
  }

  function initializePlayers() {
    let playersArray = [...Array(parseInt(setup.numberOfPlayers))]
    playersArray = playersArray.map(() => {
      const roundsArray = []
      for(let i = 0; i < setup.numberOfRounds; i++)
      {
        roundsArray.push({
          categoryName:"",
          categoryId:"",
          questions:[]
        })
      }
      return {rounds:roundsArray}
    })
    console.log(playersArray)
    setPlayers(playersArray)
  }

  function selectCategory(event) {
    const rounds = players[gameData.index].rounds.map((round, index) => index === gameData.round ? {...round, categoryId:event.target.value, categoryName:event.target.options[event.target.selectedIndex].text} : round)
    setPlayers(prevPlayers => prevPlayers.map((player, index) => index === gameData.index ? {...player, rounds:rounds} : player))
    setFetchQuestions(false)
  }

  function askQuestions() {
    setGameData(prevGameData => ({...prevGameData, questions:[]}))
    setFetchQuestions(true)
  }

  useEffect(() => {
    if(fetchQuestions) {
      fetch(`https://opentdb.com/api.php?amount=5&category=${players[gameData.index].rounds[gameData.round].categoryId}${setup.difficulty ? "&difficulty=" + setup.difficulty : ""}&type=multiple`)
      .then(res => res.json())
      .then(data => setGameData(prevGameData => ({...prevGameData, questions: data.results})))
    }
  }, [fetchQuestions])

  function nextPlayer(object) {
    const rounds = players[gameData.index].rounds.map((round, index) => index === gameData.round ? {...round, questions:object} : round)
    

    console.log(players)
    console.log(gameData.index)
    console.log(gameData.round)

    if(gameData.index+1 === parseInt(setup.numberOfPlayers) && gameData.round+1 == parseInt(setup.numberOfRounds)) 
    {
      console.log("endgame")
      setEndGame(true)
      setPlayers(prevPlayers => prevPlayers.map((player, index) => index === gameData.index ? {...player, rounds:rounds} : player))
      //endGame
    }
    else if(gameData.index+1 === parseInt(setup.numberOfPlayers))
    {
      console.log("newRound")
      setGameData(prevGameData => ({...prevGameData, round:prevGameData.round +1, index:0}))
      setFetchQuestions(false)
      setPlayers(prevPlayers => prevPlayers.map((player, index) => index === gameData.index ? {...player, rounds:rounds} : player))
    }
    else {
      console.log("nexplayer")
      setGameData(prevGameData => ({...prevGameData, index:prevGameData.index+1}))
      setFetchQuestions(false)
      setPlayers(prevPlayers => prevPlayers.map((player, index) => index === gameData.index ? {...player, rounds:rounds} : player))
    }
  }

  function newGame() {
    setGameData(prevGameData => (
      {...prevGameData,
        index: 0, 
        round: 0,
        questions: []
    }))
    initializePlayers()
    resetEndGame()
  }

  function setupGame() {
    setSetup({
      initialized: true,
      done:false,
      numberOfPlayers: "1",
      difficulty: "",
      numberOfRounds: "3"
    })
    resetEndGame()
  }
  
  function resetEndGame() {
    setEndGame(false)
    setShowWinner(false)
    setFetchQuestions(false)
  }

  return (
    <div className="App">
      {!setup.initialized && 
        <Start handleClick={startSetup} />}
      {setup.initialized && !setup.done && 
        <Setup setup={setup} handleChange={handleSetup} handleClick={startPlaying}/>}
      {setup.initialized && setup.done && !fetchQuestions &&
        <CategoryView player={players[gameData.index]} 
          round={gameData.round} 
          index={gameData.index} 
          categories={gameData.categories} 
          handleChange={selectCategory}
          handleClick={askQuestions}/>}
      {setup.initialized && setup.done && fetchQuestions && !gameData.questions &&<div>Loading</div>}
      {setup.initialized && setup.done && fetchQuestions && gameData.questions && gameData.questions.length > 0 
        && !endGame &&
        <QuestionsView questions={gameData.questions} 
          player={players[gameData.index]} 
          handleClick={nextPlayer}
          round={gameData.round} />}
        {setup.initialized && setup.done && endGame && !showWinner &&
          <EndView players={players} handleClick={() => setShowWinner(true)}/>}
        {setup.initialized && setup.done && endGame && showWinner && 
          <WinView players={players} setupGame={setupGame} newGame={newGame}/>}
    </div>
  )
}

export default App
