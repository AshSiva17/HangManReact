import React from "react"
import { languages } from "./data/languages.js"
import { getFarewellText, getRandomWord } from "./data/utils.js"
import clsx from 'clsx';


export default function Hangman() {
    const [word, setWord] = React.useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = React.useState([''])

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const wrongGuesses = guessedLetters.filter(letter => !word.toLowerCase().includes(letter)).length
    const isGameWon = word.split("").every(letter => guessedLetters.includes(letter.toLowerCase()))
    const isGameLost = wrongGuesses >= languages.length - 1
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]

    function handleLetterClick(letter) {
        setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    }

    const gameStatus = clsx("gameStatus", {
        won: isGameWon && !isGameLost,
        lost: isGameLost && !isGameWon,
        wrong: !isGameWon && !isGameLost && wrongGuesses > 0
    })

    let farewellText = ""
    if (wrongGuesses > 0 && wrongGuesses < languages.length) {
        farewellText = getFarewellText(languages[wrongGuesses - 1].name)
    }
    const statusTextTop = isGameWon ? "You Win!" : isGameLost ? "Game Over!" : wrongGuesses > 0 ? farewellText : "Game Over!"

    const statusTextBottom = isGameWon ? "Well Done 🎉" : "You lose! Better start learning Assembly 😭"

    function resetGame() {
        setWord(getRandomWord())
        setGuessedLetters([''])

    }
    return (
        <main>
            <header>
                <h1>Assembley:Endgame</h1>
                <h3>Guess the word in under 8 attempts to keep the programming world safe from Assembly</h3>
            </header>


            <section
                className={gameStatus}
                aria-live="polite"
                role="status"
            >
                <h3>{statusTextTop}</h3>
                <p>{statusTextBottom}</p>
            </section>

            <div className="languageContainer">
                <section className="languageList">
                    {languages.map((language, index) => {
                        const className = clsx("language", (index < wrongGuesses && index < languages.length - 1) && "lost")
                        return <div key={language.name} className={className} style={{ backgroundColor: language.backgroundColor, color: language.color }}> {language.name} </div>
                    })}
                </section>
            </div>


            <section className="word">
                {word.split("").map((letter, index) => {
                    const missedLetter = clsx(isGameLost && !guessedLetters.includes(letter.toLowerCase()) && "missedLetter")
                    return <span key={index} className={missedLetter}>
                        {isGameLost || guessedLetters.includes(letter.toLowerCase()) ? letter.toUpperCase() : ""}
                    </span>
                })}
            </section>

            <section
                className="sr-only"
                aria-live="polite"
                role="status"
            >
                <p>
                    {word.includes(lastGuessedLetter) ? `Good guess! The word has the letter ${lastGuessedLetter.toUpperCase()}` : `Sorry, the word does not have the letter ${lastGuessedLetter.toUpperCase()}`}
                    You have {languages.length - 1 - wrongGuesses} attempts remaining.
                </p>
                <p>Current word: {word.split("").map(letter =>
                    guessedLetters.includes(letter.toLowerCase()) ? letter : "blank").join(" ")}</p>
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
                        disabled={isGameWon || isGameLost}
                        aria-disabled={isGameWon || isGameLost || guessedLetters.includes(letter)}
                        aria-label={"Letter " + letter}
                    >
                        {letter.toUpperCase()}
                    </button>

                    )
                })}
            </section>

            {(isGameLost || isGameWon) && <button 
            className="newGame"
            onClick={resetGame}
            >
                New Game
            </button>}
        </main>
    )
}
