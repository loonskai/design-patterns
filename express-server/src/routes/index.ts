import { Router } from 'express';
import { FileDataSource } from '../../patterns/structural/decorator/classic/FileDataSource';
import { CompressionDecorator } from '../../patterns/structural/decorator/classic/CompressionDecorator';
import { EncryptionDecorator } from '../../patterns/structural/decorator/classic/EncryptionDecorator';
import { FileDataSourceWithDecorators } from '../../patterns/structural/decorator/typescript';
import { Todo } from '../models/Todo';

const router = Router();

router.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

router.post('/todos', async (req, res: any) => {
  const { value } = req.body;
  if (!value) return res.status(400).send('Invalid value');

  const todo = await Todo.create({ value });
  res.send(todo);
});

router.post('/files', async (req, res) => {
  const { fileName, text, encrypt, compress } = req.body;

  /* Classic OOP decorators */
  // let file = new FileDataSource(fileName);
  // if (compress) {
  //   file = new CompressionDecorator(file);
  // }
  // if (encrypt) {
  //   file = new EncryptionDecorator(file);
  // }
  // await file.writeData(text)

  /* TS Decorators */
  const file = new FileDataSourceWithDecorators(fileName, { compress, encrypt });
  await file.write(text);

  res.send(req.body);
});

export default router;
