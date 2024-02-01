// Write your "actions" router here!
const express = require('express');
const actions = require('./actions-model'); 
const router = express.Router();

router.get('/', (req, res) => {
    actions.get()
      .then(actions => {
        res.json(actions);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get actions' });
      });
  });

module.exports = router;