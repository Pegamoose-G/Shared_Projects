// isdrag is set to false by default, because the user has not selected an element to move.
var isdrag=false;
// Defining the element position valriable from the left and top of the page.
var x,y;
// Defining a data object to track piece movement.
var dobj;
// Define the list of game pieces.
// NOTE: This would be pulled from the database.
const plist = [
  {
      id: "Game_Board",
      drag: false,
      image: "3tgrid.png",
      position: {
          x: 150,
          y: 10,
          z: 0
      }
  },
  {
    id: "O_Piece_1",
    drag: true,
    image: "3tO.png",
    position: {
        x: 10,
        y: 10,
        z: 0
    }
  },
  {
    id: "O_Piece_2",
    drag: true,
    image: "3tO.png",
    position: {
        x: 10,
        y: 90,
        z: 0
    }
  },
  {
    id: "O_Piece_3",
    drag: true,
    image: "3tO.png",
    position: {
        x: 10,
        y: 170,
        z: 0
    }
  },
  {
    id: "O_Piece_4",
    drag: true,
    image: "3tO.png",
    position: {
        x: 10,
        y: 250,
        z: 0
    }
  },
  {
    id: "O_Piece_5",
    drag: true,
    image: "3tO.png",
    position: {
        x: 10,
        y: 330,
        z: 0
    }
  },
  {
    id: "X_Piece_1",
    drag: true,
    image: "3tX.png",
    position: {
        x: 100,
        y: 10,
        z: 0
    }
  },
  {
    id: "X_Piece_2",
    drag: true,
    image: "3tX.png",
    position: {
        x: 100,
        y: 90,
        z: 0
    }
  },
  {
    id: "X_Piece_3",
    drag: true,
    image: "3tX.png",
    position: {
        x: 100,
        y: 170,
        z: 0
    }
  },
  {
    id: "X_Piece_4",
    drag: true,
    image: "3tX.png",
    position: {
        x: 100,
        y: 250,
        z: 0
    }
  },
  {
    id: "X_Piece_5",
    drag: true,
    image: "3tX.png",
    position: {
        x: 100,
        y: 330,
        z: 0
    }
  }
]

// Provide a function to set the game pieces on the virtual table.
function set_pieces() {
  // Define the set of HTML elements to display; default is empty
  var pieces = "";
  // Iterate through the list of pieces to figure out how to display them.
  plist.forEach(el => {
    // Help declare the path for the image based on the object of pieces.
    var imgpath=".\/img\/"+el.image;
    // Declare the drag-and-drop class; Default is empty (non-draggable)
    var dnd="";
    // If the piece sets the drag flag, attach the class.
    if(el.drag)
      dnd='class="dragme"';
    // Append the piece's image element to the HTML variable
    pieces=pieces+'<img id="'+el.id+'" src="'+imgpath+'" style="left: '+el.position.x+'px;top: '+el.position.y+'px; position: fixed;" '+dnd+'/>';
  });
  // Display the collection of built HTML elements.
  $("#mydata").html(pieces);
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
    // Get the mouse's X,Y coordinates.
    x = e.clientX;
    y = e.clientY;
    // Listener for when the mouse is moving, use the function "movemouse".
    document.onmousemove=movemouse;
    // Update the input data field to the element's ID.
    $("#elem_name").val(dobj.id);
    return false;
  }
}

// While the mouse is down (clicked) on an element, select the object and move it.
document.onmousedown=selectmouse;
// When the mouse lets up (unclicked), the image element stays where it is, and the drag flag is terminated (false)
document.onmouseup=new Function("isdrag=false");
