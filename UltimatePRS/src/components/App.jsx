import { useState } from 'react';
import Controls from './Controls'
import Feedback from './Feedback'
import '../App.css'

// The App component is the component that displays the game in two parts: informational feedback and player controls. These pieces control the functionality of the game.
// A game is activated when a player's name is entered. By default, the name is empty. (TBD)
// Once a game has started, the feedback displays the player names (computer v player name), their scores (TBD), and any other game-state information.
// The controls are the only input areas from the user. 
// First, it requires the player's name to be set.
// Once the game is in session, the PRS buttons are presented as possible game actions.
// Each round results in either one player winning the round and earning a point or in a tie and no points are awarded.
// The game ends when one player reaches 10 points and the winning player is declared. (TBD)
// The game over state presents a New Game button with the declared winner. The button resets the game, removing the player name, and presenting the input prompt. (TBD)
function App() {
    // (state variable) player name (default = "")
    const [player, setPlayerName] = useState("");

    // (state variable) player score (def = 0)
    const [playerWeapon, setPlayerWeapon] = useState("none");

    // (state variable) computer score (def = 0)
    const [computerWeapon, setComputerWeapon] = useState("none");

    // (state variable) player score (def = 0)
    const [playerScore, setPlayerScore] = useState(0);

    // (state variable) computer score (def = 0)
    const [computerScore, setComputerScore] = useState(0);

    // (state variable) game state (default = "new")
    // Possible states:
    //    new = New Game
    //    action = Player is prompted to choose a "move".
    //    player = The player has won the round.
    //    computer = The computer has won the round.
    //    tie - The round ends in a tie.  
    //    gameover = A winner has been declared.
    const [gameState, setGameState] = useState("new");

    return (
        <>
            <div>
                <h1>Ultimate PRS</h1>
                <Feedback gameState={gameState} player={player} playerWeapon={playerWeapon} computerWeapon={computerWeapon} playerScore={playerScore} computerScore={computerScore}/>
                <Controls  gameState={gameState} setGameState={setGameState} setPlayerWeapon={setPlayerWeapon} setComputerWeapon={setComputerWeapon} setPlayerName={setPlayerName} playerScore={playerScore} computerScore={computerScore} setPlayerScore={setPlayerScore} setComputerScore={setComputerScore} player={player}/>
            </div>
        </>
    )
}
export default App
