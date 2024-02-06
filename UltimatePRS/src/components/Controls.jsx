import '../App.css'

// This component provides the player with a set of inputs to drive the action of the game. 
// Inputs presented are determined by the gameState.
// gameState="new": present an input for the player's name and Start Game button.
// gameState="action","player","computer","tie": Present three buttons for Paper, Rock, or Scissors. 
// gameState="gameover": present a "New Game?" button.

// When Start Game button is pressed, set the player's name to the entry from the input.
// If the input is empty, set "Player".
// Then, set the gameState="action".

// Determine if the three buttons need to be presented based on gameState.

// When one of the three buttons is pressed, set the playerAction to the choice.
// NOTE: playerAction needed. Default="none"
// Randomly choose an action for the computer.
// Compare the actions, and determine a winner (if any).

const weapons = ["paper", "rock", "scissors"];

// Define the points to be awarded.
const hitScore = 2;
const tieScore = 1;

function determinWinner(player, computer) {
    var winner = "";
    if ((player == "paper") && (computer == "rock")) { winner = "player"; }
    else if ((player == "rock") && (computer == "scissors")) { winner = "player"; }
    else if ((player == "scissors") && (computer == "paper")) { winner = "player"; }
    else if ((player == "paper") && (computer == "scissors")) { winner = "computer"; }
    else if ((player == "rock") && (computer == "paper")) { winner = "computer"; }
    else if ((player == "scissors") && (computer == "rock")) { winner = "computer"; }
    else { winner = "tie"; }

    return winner;
}

// To reduce the number of ties, use the scores to determine a winner...
// Choose a number between 0 and each of the scores...
// To favor the underdog, lowest random number wins, but only half the points.
function determineTieBreaker(pScore, cScore) {
    let tieBreak = "tie";
    let attempts = 0;

    // I do not want this to get stuck forever. Break after 10 attempts.
    while ((tieBreak=="tie")&&(attempts<10)) {
        let pHit = Math.floor(Math.random() * pScore);
        let cHit = Math.floor(Math.random() * cScore);
        attempts +=1;
        if(pHit<cHit)
            tieBreak="tieplayer";
        else if (cHit<pHit)
            tieBreak="tiecomputer";
        else
            tieBreak="tie";
    }
    return tieBreak;
}

// When the New Game button is clicked, clear the player name and set scores to 0. Set the gameState = "new"
function Controls(props) {

    const { gameState, setGameState, setPlayerWeapon, setComputerWeapon, setPlayerName, playerScore, computerScore, setPlayerScore, setComputerScore, player } = props;

    const handleClick = (event) => {
        // Get the ID of the button pressed.
        const pWeapon = event.target.id;
        setPlayerWeapon(pWeapon)
        // Randomly choose a "weapon" for the computer.
        const cWeapon = weapons[Math.floor(Math.random() * weapons.length)];
        setComputerWeapon(cWeapon);
        // Call the function to determine a winner of the round.
        var winner = determinWinner(pWeapon, cWeapon)

        if (winner === "player") {
            var newPScore = playerScore + hitScore;
            setPlayerScore(newPScore);
        }
        else if (winner === "computer") {
            var newCScore = computerScore + hitScore;
            setComputerScore(newCScore);
        }
        else { 
            winner = determineTieBreaker(playerScore, computerScore);
            if (winner === "tieplayer") {
                var newPScore = playerScore + tieScore;
                setPlayerScore(newPScore);
            }
            else if (winner === "tiecomputer") {
                var newCScore = computerScore + tieScore;
                setComputerScore(newCScore);
            }
            else {
                // If for some reason the result is different, award no points.
                winner = "tie";
            }  
        }

        // Set the game state to the winner (player or computer)
        setGameState(winner)
    }
    const nameChangeHandler = (event) => {
        // Set the name as the input field changes.
        setPlayerName(event.target.value)
    }

    const startGame = () => {
        // Change the game state to "action" to start the game.
        setGameState("action")
    }

    const isWinner = () => {
        // If either score is 10, end the game.
        // Otherwise, keep playing!
        if ((playerScore >= 10) || (computerScore >= 10))
            setGameState("gameover")
    }

    const startNewGame = () => {
        // Reset all the values to begin a new game.
        setPlayerScore(0)
        setComputerScore(0)
        setGameState("new")
        setPlayerWeapon("none")
        setComputerWeapon("none")
    }

    const determineControls = (gameState) => {
        isWinner();

        // based on the game state, present the controls.
        switch (gameState) {
            case 'gameover':
                return (
                    <>
                        <div>
                            <button onClick={startNewGame} type="submit">New Game</button>
                        </div>
                    </>)
                break;
            case 'new':
                return (
                    <>
                        <div>
                            <input 
                            onChange={nameChangeHandler} 
                            id='myName' 
                            type='text'
                            value={player}
                            placeholder='Please enter your name.' />
                        </div>
                        <div>
                            <button onClick={startGame} type="submit">Submit</button>
                        </div>
                    </>
                )
                break;

            default:
                return (<>
                    <div className='score'>
                        <div className="scoreboard">
                            <h2>{player}'s Score:</h2>
                            <h2>{playerScore}</h2>
                        </div>
                        <div>
                            <button id="paper" type="submit"
                                onClick={handleClick}>Paper</button>
                            <button id="rock" type="submit"
                                onClick={handleClick}>Rock</button>
                            <button id="scissors" type="submit"
                                onClick={handleClick}>Scissors</button>

                        </div>
                        <div className="scoreboard">
                            <h2>Computer's Score:</h2>
                            <h2>{computerScore}</h2>
                        </div>
                    </div>
                </>)
                break;
        }
    }

    return (
        <>
            <h2>{determineControls(gameState)}</h2>
        </>
    )
}

export default Controls