require("dotenv").config();

var config = {
  INIT_PORT: 9000,
  MONGO_USERNAME: process.env.MONGO_USERNAME ||'username',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'password',
  MONGO_CLUSTER: process.env.MONGO_CLUSTER || 'cluster',
  MONGO_COLLECTION: process.env.MONGO_COLLECTION || 'collection'
};
module.exports = {config};
