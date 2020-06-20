const port = 27107; // replace with your port
// const dbName = 'your-cosmos-db-name-goes-here';
const dbName = 'localhost';
const replicaSet = 'allay';
const key = 'your-key-goes-here';

module.exports = {
  port,
  replicaSet,
  dbName,
  key
};
