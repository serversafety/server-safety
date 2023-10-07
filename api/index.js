#!/usr/bin/env node
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3001;

const corsOptions = { origin: true };

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }));
app.use(cors(corsOptions));

transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post('/api/sendresults', async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: 'sergykt1992@mail.ru',
      subject: `Норма выдачи по ЕТН`,
      text: '',
      attachments: {
        filename: 'Норма выдачи по ЕТН.pdf',
        content: req.body,
      }
    });
    console.log('Результаты отправлены');
    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
});

const start = async () => {
  try {
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}.`);
  } catch (err) {
    console.error(err);
  }
};

start();
