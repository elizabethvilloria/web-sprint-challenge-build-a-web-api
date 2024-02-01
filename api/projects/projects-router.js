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

  router.post('/', (req, res) => {
    const projectData = req.body;
  
    if (!projectData.name || !projectData.description) {
      res.status(400).json({ message: 'Missing project name or description' });
    } else {
      projects.insert(projectData)
        .then(project => {
          res.status(201).json(project);
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to create new project' });
        });
    }
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    // Check for required fields
    if (!changes.name || !changes.description) {
      res.status(400).json({ message: 'Missing project name or description' });
    } else {
      projects.update(id, changes)
        .then(project => {
          if (project) {
            res.json(project);
          } else {
            res.status(404).json({ message: 'Project not found' });
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to update project' });
        });
    }
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    projects.remove(id)
      .then(deleted => {
        if (deleted) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete project' });
      });
  });

  router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
  
    projects.getProjectActions(id)
      .then(actions => {
        if (actions) {
          res.json(actions);
        } else {
          res.status(404).json({ message: 'Project not found or no actions' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get actions for project' });
      });
  });
  
module.exports = router;
