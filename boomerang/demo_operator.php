<?php

// Associate the switchboard with the PHP library.
include_once('demo_lib.php');

// Read in the parameters
// If not included, set a default value.
$action = (isset($_REQUEST["action"])?$_REQUEST["action"]:"badaction");
$comm = (isset($_REQUEST["comm"])?$_REQUEST["comm"]:"off");
$id = (isset($_REQUEST["id"])?$_REQUEST["id"]:"abc123");

// Make sure the action is correctly cased for the switch (all lowercase)
$action=strtolower($action);
// Use the action to call into the PHP library.
switch ($action) {
    case 'other_random_func':
        // This is a dummy other function, not used in this demo.
        $feedback = "Call that funky PHP, boy!";
        break;
    case 'reverse_me':
        // Call the page updating function with commentary.
        $feedback=reverse_text($comm);
        break;
    case 'reverse_new':
        // Call the page updating function with commentary.
        $feedback=update_backwards($comm);
        break;
    case 'say_what':
        // Call the non-commentary page updating function.
        $feedback=update_page($id);
        break;
    
    default:
        // Provide a catch-all case for unknown actions.
        $feedback="Unknown action: ".$action;
        break;
}

// Return the reply (if any)
// Echo sends the response to HTML to be displayed by the JS file.
echo $feedback;

?>