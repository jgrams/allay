const mongoose = require('mongoose');
const env = require('./env/environment');

mongoose.Promise = global.Promise;

// const mongoUri = `mongodb://${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl/=true`;
const mongoUri = `mongodb://localhost:27017/${env.dbName}`;

function connect() {
  return mongoose.connect(mongoUri, { auth: { user: env.dbName, password: env.key }});
}

module.exports = {
  connect,
  mongoose
};
