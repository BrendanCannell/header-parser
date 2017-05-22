const http = require('http');

function getIpAddress(req) {
    return req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;
}

function getLanguage(req) {
    const acceptLanguage = req.headers['accept-language'];
    
    return acceptLanguage ? acceptLanguage.match(/[a-zA-Z-]*/)[0] : null;
}

function getSoftware(req) {
    const userAgent = req.headers['user-agent'];
    const software  = userAgent.match(/\([^\)]*\)/)[0];
    
    return software ? software.slice(1, software.length - 1) : null;
}

const server = http.createServer(function (req, res) {
    const output = JSON.stringify({
	ipaddress: getIpAddress(req),
	language:  getLanguage(req),
	software:  getSoftware(req)
    });

    res.writeHead(200, {
	'Content-Length': output.length,
	'Content-Type':   'application/json'
    });
    res.end(output);
});

server.listen(process.env.PORT);
