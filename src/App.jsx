import React from "react"


export default function Hangman() {
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
        </main>
    )
}
