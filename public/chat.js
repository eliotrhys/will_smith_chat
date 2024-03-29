// Make Connection

var socket = io.connect('http://localhost:4000');

// Query DOM

var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit Events

btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
});


// Listen for Events

socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<div class="d-flex align-items-center"><img style="width: 30px;" src="./images/will-smith-one.png" /><p><strong>' + data.handle + ': </strong>' + data.message + '</p></div>';
  message.value = "";
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
})
