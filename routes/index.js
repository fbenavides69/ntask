module.exports = app => {
  return app.get('/', (req, res) =>
    res.json({status: 'NTask API OK!'})
  );
};
