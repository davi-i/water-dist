import express from 'express';
import { Server } from 'http';

const app = express();
const http = new Server(app);

app.use(express.static('public'));
