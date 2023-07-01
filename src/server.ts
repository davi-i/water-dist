import express from 'express';
import { Server } from 'socket.io';

const app = express();

app.use(express.static('public'), express.json());

const port = 8000;
const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

const io = new Server(server);

app.post('/api/sensorchange', (req, res) => {
  console.log(JSON.stringify(req.body));
  for (const response of req.body.contextResponses) {
    const element = response.contextElement;
    io.emit('sensorchange', element);
  }
  res.status(200);
});
