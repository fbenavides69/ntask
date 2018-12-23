describe('Routes: Index', () => {
  describe('GET /', () => {
    it('Returns the API status', done => {
      request.get('/')
      .expect(200)
      .end((err, res) => {
        const expected = {status: 'NTask API'};
        expect(res.body).to.eql(expected);
        done(err);
      });
    });
  });
});
