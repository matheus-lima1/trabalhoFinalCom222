import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

mongoose.connect('mongodb://localhost/gamesDb');

const port = 3000;

app.use(express.json());
app.use(routes);


app.listen(port, () => {
  console.log(`listening on por  ${port}`)
});