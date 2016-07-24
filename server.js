var http = require("http");
var fs = require("fs");
var express = require("express");
var app = express();
var expressValidator = require("express-validator");
var bodyParser = require('body-parser');

/*
	this is a list of url to save url which we
	might receive request later
*/
var url_lst = [
		'/',
		'/index.html',
		'/js/script.js',
		'/js/jquery-2.2.4.min.js',
		'/css/style.css'
];


/*
	Main function to start the server at 127.0.0.1:8080
*/

/*
function startServer() {
	var hostname = '127.0.0.1';
  	var port = 3000;
	var server = http.createServer(function(req, res) {
		res.statusCode = 200;
      	res.setHeader('Content-Type', 'text/html');
		switch (req.url) {
			// case of url '/' and '/a3.html'
			case url_lst[0]:
			case url_lst[1]:
				var content = fs.readFileSync('./index.html', 'utf8');
				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(content);
				break;

			// case of url '/assets/scripts/script.js' and
			// '/assets/scripts/jquery-2.2.4.min.js',
			case url_lst[2]:
			case url_lst[3]:
				var content = fs.readFileSync('.' + req.url, 'utf8');
				res.writeHead(200, {"Content-Type": "text/javascript"});
				res.end(content);

				break;

			// case of url '/assets/css/style.css'
			case url_lst[4]:
				var content = fs.readFileSync('.' + req.url, 'utf8');
				res.writeHead(200, {"Content-Type": "text/css"});
				res.end(content);

			// other request will be consider as 404 not found
			default:
      			res.statusCode = 404;
     			res.end("404 Not Found!");
    	}
	});
	server.listen(port, hostname);
};

// start the server
exports.startServer = startServer();
console.log('Server running at http://localhost:3000/');
*/

app.use(express.static(__dirname));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.use(expressValidator({
	customValidators: {
		isUserName: function(value) {
			var reg = /^[0-9A-Za-z_]{1,32}$/;

			return String(value).search(reg) >= 0;
		},

		isPassword: function(value) {
			var reg = /^[a-zA-Z0-9]{8,32}$/;
			return String(value).search(reg) >= 0;

		},

		isSamePwd: function(value) {
			//not implemented yet
		}
	}
}));

app.get('/', function(req, res) {
    res.render('index', {  // Note that .html is assumed.
        errors: ''
    });
});


app.post('/signup', function(req, res)
{
	req.assert('uname', 'Username is required').notEmpty();
	req.assert('pword', 'Password is required').notEmpty();

	req.checkBody('uname', 'Username is not valid').isUserName();
	req.checkBody('pword', 'Password is not valid').isPassword();


	var err = req.validationErrors();
    var mappedErrors = req.validationErrors(true);

    if (err) // If errors exist, send them back to the form:
    {
        var msgs = { "errors": {} };

        if ( mappedErrors.uname )
            msgs.errors.error_uname = mappedErrors.uname.msg;

        if ( mappedErrors.pword )
            msgs.errors.error_pword = mappedErrors.pword.msg;


        res.render('index', msgs);

    } else {
		//submit the data to database
		console.log("signup");
	}
});

var server = app.listen(3000, function()
{
  var port = server.address().port;
  console.log('Running on 127.0.0.1:%s', port);
});