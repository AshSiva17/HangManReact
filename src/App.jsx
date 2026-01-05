import React from "react"
import { languages } from "./data/languages.js"
import clsx from 'clsx';


export default function Hangman() {
    const [word, setWord] = React.useState("REACT")

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const [guessedLetters, setGuessedLetters] = React.useState([''])

    function handleLetterClick(letter) {
        setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    }


    return (
        <main>
            <header>
                <h1>Assembley:Endgame</h1>
                <h3>Guess the word in under 8 attempts to keep the programming world safe from Assembly</h3>
            </header>

            <section className="gameStatus">
                <h3>You Win!</h3>
                <p>Well Done 🎉</p>
            </section>

            <div className="languageContainer">
                <section className="languageList">
                    {languages.map(language => (
                        <div key={language.name} style={{ backgroundColor: language.backgroundColor, color: language.color }}> {language.name} </div>
                    ))
                    }
                </section>
            </div>


            <section className="word">
                {word.split("").map((letter, index) =>
                        <span key={index}>
                            {letter}
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

            <button className="newGame">
                New Game
            </button>
        </main>
    )
}
