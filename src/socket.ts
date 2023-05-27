import { Server, Socket } from "socket.io";

const chat: { [lobby: string]: string[] } = {};
const inVoice: string[] = [];

export function addListeners(server: Server) {
  server.on("connection", (socket: Socket) => {
    console.log("made socket connection " + socket.id);

    socket.on("join", (data) => {
      console.log("joiner: " + data.lobby);
      if (!chat[data.lobby]) chat[data.lobby] = [];

      socket.join(data.lobby);
      server.to(socket.id).emit("chat history", chat[data.lobby]);
    });
    socket.on("chat", (data) => {
      console.log("chat: " + data.lobby + " " + data.message);
      console.log("joiner: " + data.lobby);

      chat[data.lobby].push(data.message);

      server.in(data.lobby).emit("chat", data.message);
    });

    socket.on("join voice", (data) => {
      console.log("join voice: " + data.lobby);
      inVoice.push(socket.id);
      server.in(data.lobby).emit("users update",{ users: inVoice });
    });
    socket.on("voice", function (data) {
      var newData = data.split(";");
      newData[0] = "data:audio/ogg;";
      newData = newData[0] + newData[1];
      socket.broadcast.to(data.lobby).emit("send", newData);
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
}
