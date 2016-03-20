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

$('#submit').click(function() {
    
    var message = $('#message').val();
    
    dataRef.push({message: userName + " Says: " + message});
    
    $('#message').val('');
})

dataRef.on('child_added', function(snapshot) {
    var incoming = snapshot.val();
    
    $('#incoming').prepend(incoming.message);
    $('#incoming').prepend("<br>");
})
