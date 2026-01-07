import React from "react"
import { languages } from "./data/languages.js"
import {utils} from "./data/utils.js"
import clsx from 'clsx';


export default function Hangman() {
    const [word, setWord] = React.useState("REACT")

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const [guessedLetters, setGuessedLetters] = React.useState([''])

    const wrongGuesses = guessedLetters.filter(letter => !word.toLowerCase().includes(letter)).length

    const isGameWon = word.split("").every(letter => guessedLetters.includes(letter.toLowerCase()))

    const isGameLost = wrongGuesses >= languages.length - 1

    console.log(wrongGuesses)

    function handleLetterClick(letter) {
        setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    }

    const gameStatus = clsx("gameStatus", {
        won: isGameWon && !isGameLost,
        lost: isGameLost && !isGameWon
    })

    const statusTextTop = isGameWon ? "You Win!" : isGameLost ? "Game Over!" : "Game Over!"

    const statusTextBottom = isGameWon ? "Well Done 🎉" : isGameLost ? "You lose! Better start learning Assembly 😭" : "You lose! Better start learning Assembly 😭"

    return (
        <main>
            <header>
                <h1>Assembley:Endgame</h1>
                <h3>Guess the word in under 8 attempts to keep the programming world safe from Assembly</h3>
            </header>


            <section className={gameStatus}>
                <h3>{statusTextTop}</h3>
                <p>{statusTextBottom}</p>
            </section>

            <div className="languageContainer">
                <section className="languageList">
                    {languages.map((language, index) => {
                        const className = clsx("language", (index < wrongGuesses && index < languages.length - 1) && "lost")
                        return (
                            <div key={language.name} className={className} style={{ backgroundColor: language.backgroundColor, color: language.color }}> {language.name} </div>
                        )
                    })}
                </section>
            </div>


            <section className="word">
                {word.split("").map((letter, index) =>
                    <span key={index}>
                        {guessedLetters.includes(letter.toLowerCase()) ? letter.toUpperCase() : ""}
                    </span>

                )}
            </section>

            <section className="keyboard">
                {alphabet.split("").map((letter) => {
                    const isGuessed = guessedLetters.includes(letter)
                    const isCorrect = isGuessed && word.toLowerCase().includes(letter)
                    const isWrong = isGuessed && !word.toLowerCase().includes(letter)
                    const className = clsx({
                        correct: isCorrect,
                        wrong: isWrong
                    })

                    return (<button key={letter} onClick={() => handleLetterClick(letter)}
                        className={className}
                    >
                        {letter.toUpperCase()}
                    </button>

                    )
                })}
            </section>

            {(isGameLost || isGameWon) && <button className="newGame">
                New Game
            </button>}
        </main>
    )
}
