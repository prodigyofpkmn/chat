const socket = io();

const ul = document.getElementById('messages');
const input = document.getElementById('m');
const button = document.getElementById('send');

button.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  if (input.value.trim() !== '') {
    const msg = input.value.trim();
    socket.emit('chat message', msg);
    addMessage('You', msg); // Add the message to the list with the user name "You"
    input.value = ''; // Clear input after sending the message
  }
}

socket.on('chat message', (data) => {
  addMessage(data.user, data.message);
});

function addMessage(user, message) {
  const li = document.createElement('li');
  li.textContent = `${user}: ${message}`;
  ul.appendChild(li);
}