// Write your "projects" router here!
const express = require('express');
const projects = require('./projects-model');
const router = express.Router();

router.get('/', (req, res) => {
    projects.get()
      .then(projects => {
        res.json(projects);
        console.log('projects:', projects)
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get projects' });
      });
  });

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    projects.get(id)
      .then(project => {
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get project' });
      });
  });

module.exports = router;
