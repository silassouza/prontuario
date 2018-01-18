try{ require('dotenv').config() } catch(ex){}
var os = require('os')

var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var flash = require('connect-flash')
var passport = require('passport')
var session = require('express-session')
var expressValidator = require('express-validator')

var db = require('./models/db')

var routes = require('./routes/index')
var users = require('./routes/users')
var cadastro = require('./routes/cadastro')
var consultas = require('./routes/consultas')

var localStrategy = require('./authentication')
var middl = require('./middlewares')

// Init App
var app = express()

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs(middl.expressHandlebarsOptions))
app.set('view engine', '.hbs')

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Express Session
app.use(session({ secret: 'secret', saveUninitialized: true, resave: true }))

// Passport init
app.use(passport.initialize())
app.use(passport.session())

// Express Validator
app.use(expressValidator(middl.expressValidatorOptions))

// Connect Flash
app.use(flash())

// Global Vars
app.use(middl.setMessages)
app.use(middl.ensureAuth)

//Error handling
// app.use(middl.logErrors)
// app.use(middl.clientErrorHandler)
// app.use(middl.errorHandler)

var route = express.Router();

// All our services are under the /ping context
app.use('/ping', route);

// Start defining routes for our app/microservice

// A route that dumps hostname information from pod
route.get('/', function(req, res) {
    res.send('Hi! I am running on host ->');
});

app.use('/', routes)
app.use('/users', users)
app.use('/cadastro', cadastro)
app.use('/consultas', consultas)

// Set Port
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
var address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(port, address, function () {
  console.log( "Listening on " + address + ", port " + port )
});

module.exports = app;
