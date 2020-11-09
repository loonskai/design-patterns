import { Router } from 'express';
import { FileDataSource } from '../../patterns/structural/decorator/FileDataSource';
import { CompressionDecorator } from '../../patterns/structural/decorator/classic/CompressionDecorator';

const router = Router();

router.get('/todos', async (req, res) => {
  res.send([]);
});

router.post('/todos', async (req, res: any) => {
  const { value } = req.body;
  res.send(value);
});

router.get('/files', async (req, res) => {
  const { name } = req.query;
  const file = new FileDataSource(String(name));
  const data = await file.readData();
  res.send(data);
})

router.post('/files', async (req, res) => {
  const { fileName, text, encrypt, compress } = req.body;
  let file = new FileDataSource(fileName);
  if (compress) {
    file = new CompressionDecorator(file);
  }
  await file.writeData(text)
  res.send(req.body);
});

export default router;
