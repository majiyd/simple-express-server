import express from 'express';


const router = express.Router();


router.get('/', async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Contacts fetched successfully',
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  res.status(200).send(`Contact with id: ${id} not found`);
});

export default router;
