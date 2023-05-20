const dgram = require("dgram");

const message = Buffer.from("some message from client");

const socket = dgram.createSocket("udp4");

socket.send(message, 0, message.length, 41234, "localhost", function (err, bytes) {
  if (err) {
    return new Error(err);
  }
  console.log(`client send ${bytes} message`);
});

socket.on("message", function (msg, rinfo) {
  console.log("some message from server", msg, rinfo);
});