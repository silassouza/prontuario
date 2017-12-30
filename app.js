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
var localStrategy = require('./authentication')
var middlewares = require('./middlewares')

// Init App
var app = express()

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs(middlewares.expressHandlebarsOptions))
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
app.use(expressValidator(middlewares.expressValidatorOptions))

// Connect Flash
app.use(flash())

// Global Vars
app.use(middlewares.setMessages)
app.use(middlewares.ensureAuth)

app.use('/', routes)
app.use('/users', users)
app.use('/cadastro', cadastro)

// Set Port
app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'))
})