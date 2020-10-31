import express from 'express';
import './mongo-connect';

const app = express();

app.listen(5000, () => {
  console.log('Express running on the 5000 port');
});
