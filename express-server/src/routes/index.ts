import { Router } from 'express';

const router = Router();

router.get('/todos', async (req, res) => {
  res.send([]);
});

router.post('/todos', async (req, res: any) => {
  const { value } = req.body;
  res.send(value);
});

export default router;
