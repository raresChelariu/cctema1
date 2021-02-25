const http = require('http');
const url = require('url');
const APIrandomNo = require('./randomNoAPI')
const APIjoke = require('./jokeAPI')

const outputCallback = (response, data) => {
    response.end(data)
}

http.createServer(function (req, res) {

    //res.end('ok bro')
    const purl = url.parse(req.url, true)
    switch (purl.pathname) {
        case "/random":
            res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
            APIrandomNo.requestRandomNo(outputCallback, res)
            break
        case "/joke":
            res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
            APIjoke.requestRandomJoke(outputCallback, res)
            break
        case "/meme":
            res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
            res.end("Here u get the photo!")
            break
        default:
            res.end("Home!")
            break
    }

}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
