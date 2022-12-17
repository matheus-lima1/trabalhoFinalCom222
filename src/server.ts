import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import routeAuth from './routeAuth';

const app = express();

mongoose.connect('mongodb://localhost/gamesDb');

const port = 3000;

app.use(express.json());
app.use(routes);
// app.use(routeAuth);
require('./routeAuth')(app);


app.listen(port, () => {
  console.log(`listening on por  ${port}`)
});