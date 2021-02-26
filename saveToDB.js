const fs = require('fs')

const save = (requestUID, requestInfo, latency) => {
    fs.writeFile('./storage/req.csv', `${requestUID},${requestInfo},${latency}\n`, (err) => {
        if (err) {
            return console.log(err)
        }
        console.log('The file was saved!')
    })
}
module.exports = {
    save : save
}