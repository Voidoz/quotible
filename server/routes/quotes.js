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

router.post('/', requireAuth, (req, res) => {
  req.body.user = req.user.id;

  const newQuote = Quote(req.body);

  newQuote.save((err, savedQuote) => {
    if (err) {
      res.status(400).send({ message: 'Create quote failed', err });
    } else {
      res.send({ message: 'Quote created successfully', quote: savedQuote.hide() });
    }
  });
});

router.put('/', requireAuth, (req, res) => {
  Quote.findById(req.body.id, { __v: 0, user: 0 }, (err, quote) => {
    if (err) {
      res.status(400).send({ message: 'Update quote failed', err });
    } else {
      quote.text = req.body.text;
      quote.updated_at = Date.now();
      quote.save((err, savedQuote) => {
        if (err) {
          res.status(400).send({ message: 'Update quote failed', err });
        } else {
          res.send({ message: 'Updated quote successfully', quote: savedQuote.hide() });
        }
      });
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
