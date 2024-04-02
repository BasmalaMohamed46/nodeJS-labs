const socket = io();
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const usernameInput = document.getElementById("username");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value && usernameInput.value) {
    const messageData = {
      msg: input.value,
      sender: usernameInput.value
    };
    socket.emit("chat message", messageData);
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const { msg, sender } = data;
  const item = document.createElement("div");
  item.textContent = `${sender}: ${msg}`;
  item.classList.add(sender === usernameInput.value ? 'right' : 'left');
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
