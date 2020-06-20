const mongoose = require('mongoose');
const env = require('./env/environment');

mongoose.Promise = global.Promise;

// const mongoUri = `mongodb://${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl/=true`;
const mongoUri = `mongodb://${env.host}:${env.port}/${env.db}?replicaSet=${env.replicaSet}`;

const options = {useNewUrlParser: true, 
	             useUnifiedTopology: true}

function connect() {
  // return mongoose.connect(mongoUri, { auth: { user: env.dbName, password: env.key }});
  mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});;
}

module.exports = {
  connect,
  mongoose
};
