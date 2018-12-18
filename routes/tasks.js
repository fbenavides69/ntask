module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route('/tasks')
    .get((req, res) => {
      // List all tasks
      Tasks.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      // Save new task
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });

  app.route('/tasks/:id')
    .get((req, res) => {
      // Find a task
      Tasks.findOne({ where: req.params })
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        })
    })
    .put((req, res) => {
      // Update task
      Tasks.update(req.body, { where: req.params })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .delete((req, res) => {
      // Delete a task
      Tasks.destroy({ where: req.params} )
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });
  };
