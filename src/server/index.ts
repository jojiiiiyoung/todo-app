/* eslint-disable no-console */
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import apiRouter from './apiRouter';
import connect from './connect';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '..', '../', 'build')));

app.get('*', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

connect();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Express server has started on port ${port}`);
});
