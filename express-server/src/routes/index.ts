import { Router } from 'express';

const router = Router();

router.get('/todos', async (req, res) => {
  res.send([]);
});

router.post('/todos', async (req, res: any) => {
  const { value } = req.body;
  res.send(value);
});

router.post('/user-generate', async (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

export default router;
