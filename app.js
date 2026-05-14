const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/read', async (req, res) => {
  let users = await userModel.find();
  res.render('read', { users });
});

app.get('/edit/:id', async (req, res) => {
  let editedUser = await userModel.findOne({ _id: req.params.id });
  res.render('edit', { editedUser });
});

app.post('/update/:id', async (req, res) => {
  let { name, email, image } = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, image },
    { new: true },
  );
  res.redirect('/read');
});

app.post('/create', async (req, res) => {
  let createdUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
  });
  res.redirect('/read');
});

app.get('/delete/:id', async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect('/read');
});

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});
