const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();

// Certificate
const privateKey = fs.readFileSync(path.join(__dirname + '/dist/certs/private.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname + '/dist/certs/certificate.crt'), 'utf8');
const ca = fs.readFileSync(path.join(__dirname + '/dist/certs/ca_bundle.crt'), 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use(express.static(__dirname, { dotfiles: 'allow' } ));

const port = process.env.PORT || 8080;
app.listen(port);

app.use((req, res, next) => {
	    if(req.protocol === 'http') {
	      res.redirect(301, `https://${req.headers.host}${req.url}`);
	    }
	    next();
	 });


const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8081);





// const express = require('express');
// const serveStatic = require('serve-static');
// const path = require('path');
// const fs = require('fs');
// const http = require('http');
// const https = require('https');

// const app = express();


// const hostname = 'countalk.com';
// const httpsPort = 443;

// // Certificate
// const privateKey = fs.readFileSync(path.join(__dirname + '/dist/certs/private.key'), 'utf8');
// const certificate = fs.readFileSync(path.join(__dirname + '/dist/certs/certificate.crt'), 'utf8');
// const ca = fs.readFileSync(path.join(__dirname + '/dist/certs/ca_bundle.crt'), 'utf8');

// const credentials = {
// 	key: privateKey,
// 	cert: certificate,
// 	ca: ca
// };


// //here we are configuring dist to serve app files
// app.use('/', serveStatic(path.join(__dirname, '/dist')));

// // this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function (req, res) {
// 	res.sendFile(path.join(__dirname, '/dist/index.html'));
// });

// app.use(express.static(__dirname, { dotfiles: 'allow' } ));

// app.use((req, res, next) => {
//     if(req.protocol === 'http') {
//       res.redirect(301, `https://${req.headers.host}${req.url}`);
//     }
//     next();
//  });

// // const port = process.env.PORT || 8080


// // Starting both http & https servers
// // const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// // httpServer.listen(8080, () => {
// // 	console.log('HTTP Server running on port 8080');
// // });

// httpsServer.listen(httpsPort, hostname)
// // httpsServer.listen(443, () => {
// // 	console.log('HTTPS Server running on port 443');
// // });
