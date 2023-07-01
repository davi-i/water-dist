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
    const capacity = +element.attributes.filter(({ name }) => name == 'capacidade')[0].value;
    const volume = +element.attributes.filter(({ name }) => name == 'volume')[0].value;
    const vazao = +element.attributes.filter(({ name }) => name == 'vazao')[0].value;
    const percent = volume / capacity;

    if (percent > 30) {
      element.situacao = 'Estável';
    } else if (percent > 0) {
      element.situacao = 'Crítica';
      io.emit('critical');
    } else {
      element.situacao = 'Totalmente vazio';
      io.emit('empty');
    }

    if (vazao >= 0.1 * capacity) {
      io.emit('leaking');
    }
    io.emit('sensorchange', element);
  }
  res.status(200);
});
