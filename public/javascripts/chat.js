const socket = io();
const user = document.getElementById("userName");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
const chat = document.getElementById("chat");
const users = document.getElementById("users");
const voice = document.getElementById("voice");
const productID = document.getElementById("productID");

socket.emit("join", { lobby: productID.value });
console.log(chat);
socket.on("chat history", function (msg) {
  msg.forEach((element) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(element));
    chat.appendChild(li);
  });
});
socket.on("chat", function (msg) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(msg));
  chat.appendChild(li);
});

submit.addEventListener("click", function () {
  socket.emit("chat", {
    lobby: productID.value,
    message: `${user.value} says ${message.value}`,
  });
  console.log(user.value, message.value);
  message.value = "";
});

voice.addEventListener("click", function () {
  mainFunction(1000);
});

function mainFunction(time) {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    socket.emit("join voice", { lobby: productID.value });

    mediaRecorder.start();

    let audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", function (event) {
      audioChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", function () {
      const audioBlob = new Blob(audioChunks);

      audioChunks = [];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(audioBlob);

      fileReader.onloadend = function () {
        const base64String = fileReader.result;
        console.log(base64String);

        //NOTE - this is for testing purposes only
        // let newData = base64String.split(";");
        // newData[0] = "data:audio/ogg;";
        // newData = newData[0] + newData[1];
        // let audio = new Audio(newData);
        // audio.play();

        socket.emit("voice", base64String);
      };

      mediaRecorder.start();

      setTimeout(function () {
        mediaRecorder.stop();
      }, time);
    });

    setTimeout(function () {
      mediaRecorder.stop();
    }, time);
  });

  socket.on("send", function (data) {
    const audio = new Audio(data);
    audio.play();
  });

  socket.on("users update", function (data) {
    users.innerHTML = "";
    data.users.forEach((element) => {
      const li = document.createElement("li");
      li.innerText = element;
      users.append(li);
    });
  });
}
