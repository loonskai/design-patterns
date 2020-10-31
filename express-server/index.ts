import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './mongo-connect';
import router from './src/routes'

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(router);

app.listen(5000, () => {
  console.log('Express running on the 5000 port');
});
