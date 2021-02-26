const fs = require('fs')

const save = (requestUID, requestInfo, latency) => {
    fs.appendFile('./storage/req.csv', `${requestUID}~${requestInfo}~${latency}\n`, (err) => {
        if (err) {
            return console.log(err)
        }
        console.log('The file was saved!')
    })
}
const avgLatency = (lines) => {
    var sum = 0;
    for (var i = 0; i < lines.length; i++)
        sum += parseInt(lines.split('~')[2])
    return sum/lines.length
}
module.exports = {
    save : save,
    avgLatency : avgLatency
}