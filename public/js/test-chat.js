console.log("Hola shat");
const socket = io();

const chatBox = document.getElementById("input-msg");

let emailIngresado = "";

async function main() {
  const { value: email } = await Swal.fire({
    title: "Enter your email",
    input: "text",
    inputLabel: "Your email",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "need email!";
      }
    },
  });

  emailIngresado = email;
}

main();

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg-chat", {
      msg: chatBox.value,
      user: emailIngresado,
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
