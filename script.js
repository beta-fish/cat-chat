var dataRef = new Firebase('https://cat-chat.firebaseio.com/');

$('#submit').click(function() {
    
    var message = $('#message').val();
    
    dataRef.push({message: message});
    
    $('#message').val('');
})

dataRef.on('child_added', function(snapshot) {
    var incoming = snapshot.val();
    
    $('#incoming').prepend(incoming.message);
    $('#incoming').prepend("<br>");
})