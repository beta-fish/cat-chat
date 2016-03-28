var dataRef = new Firebase('https://cat-chat.firebaseio.com/');

//login

var userName

$('#login-google').click(function()
{
    dataRef.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            
            status = "logout"
        }
        
        $('#profile-name').prepend(authData.google.displayName);
        
        $('#profile-image').attr('src',authData.google.profileImageURL);
        
        userName = authData.google.displayName;
    });
});

$('#message').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    $('#submit').click();
    return false;  
  }
});   

//modal
$('#themes').click(function(){
    $('#theme-select').openModal();
});

$('#dark-theme').click(function(){
    $('#theme-style').attr("href", "dark.css");
});
$('#defualt-theme').click(function(){
    $('#theme-style').attr("href", "default.css");
});

$('#submit').click(function() {
    
    var message = $('#message').val();
    
    dataRef.push({message: userName + " Says: " + message});
    
    $('#message').val('');
    
     Materialize.toast('Message Sent', 4000);
})

dataRef.on('child_added', function(snapshot) {
    var incoming = snapshot.val();
    
    $('#incoming').prepend(incoming.message);
    $('#incoming').prepend("<br>");
    document.getElementById('alert').play();
})
