const http = require('http');

const server = http.createServer(function (req, res) {
    const output = JSON.stringify({
	ipaddress: req.headers.host,
	language:  req.headers['accept-language'],
	software:  req.headers['user-agent']
    });

    res.writeHead(200, {
	'Content-Length': output.length,
	'Content-Type':   'application/json'
    });
    res.end(output);
});

server.listen(process.env.PORT);
