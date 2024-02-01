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

  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    actions.get(id)
      .then(action => {
        if (action) {
          res.json(action);
        } else {
          res.status(404).json({ message: 'Action not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get action' });
      });
  });

  router.post('/', (req, res) => {
    const actionData = req.body;
  
    if (!actionData.project_id || !actionData.description || !actionData.notes) {
      res.status(400).json({ message: 'Missing required action field' });
    } else {
      actions.insert(actionData)
        .then(action => {
          res.status(201).json(action);
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to create new action' });
        });
    }
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    // Check for required fields
    if (!changes.project_id || !changes.description || !changes.notes) {
      res.status(400).json({ message: 'Missing required action field' });
    } else {
      actions.update(id, changes)
        .then(action => {
          if (action) {
            res.json(action);
          } else {
            res.status(404).json({ message: 'Action not found' });
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to update action' });
        });
    }
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    actions.remove(id)
      .then(deleted => {
        if (deleted) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: 'Action not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete action' });
      });
  });

module.exports = router;