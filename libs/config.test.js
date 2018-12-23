module.exports = {
    database: 'ntask',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: 'ntask.sqlite',
      logging: false,
      define: {
        unserscored: true
      },
      operatorsAliases: false
    },
    jwtSecret: '-^cx(!8&!&b1j^__)im1gd%to5bxlij&ws!@pxi)_-+c4x#+w!',
    jwtSession: { Session: false }
  };
  