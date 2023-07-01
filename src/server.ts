import express from 'express';
import { Server } from 'socket.io';

const app = express();

app.use(express.static('public'), express.json());

const port = 8000;
const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

const io = new Server(server);

app.post('/api/sensor1', (req, res) => {
  io.emit('sensor1', req.body.contextResponses[0].contextElement);
  res.status(200);
});
