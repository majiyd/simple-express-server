import express from 'express';

const app = express();
app.use(express.json());

const contacts = [
  { id: 1, name: 'jean' },
  { id: 2, name: 'saul' },
  { id: 3, name: 'dave' },
];

app.get('/', async (req, res) => {
  res.status(200).send('Welcome');
});

app.get('/contacts', async (req, res) => {
  res.status(200).send(contacts);
});

app.post('/contacts', async (req, res) => {
  try {
    if (!req.body?.name) {
      res.status(400).send('Contact must have a name');
      return;
    }
    const contact = {
      id: contacts.length + 1,
      name: req.body.name,
    };
    contacts.push(contact);
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send(`Operation failed with error: ${error.message}`);
  }
});


app.get('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === Number(id));
  contact
    ? res.status(200).send(contact)
    : res.status(404).send(`Contact with id: ${id} not found`);
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on localhost:${port}`));
