import contacts from '../../data';

const getOne = async (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === Number(id));
  contact
    ? res.status(200).send(contact)
    : res.status(404).send(`Contact with id: ${id} not found`);
};

const getAll = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Contacts fetched successfully',
    data: contacts,
  });
};
export { getOne, getAll };
