var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var reactCookie = require('react-cookie');
var fs = require('fs');
var gm = require('gm');
// Database stuff
var mongoose = require('mongoose');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var config = require('./config');
var Product = require('./src/models/product');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', express.static(__dirname + '/public'));

// Cookie stuff
app.use(cookieParser());

// Stormpath stuff
app.use(stormpath.init(app, {
  expand: {
    customData: true,
    groups: true
  },
  web: {
   me: {
    expand: {
       groups: true,
       customData:true
     }
   },
   spa: {
      enabled: true,
      view: path.join(__dirname, 'views/index.html')
    }
  }
}));

// MongoDB  stuff
mongoose.connect(config.database);
var dbCon = mongoose.connection;
dbCon.on('error', function(){
  console.info('Error: Could not connect to MongoDB');
});
dbCon.once('open', function(){
  console.info('MongoDB connected');
});

// POST /me --> Stormpath user
app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({ message: message, status: 400 });
    res.end();
  }

  function saveAccount () {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;
    if(req.body.address1) {
      req.user.customData['address1'] = req.body.address1;
      req.user.customData.save();
    }
    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message);
      }
      res.end();
    });
  }
  if (req.body.password) {
    var application = req.app.get('stormpathApplication');

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }

      req.user.password = req.body.password;

      saveAccount();
    });
  } else {
    saveAccount();
  }
});

// GET /api/products
// gets all products
app.get('/api/products', function(req, res, next){
  Product.find().exec(function(err, products){
    if(err) return next(err);
      res.send(products);
  });
});
// GET /api/products/search
// Looks up a product by name
app.get('/api/products/search', function(req, res, next) {
  var searchQuery = new RegExp(req.query.name, 'i');
  Product.
  find().
  or([{ name: searchQuery }, {description: searchQuery}]).
  limit(20).
  exec(function(err, products) {
    if (err) return next(err);

    if (!products) {
      return res.status(404).send({ message: 'Product not found.' });
    }

    res.send(products);
  });
});

// GET /api/products/:id
// Returns detailed product information
app.get('/api/products/:id', function(req, res, next){
  var id = req.params.id;

  Product.findById((id), function(err, product){
    if(err) return next(err);

    if(!product) {
      return res.status(404).send({ message : 'Product not found.'});
    }

    res.send(product);
  });
});

// POST /upload
// Uploads form & image path to cloud
// Images are stored under /upload
app.post('/api/upload', upload.array('photos[]'), function(req, res, next){
  var files = req.files;
  var productName = req.body.name;
  var product = new Product({
    name: productName,
    description: req.body.description,
    category: req.body.category,
    country: req.body.country,
    price: req.body.price
  });
  // Images
    for(var i = 0; i< files.length; i++) {
      product.paths[i] = 'uploads/' + files[i].filename;
      product.pathsThumb[i] = 'uploads/' + files[i].filename + 'thumb';
      var baseFilename = __dirname + '/public/uploads/' + files[i].filename;
        gm(baseFilename)
        .thumbnail(150, 150)
        .write(baseFilename + 'thumb', function(err) {
          if(err) console.log(err);
        })
    };

  product.save(function(err) {
    if (err) return next(err);
    res.send({ message: productName + ' has been added successfully!' });
  });
});


// POST /api/remove
// Removes a given product
app.post('/api/remove', function(req, res, next){
  var id = req.body.id;
  Product.findOne({ _id : id}, function(err, product){
    if(err) return next(err);

    if(!product) {
      return res.status(404).send({ message : 'Product not found.'});
    }
    product.remove();
    Product.find().exec(function(err, products){
    if(err) return next(err);
    res.send(products);
    });
  });
});


// other requests
app.get('*', function (req, res) {
  reactCookie.plugToRequest(req, res);
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Start server when stormpath is ready
app.on('stormpath.ready', function () {
  console.log('Stormpath Ready');

  app.listen(3000, '0.0.0.0', function (err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:3000');
  });
});
