import express from 'express';
import router from './routes';

const app = express();
app.use(express.json());

app.use('/', router);
app.use(async (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Resource not found',
    errors: ['Resource not found'],
  });
});

// PORT
const port = process.env.PORT || 2100;
app.listen(port, () => console.log(`Server running on localhost:${port}`));
