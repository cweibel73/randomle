
import './App.css';
import { React, useState } from "react";
import Button from './Button'
import Letter from './Letter'
import { words } from './Words'
const first = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const second = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
const third = ["Z", "X", "C", "V", "B", "N", "M"]
let tempArr
let counter = 0
let bigArr = []
let word = words[Math.floor(Math.random() * words.length)].toUpperCase()
const notSel = { color: 'white', background: 'grey' }
const reg = { color: 'black', background: 'white' }
const correct = { color: 'white', background: 'green' }
const somewhere = { color: 'white', background: 'orange' }


function App() {
    const [over, setOver] = useState(false)
    const [win, setWin] = useState(false)
    const [wins, setWins] = useState(0)
    const [losses,setLosses] = useState(0)
    const [wordArr0, setWordArr0] = useState([...' '.repeat(word.length)])
    const [wordArr1, setWordArr1] = useState([...' '.repeat(word.length)])
    const [wordArr2, setWordArr2] = useState([...' '.repeat(word.length)])
    const [wordArr3, setWordArr3] = useState([...' '.repeat(word.length)])
    const [wordArr4, setWordArr4] = useState([...' '.repeat(word.length)])
    const [wordArr5, setWordArr5] = useState([...' '.repeat(word.length)])
    const [ones, setOnes] = useState(0)
    const [twos, setTwos] = useState(0)
    const [threes, setThrees] = useState(0)
    const [fours, setFours] = useState(0)
    const [fives, setFives] = useState(0)
    const [sixes, setSixes] = useState(0)
    const [index, setIndex] = useState(0)
    const [result, setResult] = useState("")
    const [current, setCurrent] = useState([...' '.repeat(word.length)])
    const sel = [setWordArr0, setWordArr1, setWordArr2, setWordArr3, setWordArr4, setWordArr5]
    const arrs = [wordArr0, wordArr1, wordArr2, wordArr3, wordArr4, wordArr5]
    const numArr = [null, setOnes, setTwos, setThrees, setFours, setFives, setSixes]
   
    function handleClick(e) {     
        if (index < word.length) {
            clicked(arrs[counter],e,counter)
            setIndex(prev => prev + 1)  
        }    
    }
    
    function handleBack() {
        if (index > 0) {
            backed(arrs[counter],counter)
            setIndex(prev => prev - 1)
        }
    }

    function clicked(arr, e, num) {
        tempArr = [...arr]
        tempArr[index] = e
        sel[num](tempArr)
        setCurrent(tempArr)
    }

    function backed(arr, num) {
        tempArr = [...arr]
        tempArr[index - 1] = ' '
        sel[num](tempArr)
        setCurrent(tempArr)
    }
    function handleSubmit(e) {
        e.preventDefault()
         if (current !== [...' '.repeat(word.length)]) {
             fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${current.join('')}`)
                 .then(res => res.json())
                 .then(data => !data[0] ? alert("That is not in the word list") :
                     data[0].word.toUpperCase() === word ? (bigArr.push(current),counter++,setResult("You solved it!!"),
                         setOver(true),setWin(true),setWins(prev => prev+1), numArr[counter](prev => prev+1)) :
                         data[0].word.length < word.length ? alert('That word is too short') :
                         (bigArr.push(current), counter++, setIndex(0)))

         }
        
        setCurrent([...' '.repeat(word.length)])
        if (counter === 5 && !win) {
            setLosses(prev => prev+1)
        }   
    }

    function looper(arr,num) {
        return (
            <div className="words">{arr.map((item, i) =>
                <Letter style={counter < num ? reg :
                    word[i] === item ? correct :
                        word[i] !== item && word.split('').includes(item)&&
                        (word.split('').filter(x => x === item).length === arr.filter(x => x === item).length ||
                            arr.indexOf(item) === i && (arr.slice(i+1).indexOf(item) !== word.split('').slice(i+1).indexOf(item)))?
                            somewhere : notSel}>{item}</Letter>)}
            </div>
             ) 
    }

    function keys(arr) {
        return (
            arr.map(item => <Button value={item} className="keys"
                style={bigArr.some(x => x.includes(item) && (x.indexOf(item) === word.split('').indexOf(item))) ? correct :
                    word.split('').includes(item) && bigArr.flat().includes(item) ? somewhere :
                        bigArr.flat().includes(item) ? notSel : reg} onClick={(e) => handleClick(e.target.value)}></Button>)
             ) 
    }

    function replay() {
        word = words[Math.floor(Math.random() * words.length)].toUpperCase()
        setOver(false)
        setWin(false)
        setResult('')
        counter = 0
        bigArr = []
        setIndex(0)
        setCurrent([...' '.repeat(word.length)])
        setWordArr0([...' '.repeat(word.length)])
        setWordArr1([...' '.repeat(word.length)])
        setWordArr2([...' '.repeat(word.length)])
        setWordArr3([...' '.repeat(word.length)])
        setWordArr4([...' '.repeat(word.length)])
        setWordArr5([...' '.repeat(word.length)])    
    }
    
    return (
        <window onKeyDown={(e) => e.key === 'Enter' ? handleSubmit(e) :
          e.key==="Backspace"?handleBack(e):handleClick(e.key[0].toUpperCase())}>
            <div className="App">
                <p>Wins: {wins} </p>
                <button onClick={() => alert(`1s: ${ones}
2s: ${twos}
3s: ${threes}
4s: ${fours}
5s: ${fives}
6s: ${sixes}`)}>Win Stats</button>
                <p>Losses: {losses}</p>
          <h1>{result}</h1>
          <p>{win ? `${counter}/6` : ''}</p>
                <p>{counter > 5 ? word : ''}</p>
          <button autoFocus onClick={replay}>Play Again</button>
                <div className="attempts">
                    {looper(wordArr0, 1)}
                    {looper(wordArr1, 2)}
                    {looper(wordArr2, 3)}
                    {looper(wordArr3, 4)}
                    {looper(wordArr4, 5)}
                    {looper(wordArr5, 6)}  
                </div>
                {keys(first)}
                <br/>
                {keys(second)}
                <br />
                <button onClick={handleSubmit}>Enter</button>
                {keys(third)}
          {over ?
              <button className="keys" value="x" style={{ background: 'grey' }} disabled>x</button> :
              <button className="keys" value="x" onClick={handleBack} style={{ background: 'grey' }} >x</button>}
            </div>
            </window>
  );
}

export default App;
