import express from 'express';
import { Server } from 'http';

const app = express();
const http = new Server(app);

app.use(express.static('public'));

const port = 8000;
http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
