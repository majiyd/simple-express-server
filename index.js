import express from 'express';
import cors from 'cors';
import router from './routes';
import db from './config/database';

const app = express();
app.use(express.json());
app.use(cors());


db.authenticate()
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

app.use('/', router);
app.use(async (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Resource not found',
    errors: ['Resource not found'],
  });
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on localhost:${port}`));
