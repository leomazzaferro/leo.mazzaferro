console.log("Hola shat");
const socket = io();

const chatBox = document.getElementById("input-msg");

let usuarioIngresado = "";

async function main() {
  const { value: nombre } = await Swal.fire({
    title: "Enter your name",
    input: "text",
    inputLabel: "Your name",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Debes ingresar un nombre!";
      }
    },
  });

  usuarioIngresado = nombre;
}

main();

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg-chat", {
      msg: chatBox.value,
      user: usuarioIngresado,
    });
    chatBox.value = "";
  }
});

socket.on("list-chat", (msgs) => {
  const divMsgs = document.getElementById("div-msgs");
  divMsgs.innerHTML = "";
  msgs.forEach((msg) => {
    const div = document.createElement("div");
    div.classList.add("msgs");
    div.innerHTML = `
    <p class="chat-color">${msg.user}: ${msg.msg}</p>
    `;
    divMsgs.appendChild(div);
  });
});
