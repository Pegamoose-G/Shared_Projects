// isdrag is set to false by default, because the user has not selected an element to move.
var isdrag=false;
// Defining the element position valriable from the left and top of the page.
var x,y;
// Defining a data object to track piece movement.
var dobj;
// Define the list of game pieces.
// NOTE: This would be pulled from the database.

function game_end() {
    // Use the piece list to get a full list of IDs.
    var parts = [];
    // Iterate through the list of pieces to figure out how to display them.
    plist.pieces.forEach(el => {
      parts.push(el.id);
    });
    // Display the collection of built HTML elements.
    let list = parts.join(",");
    // For each piece (including the game board), record the last state.
    // Push the full state to the history.
    record_moves(list);
    // Disable record button.
    $("#rec_button").prop( "disabled", true );
    // Disable the end button. Prevents from ending twice.
    $("#end_button").prop( "disabled", true );
    $("#scoreboard").html("Game over, man!");
}

function game_record() {
    // Get the list of element names (IDs)
    let list = $("#elem_name").val();
    // Call the function to preserve the game piece state(s) into the object's history.
    record_moves(list);
    // Clear the text input for the next recording.
    $("#elem_name").val("");
}

function move_bwd() {
    // Rewind the state of the pieces by going through the array of history.
    // Get the current turn (index)
    let h_turn = $("#move_turn").val();
    // Decrement the turn by one, not going any lower than 0.
    if(parseInt(h_turn)>0){
      h_turn=parseInt(h_turn)-1;
      $("#move_turn").val(h_turn);
      $("#scoreboard").html("Back up!");
      // Based on the index, update the state of the pieces for that recorded bit of history.
      plist.history[h_turn].forEach(el => {
        let part = el.id;
        let d = el.deg ? el.deg : 0;        
        document.getElementById(part).style.rotate=d+"deg";
        document.getElementById(part).style.left=el.position.x + "px";
        document.getElementById(part).style.top=el.position.y + "px";
      });
    }
    else{
      // If at zero, Update the scoreboard with "Start of Game".
      $("#scoreboard").html("Start of Game");
    }    
}

function move_fwd() {
    // Rewind the state of the pieces by going through the array of history.
    // Get the current turn (index)
    let h_turn = $("#move_turn").val();
    // Decrement the turn by one, not going any lower than 0.
    if(parseInt(h_turn)<plist.history.length){
      // Based on the index, update the state of the pieces for that recorded bit of history.
      plist.history[h_turn].forEach(el => {
        let part = el.id;
        let d = el.deg ? el.deg : 0;        
        document.getElementById(part).style.rotate=d+"deg";
        document.getElementById(part).style.left=el.position.x + "px";
        document.getElementById(part).style.top=el.position.y + "px";
      });
      h_turn=parseInt(h_turn)+1;
      $("#move_turn").val(h_turn);
      $("#scoreboard").html("Move forward!");
    }
    else{
      // If at zero, Update the scoreboard with "Start of Game".
      $("#scoreboard").html("Current turn");
    }
}

// Provide a function to set the game pieces on the virtual table.
function set_pieces() {
    // Enable the Record button.
    $("#rec_button").prop( "disabled", false );
    // Enable the End Game button
    $("#end_button").prop( "disabled", false );
    // Restart turns.
    $("#move_turn").val(0);
    // Empty the move history
    plist.history=[];
    // Define the set of HTML elements to display; default is empty
    var bits = "";
    var parts = [];
    // Iterate through the list of pieces to figure out how to display them.
    plist.pieces.forEach(el => {
      // Help declare the path for the image based on the object of pieces.
      var imgpath=".\/img\/"+el.image;
      // Declare the drag-and-drop class; Default is empty (non-draggable)
      var dnd="";
      // If the piece sets the drag flag, attach the class.
      if(el.drag)
        dnd='class="dragme"';
      // If the rotation flag is true, rotate by the specified degrees.
      if(el.rot){
        deg = el.deg ? el.deg : 0;
        rotateme='ondblclick="rotate_piece(this,'+deg+')"';
      }
      else
        rotateme='';
      // Append the piece's image element to the HTML variable
      bits=bits+'<img id="'+el.id+'" src="'+imgpath+'" style="left: '+el.position.x+'px;top: '+el.position.y+'px; position: fixed; z-index: '+el.position.z+';" '+dnd+' '+rotateme+' onclick="highlight_piece(this.id)"/>';
      parts.push(el.id);
    });
    // Display the collection of built HTML elements.
    $("#pieces").html(bits);
    let list = parts.join(",");
    record_moves(list);
  }
  
  // Provide a function to toggle the class displaying or hiding the debug input fields.
  function hide_debug() {
    $("#debugform").toggleClass("hidden");
  }
  
  // Provide a function to track the mouse movement that also moves the image.
  function movemouse(e)
  {
    // Only move the image when the drag flag is true.
    if (isdrag)
    {
      // Determing the movement of the mouse
      pos_x = tx + e.clientX - x;
      pos_y = ty + e.clientY - y;
      // Update the position of the image.
      dobj.style.left = pos_x;
      dobj.style.top  = pos_y;
      // Update the debug input fields storing the movement values.
      $("[name='elem_x']").val(pos_x);
      $("[name='elem_y']").val(pos_y);
      $("[name='TX_name']").val(tx);
      $("[name='TY_name']").val(ty);
      return false;
    }
  }
  
  // Define a function to determing if an element is selected and if it is draggable.
  function selectmouse(e) 
  {
    var fobj       = e.target;
    var topelement = "HTML";
  
    // Get the top-most draggable element where clicked (if any)
    // while (fobj.tagName != topelement && fobj.className != "dragme")
    while (fobj.tagName != topelement && !fobj.classList.contains("dragme"))
    {
      fobj = fobj.parentNode;
    }
  
    // If the objects class is set to "dragme", allow the piece's image element to be moved.
    if (fobj.classList.contains("dragme"))
    {
      // The class includes the draggable class, turn on dragging.
      isdrag = true;
      // The global object is set to the selected object.
      dobj = fobj;
      // Grab the elements position.
      // If not set, add 0.
      // This sets the image in the top-left corner, if necessary.
      tx = parseInt(dobj.style.left+0);
      ty = parseInt(dobj.style.top+0);
      rot= parseInt(dobj.style.rotate+0);
      // Get the mouse's X,Y coordinates.
      x = e.clientX;
      y = e.clientY;
      // Listener for when the mouse is moving, use the function "movemouse".
      document.onmousemove=movemouse;
      // Call function to tag unique moved pieces by ID.
      tag_piece(dobj.id);
      
      return false;
    }
  }

  // Disable dragging effect when mouse button is released.
  function releasemouse(e) {
    isdrag=false;
  }
  
  // While the mouse is down (clicked) on an element, select the object and move it.
  document.onmousedown=selectmouse;
  // When the mouse lets up (unclicked), the image element stays where it is, and the drag flag is terminated (false)
  // document.onmouseup=new Function("isdrag=false");
  document.onmouseup=releasemouse;
  
  function rotate_piece(e) {
    // Determine a random number of degrees.
    let degs = (Math.floor(Math.random() * 4))*90;
    // Keep the value around 0-360 degrees.
    var n_rot = parseInt(degs%360);
    // Construct the style string.
    e.style.rotate=n_rot+"deg";
    // Update the debugger.
    $("[name='p_rot']").val(n_rot);
    tag_piece(e.id);
  }
  
  function highlight_piece(piece) {
    // Remove selection from any image.
    $("img").removeClass("pieceframe");
    // Highligh the selected piece by toggling the class.
    $("#"+piece).toggleClass("pieceframe");
    // Set the input equal to the name of the selected piece.
    let prev = $("#last_piece").val();
    $("#last_piece").val(piece);
    $("#prev_piece").val(prev);
  }
  
  function tag_piece(id) {
    // Get the existing list of pieces.
    let list = $("#elem_name").val();
    // split list by commas into an array.
    let parr = list.split(",");
    // Only add the id if it is unique.
    if(!(parr.includes(id)))
      parr.push(id);
    // parr = jQuery.unique(parr);
    // Reconstruct the CDL of IDs.
    let newlist = parr.join(",");
    // Return the possibly updated list.
    $("#elem_name").val(newlist);
  }

  // Provide a function to track piece changes
  function record_moves(list) {
    // Divide the string of part IDs.
    let parr = list.split(",");
    // Declare an empty array for piece state changes.
    let turn = [];
    // For each game piece from the list, calculate and preserve state changes.
    parr.forEach(part => {
      if((part!="")&&($("#"+part).length)){
        // Declare an empty object to store state change data.
        let move = {};
        // Store the ID of the element.
        move.id=part;
        // Call the function to get the integer of degrees a piece might be rotated, and store it.
        let deg = get_rotation(part);
        move.deg = deg;
        // Determine the coordinates of the element.
        // This is based on the distance from the top and left of the viewable area. And, sotre both values.
        let pos = $("#"+part).position();
        move.position = {};
        move.position.x=pos.left;
        move.position.y=pos.top;
        // Push the piece's state change into the turn array.
        turn.push(move);
      }
    });
    // As long as at least one piece moved during the turn, record the turn in the game history array.
    if(turn.length!=0){
      plist.history.push(turn);
      // Set the "current turn" to the length of the history of turns.
      let t_index = plist.history.length;
      $("#move_turn").val(t_index);
    }
    // Logging the history on record to observe any and all changes.
    console.log(plist.history);
  }

  // Provide a function to determine the numeric value of a piece's rotation.
  function get_rotation(part){
    // Find the element by ID
    let elem = document.getElementById(part);
    // If it has been rotated, get the value. Otherwise, set it to 0 degrees.
    let rot = elem.style.rotate ? elem.style.rotate : "0deg";
    // Strip off the "deg" portion of the string, resulting in only the integer.
    let deg = rot.split("deg");
    // Return the integer value.
    return parseInt(deg);
  }