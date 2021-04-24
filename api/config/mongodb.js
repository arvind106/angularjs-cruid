//Import the mongoose module
var mongoose = require('mongoose');
const config = require("./config");


//Set up default mongoose connection
//var mongoDB = 'mongodb://'+config.DB_HOST+':'+config.MONGO_DB_PORT+'/'+config.DB_DATABASE;

mongoose.connect(`mongodb://${config.MONGO_DB_HOST}:${config.MONGO_DB_PORT}/${config.MONGO_DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//mongoose.set("debug",true);
// Export the models connection
module.exports = mongoose;
