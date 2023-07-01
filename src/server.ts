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
    const capacidade = +element.attributes.filter(({ name }: any) => name == 'capacidade')[0].value;
    const volume = +element.attributes.filter(({ name }: any) => name == 'volume')[0].value;
    const vazao = +element.attributes.filter(({ name }: any) => name == 'vazao')[0].value;
    const latitude = +element.attributes.filter(({ name }: any) => name == 'latitude')[0].value;
    const longitude = +element.attributes.filter(({ name }: any) => name == 'longitude')[0].value;
    const bairro = element.attributes.filter(({ name }: any) => name == 'bairro')[0].value;
    const percent = volume / capacidade;

    let dados = {
      id: element.id,
      attributes: {
        capacidade,
        volume,
        vazao,
        latitude,
        longitude,
        bairro,
        situacao: '',
      }
    };

    if (percent > 0.3) {
      dados.attributes.situacao = 'Estável';
    } else if (percent > 0) {
      dados.attributes.situacao = 'Crítica';
      io.emit('critical', dados);
    } else {
      dados.attributes.situacao = 'Totalmente vazio';
      io.emit('empty', dados);
    }

    if (vazao >= 0.1 * capacidade) {
      io.emit('leaking', dados);
    }
    io.emit('sensorchange', dados);
  }
  res.status(200);
});
