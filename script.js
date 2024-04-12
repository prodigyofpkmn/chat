document.addEventListener('DOMContentLoaded', () => {
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
    const msg = input.value.trim();
    if (msg !== '') {
      socket.emit('chat message', msg);
      addMessage('You', msg);
      input.value = '';
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
});
