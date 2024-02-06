import { useState } from 'react';
import '../App.css'

// This component controls the feedback (messaging) to the player. No actionable UI should be rendered by this component, only information.
// Determine if any scores are over 10.
// If a score is over 10, set gameState to "gameover".
// If no score is over 10, keep going.
function Feedback(props) {

    const { player, gameState, playerWeapon, computerWeapon, playerScore, computerScore } = props;

    // Messaging determined by gameState.
    const determineFeedback = (gameState) => {
        switch (gameState) {
            case "new":
                // gameState="new": Render instructions to enter a player name to start a game. 
                return (<>Please enter a player name to start a new game.</>);
                break;
            case "action":
                // gameState="action" (ie the player name is set and both scores are <10)...
                // Instruct the player to click a button (PRS).
                return (<>Choose your weapon, {player}!</>);

                break;
            case "player":
                // gameState="player" : Declare Player as the winner, and award the point.
                return (<>{player} chose {playerWeapon}. The Computer chose {computerWeapon}.<br />{player} won this round! Point goes to {player}!</>);

                break;
            case "computer":
                // gameState="computer": Declare the computer as the winner, and award the point.
                return (<>{player} chose {playerWeapon}. The Computer chose {computerWeapon}.<br />The Computer won this round! Point goes to The Computer!</>);

                break;
            case "tie":
                // gameState="tie": Declare the round is tied.
                return (<>{player} chose {playerWeapon}. The Computer chose {computerWeapon}.<br />Tied! No points awarded. Keep going!</>);
                break;
            case "tieplayer":
                // gameState="tie": Declare the round is tied.
                return (<>{player} chose {playerWeapon}. The Computer chose {computerWeapon}.<br />Tied! {player} won the tie-breaker round! Reduced points awarded.</>);
                break;
            case "tiecomputer":
                // gameState="tie": Declare the round is tied.
                return (<>{player} chose {playerWeapon}. The Computer chose {computerWeapon}.<br />Tied! The Computer won the tie-breaker round! Reduced points awarded.</>);
                break;
            case "gameover":
                // gameState="gameover": Determine and declare the winner.
                var declaredWinner = "No one"
                if (playerScore > computerScore)
                    declaredWinner = player;
                else
                    declaredWinner = "The Computer";
                return (
                    <>
                        <h2>{declaredWinner} is the winner!</h2>
                        <p>Want to play again?</p>
                    </>
                );
                break;

            default:
                // Default messaging
                return (<>Unknown game state: {gameState}</>);
                break;
        }
    }

    return (
        <>
            <h2>{determineFeedback(gameState)}</h2>
        </>
    )
}

export default Feedback