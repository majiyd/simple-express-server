import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import Response from './utils/response';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', router);
app.use(async (req, res) => {
  Response.notFound(res, 'Resource not found', ['Resource not found']);
});

// PORT
const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on localhost:${port}`));
