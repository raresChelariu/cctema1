const http = require('http');
const url = require('url');
const randomNoAPI = require('./randomNoAPI')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
    const purl = url.parse(req.url, true)
    res.end('ok bro')
    return
    switch (purl.pathname) {
        // case "/random":
        //     randomNoAPI.getRandomNo();
        //     res.end("Heyy!")
        //     break
        case "/joke":
            res.end("Here u get the laughs!")
            break
        case "/meme":
            res.end("Here u get the photo!")
            break
        default:
            res.end("Home!")
            break
    }

}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
