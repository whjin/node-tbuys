const dgram = require("dgram");

const message = Buffer.from("some message from server");

const socket = dgram.createSocket("udp4", function (msg, rinfo) {
  console.log(msg.toString());
  socket.send(message, 0, message.length, rinfo.port, rinfo.address, function (err, bytes) {
    if (err) {
      return new Error(err);
    }
    console.log(`send${bytes}message`);
  });
});

socket.bind(41234, "localhost", function () {
  console.log("bind 41234");
});