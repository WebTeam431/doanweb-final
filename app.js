var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var admin = require('./routes/admin');

var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, products.newImgName())
  }
})
var upload = multer({ storage: storage })

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public/')));

//Guest
app.use('/', indexRouter);
app.use('/screen', indexRouter)
app.use('/cpu', indexRouter)
app.use('/mouse', indexRouter)
app.use('/keyboard', indexRouter)
app.use('/productview', products.view)

//Login and register
app.use('/register', users.register)
app.use('/login', users.login)
app.post('/login-redirect', users.logincheck)
app.post('/register-redirect', users.registercheck)

//User
app.use('/profile', users.profileEdit)
app.post('/profileedit', users.profileEdited)
app.use('/cart', users.viewCart)
app.post('/addtocart', users.addtoCart)

//Admin
app.use('/admin', admin.dashboard)
app.use('/editproducts?', admin.editproducts)
app.use('/addproduct', products.addproduct)
app.use('/deleteproduct', admin.deleteproduct)
app.post('/add', upload.single('imagefile'), products.add)
app.use('/users', admin.userlist)
app.use('/edituser', admin.edituser)
app.use('/deleteuser', admin.deleteuser)
app.use('/createuser', admin.createuser)

app.post('/createduser', admin.createduser)
app.post('/editeduser', admin.editeduser)
app.post('/deleteduser', admin.deleteduser)
app.post('/edit', products.edit)
app.post('/delete?', products.delete)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
