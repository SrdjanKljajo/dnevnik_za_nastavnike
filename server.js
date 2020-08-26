const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const userRouter = require('./routes/User');
app.use('/user', userRouter);

app.post('/kontakt', (req, res) => {
  console.log(req.body);
  let data = req.body;

  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'unesite email adresu na koju želite da primite poruku',
      pass: 'unesite šifru email adrese na koju želite da primite poruku',
    },
  });

  let mailOptions = {
    from: data.email,
    to: 'unesite email adresu na koju želite da primite poruku',
    subject: `Poruka od ${data.name}`,
    html: `
    <h3>Podaci o pošiljaocu: </h3>
    <ul>
      <li>Ime: ${data.name}</li>
      <li>Prezime: ${data.lastname}</li>
      <li>Email: ${data.email}</li>
    </ul>

    <h3>Poruka</h3>
    <p>${data.message}</p>
    `,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send('success');
    }
  });

  smtpTransport.close();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Atlas connected...'))
  .catch(err => console.log('Unable to connect...'));

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
