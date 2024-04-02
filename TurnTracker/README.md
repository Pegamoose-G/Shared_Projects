# Turn Tracker
Like the challenges presented on Code Wars, I presented myself a challenge to better understand how I might track movement and manipulation of game pieces. This sample of code defines the piece set up in a Javascript object. Pawns may be moved around the webpage. A card may be randomly rotated. The game board is presented as static. How could I track changes for the pawns and card, but ignore the game board. This is the solution I cam up with. 

This and other challenges have helped me get a better understanding for the different components of a much larger project.

## How the Sample Works
The file "pieces.js" includes a Javascript object for where to stage the game pieces. The object also includes an empty array for tracking changes per "turn".

A few buttons align the right side of the page. Most of the buttons maintain the game states, while another button offers debugging insight.

Click the Set Up button to establish the initial position of the game pieces. This state is preserved at index zero of the Hisotry array. Notice the Record and End Game buttons are disabled, since they are unnecessary until a game is started. The Set Up button can be clicked at any time to clear the history and start a new game tracking.

The round pawns may be dragged to anywhere on the page, even outside the image of the game board. Double-click the card with the red triangle to randomly point it in one of the four compass directions. When you are satisfied with the poition of the pieces, click the Record button to preserve the game state into the History array and advance the game to the next turn. Only the final position of the pieces is preserved, not the intermediate changes along the way.

Click the End Game button to preserve one final turn state for the game. This will disable the record and End Game buttons.

The Forward and Backward buttons allow you to review the preserved end states of each recorded turn. This progresses through the indexes of the history array, updating the position and orientation of the pieces at the each turn.

## Other Considerations
* For a future use of this code, I may provide a "ghost" image of the before state of a piece to compare with the after state.
* This challenge has given me ideas how I would preserve other game piece states, like the flipping of a card, or the change of a value.
* The rotation of the image is based on the style's setting. I had found other code which would present the value had I opted to use transitions, instead.
* I may use transitions, with the above mentioned ghost image, to animate pieces changing state.

## Side Note
I did discover an odd bug as I worked on this and my Drag and Drop sample. When Doctype is indicated at the top of the index.html file, the drag-and-drop functionality breaks. So far, I have been unable to understand why this happens. I am not sure if the declaration of HTML 5 impacts certain areas of Javascript that facilitates the movement of images, or if it is another issue. Seems to work fine on various browsers without including the Doctype line.

If you have other suggestions, I welcome your feedback.
