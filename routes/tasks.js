module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route('/tasks')
    .all(app.auth.authenticate())
    .get((req, res) => {
      // List all tasks
      Tasks.findAll({
        where: { user_id: req.user.id }
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      // Save new task
      req.body.user_id = req.user.id;
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });

  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      // Find a task
      Tasks.findOne({ where: {
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .put((req, res) => {
      // Update task
      Tasks.update(req.body, { where: {
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .delete((req, res) => {
      // Delete a task
      Tasks.destroy({ where: {
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });
  };
