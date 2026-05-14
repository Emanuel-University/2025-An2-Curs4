import { WebSocketServer } from "ws";

const clients = [];

const wss = new WebSocketServer({ port: 7878 });
wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.push(ws);

  ws.on("message", function message(data) {
    console.log("received:", data.toString());
    // Broadcast the received message to all connected clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    // Remove the disconnected client from the clients array
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });

  ws.onerror = function () {
    console.log("Some Error occurred");
  };
});
