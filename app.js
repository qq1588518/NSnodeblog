/**
 *
 * NSnodeblog
 * @author: hughnian <hugh.nian@163.com>
 *
 * ||    || ||\\   ||
 * ||----|| || \\  ||
 * ||----|| ||  \\ ||
 * ||    || ||   \\||
 *
 */
var http = require('http');
var express = require('express');
var routes = require('./routes');
var fs = require('fs');
var path = require('path');
var config = require('./config').config;
var routes = require('./routes');
//var MongoSorge = require('connect-mongo')(express);

var app = express();
app.set('port', config.port || 3000);
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: config.upload_dir }));//上传文件目录
app.use(express.cookieParser());
app.use(express.session({
    secret: config.session_secret,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
}));
app.use(app.router);

http.createServer(app).listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});

// routes
routes(app);

module.exports = app;