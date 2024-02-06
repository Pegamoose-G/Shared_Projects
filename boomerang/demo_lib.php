<?php

// Define the faux-database.
// One array of random animals
define ("ANIMALS", ["alligator","bullfrog","camel","dolphin","elephant","flamingo","gorilla","hamster"]);
// Another array of random sounds
define ("SOUNDS", ["Zowie!","Yowza!","What?!","Ummm...","Toodles!","Sweet!","Ruh roh!","Puh'leeeze."]);

// A simple function to pick an elelment of each array and construct something like See-and-Say The Animal Says response.
function construct_result(){
    // Get values based on any size of array.
    $x=rand(0,count(ANIMALS)-1);
    $y=rand(0,count(SOUNDS)-1);

    // Construct and return the response.
    return "The ".ANIMALS[$x]." says, '".SOUNDS[$y]."'";
}

function reverse_text($comm) {
    // This is a simple function reversing the entire string sent in and returning the value.
    $result=strrev($comm);

    return $result;
}

function update_backwards($comm) {
    // This function combines the above functions in a nested way.
    // First, a new blurb is created (and returned).
    // Then, the blurb is reversed.

    $result=strrev(construct_result());

    return $result;
}

function update_page($id) {
    // This function grabs a newly constructed sentence, and returns it.
    $result=construct_result();

    return $result;
}

?>