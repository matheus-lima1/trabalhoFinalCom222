import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';
// import routeAuth from './routeAuth';

const app = express();

mongoose.connect('mongodb+srv://matheuslima1:trabalhofinalcom222@cluster0.qlgtymm.mongodb.net/?retryWrites=true&w=majority');

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
// app.use(routeAuth);
// require('./routeAuth')(app);


app.listen(port, () => {
  console.log(`listening on por  ${port}`)
});
