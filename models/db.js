var mongoose = require('mongoose');

var mongoUser =  process.env.MONGODB_USER,
    mongoDatabase = process.env.MONGODB_DATABASE,
    mongoPassword = process.env.MONGODB_PASSWORD,
    mongoHost = process.env.APP_SERVICE_HOST,
    mongoPort = process.env.APP_SERVICE_PORT,
    mongoURL = 'mongodb://';

mongoURL += mongoUser + ':' + mongoPassword + '@';
mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

//require('./user');