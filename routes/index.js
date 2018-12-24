module.exports = app => {
  /**
   * @api {get} / API Status
   * @apiGroup Status
   * @apiSuccess {String} status API Status' message
   * @apiSuccessExample {join} Success
   * HTTP/1.1 200 OK
   * {"status": "NTask API"}
   */
  return app.get('/', (req, res) =>
    res.json({ status: 'NTask API' })
  );
};
