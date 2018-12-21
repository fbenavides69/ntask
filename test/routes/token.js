const NAME = 'John';
const EMAIL = 'john@mail.net';
const PASSWORD = '12345';

describe('Routes: Token', () => {
  const Users = app.db.models.Users;
  describe('POST /token', () => {
    beforeEach(done => {
      Users
        .destroy({ where: {} })
        .then(() => Users.create({
          name: NAME,
          email: EMAIL,
          password: PASSWORD
        }))
        .then(() => done());
    });
    describe('status 200', () => {
      it('Returns authenticated user token', done => {
        request.post('/token')
          .send({
            email: EMAIL,
            password: PASSWORD
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys('token');
            done(err);
          });
      });
    });
    describe('status 401', () => {
      it('Throws error when password is incorrect', done => {
        request.post('/token')
          .send({
            email: EMAIL,
            password: 'WRONG_PASSWORD'
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('Throws error when email does not exist', done => {
        request.post('/token')
          .send({
            email: 'wrong@mail.net',
            password: PASSWORD
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('Throws error when email and password are blank', done => {
        request.post('/token')
          .send({
            email: '',
            password: ''
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('Throws error when email and password are not present', done => {
        request.post('/token')
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});
