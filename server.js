var http = require('http'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoogleStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    db;

//===================PASSPORT====================

//

//====================EXPRESS====================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova',
saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
});

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main',
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//===================ROUTES======================

//

//====================PORT=======================
var port = process.env.PORT || 5000,
    server = app.listen(port, function () {
    var port = server.address().port;
    console.log('MEAN RPG app listening at http://localhost:%s', port);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/static', express.static(__dirname + '/bower_components'));
app.use('/static/public', express.static(__dirname + '/public'));


//====================DATABASE===================

//

//====================CONNECTION=================
MongoClient.connect('mongodb://localhost:27017/rpg/', function (err, database) {
    if (!err) {
        console.log('Connected to database rpg.');
        db = database;
    } else {
        throw err;
    }
});


