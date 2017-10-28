////import the http module
//var http = require ('http');
// handle sending requests and returning responses
//function handeRequests(req, res) {
//// return string
// res.end('Hello world!');
//}
//// create the server
//var server = http.createServer(handeRequests)
//// start server andlisten on part x
//server.listen(8080, function() {
//	console.log('Listening on port 8080');
//});


//////////////EXPRESS////////////////

var express = require('express');
var nodemailer = require("nodemailer");
var expressLayouts = require('express-ejs-layouts');
var app = express();
var port = 8080;

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "johnsonmappingcompany@gmail.com",
        pass: "Anthony88!"
    }
});

//use ejs and express Layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// route our app
var router = require('./app/routes');
app.use('/', router);



// set static files (css and image, etc) location
app.use(express.static(__dirname + '/public'));

//
app.get('/',function(req,res){
res.sendfile('index.ejs');
});

app.get('/send',function(req,res){
//code to send e-mail
	var mailOptions={
  	 	to : req.query.to,
   		subject : req.query.subject,
  	 	text : req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		}else{
		console.log("Message sent: " + response.message);
		res.end("sent");
		}
});
});

// start the server
app.listen (port, function() {
	console.log('app started')
});

