const cluster = require('cluster');
const os = require('os');

const CPUS = os.cpus();
if (cluster.isMaster()) {
  CPUS.forEach(() => cluster.fork());
  cluster.on('listening', worker => {
    console.log(`Cluster ${worker.process.id} connected`);
  });
  cluster.on('disconnect', worker => {
    console.log(`Cluster ${worker.process.id} disconnected`);
  });
  cluster.on('Exit', worker => {
    console.log(`Cluster ${worker.process.id} is dead`);
    cluster.fork();
  })
} else {
  require('./index.js');
}