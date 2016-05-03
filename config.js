process.env.MONGO_URI = 'mongodb://timbam:timbam@ds015889.mlab.com:15889/heroku_5ndtzjf7';
module.exports = {
  database: process.env.MONGO_URI || 'localhost/nef'
};