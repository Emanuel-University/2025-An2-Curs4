import { WebSocket } from "ws";

const ws = new WebSocket("ws://localhost:7878");

ws.on("open", function open() {
  ws.on("message", function message(data) {
    console.log(`${data}`);
  });
});
