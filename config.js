process.env.MONGO_URI = 'mongodb://timbam:timbam@ds249025.mlab.com:49025/importpage'
module.exports = {
  database: process.env.MONGO_URI || 'localhost/nef'
};
