const express = require('express');
const { requireAuth } = require('./middleware');
const { Quote } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

router.get('/', requireAuth, (req, res) => {
  Quote.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, quotes) => {
    if (err) {
      res.status(400).send({ message: 'Get users failed', err });
    } else {
      res.send({ message: 'Quotes retrieved successfully', quotes });
    }
  });
});

router.post('/add', requireAuth, (req, res) => {
  if (!req || !req.body || !req.body.quote || !req.body.character) {
    res.status(400).send({ message: 'Quote and Character required' });
  }

  const newQuote = Quote(req.body);

  newQuote.save((err, savedQuote) => {
    if (err || !savedQuote) {
      res.status(400).send({ message: 'Create quote failed', err });
    } else {
      res.send({ message: 'Quote created successfully', quote: savedQuote.hide() });
    }
  });
});

router.delete('/', requireAuth, (req, res) => {
  Quote.findByIdAndRemove(req.body.id, err => {
    if (err) {
      res.status(400).send({ message: 'Delete quote failed', err });
    } else {
      res.send({ message: 'Quote successfully deleted' });
    }
  });
});
