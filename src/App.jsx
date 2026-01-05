import React from "react"
import { languages } from "./data/languages.js"


export default function Hangman() {
    const [word, setWord] = React.useState("REACT")
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

            <section className="languageList">
                {languages.map(language => (
                    <div key={language.name} style={{ backgroundColor: language.backgroundColor, color: language.color }}> {language.name} </div>
                ))
                }             
                </section>

            <section className="word">
                {word.split("").map((letter, index) =>
                <span key={index}>
                    {letter}
                </span>
                )}
            </section>
        </main>
    )
}
 