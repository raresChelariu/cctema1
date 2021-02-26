const http = require('http');
const url = require('url');
const APIrandomNo = require('./randomNoAPI')
const APIjoke = require('./jokeAPI')
const APIMeme = require('./randomMeme')
const homeResponse = require('./homeResponse')
const SaveToDB = require('./saveToDB')
const fs = require("fs");

let startTime;
let requestCount = 0;

const outputCallback = (response, data) => {
    response.end(data)
    const latency = Number(Date.now()) - startTime;
    const requestUID = `${Date.now()}####${++requestCount}`
    if (!(data instanceof String))
        data = JSON.stringify(data)
    SaveToDB.save(requestUID, data, latency)
}


http.createServer(async function (req, serverRes) {
    startTime = Number(Date.now());

    const purl = url.parse(req.url, true)
    switch (purl.pathname) {
        case '/':
            fs.readFile(__dirname + "/index.html", (err, data) => {
                if (err) {
                    serverRes.writeHead(404);
                    serverRes.write(err);
                    serverRes.end();
                    return;
                }
                serverRes.writeHead(200, {'Content-Type': 'text/html'});
                serverRes.write(data);
                serverRes.end();
            })
            break
        case "/random":
            serverRes.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
            APIrandomNo.requestRandomNo(outputCallback, serverRes)
            break
        case "/joke":
            serverRes.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
            APIjoke.requestRandomJoke(outputCallback, serverRes)
            break
        case "/meme":
            serverRes.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'})
            APIjoke.requestRandomJoke((finalRes, jokeObjString) => {
                APIMeme.getMeme(JSON.parse(jokeObjString), outputCallback, serverRes)
            }, serverRes);
            break
        case '/metrics':
            serverRes.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'})
            var text = fs.readFileSync('./storage/req.csv',
                {encoding: 'utf8', flag: 'r'});
            // var lines = text.trim().split(/\s*[\r\n]+\s*/g);
            // serverRes.write(`Average latency : ${SaveToDB.avgLatency(lines)}`)
            // serverRes.end(text)
            serverRes.end('To be implemented')
            break
        default:
            serverRes.writeHead(503, {'Content-Type': 'text/plain; charset=UTF-8'})
            serverRes.end("Bad url!")
            break
    }

}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
