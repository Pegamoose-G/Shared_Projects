// This function notifies the user if reverse box is checked on or not.
function update_rev() {
    let content = $("#demotext").html();
    $.ajax({
        url: './demo_operator.php',
        async: false,
        dataType: 'html',
        data: 'action=reverse_me&comm='+content,
        success: function (result) {
            $("#demotext").html(result);
        }
    })

}

// This function is associated with the button to update the div on the page.
function update_me() {
    // Ping the checkbox to set which action should be called.
    let action = "unknown";
    if($("#reverse").is(':checked')){
        action = "reverse_new";
    } else {
        action = "say_what";
    }

    $.ajax({
        url: './demo_operator.php',
        async: false,
        dataType: 'html',
        data: 'action='+action,
        success: function (result) {
            $("#demotext").html(result);
        }
    })

}