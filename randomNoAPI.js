const axios = require('axios')
const baseAPIURL = 'https://www.random.org';
const log = require('./logger.js').log

const API_MAX_VALUE = 300
const API_MIN_VALUE = 0

// Ex req: /integers/?num=1&min=0&max=300&col=1&base=10&format=plain&rnd=new

function requestRandomNo(callback, finalResponse, minVal = API_MIN_VALUE, maxVal = API_MAX_VALUE, count = 1) {
    minVal = minVal < API_MIN_VALUE ? API_MIN_VALUE : minVal
    maxVal = maxVal > API_MAX_VALUE ? API_MAX_VALUE : maxVal
    const requestPath = `/integers/?num=${count}&min=${minVal}&max=${maxVal}&col=1&base=10&format=plain&rnd=new`
    const requestURL = baseAPIURL + requestPath;

    axios.get(requestURL).then(response => {
        log('Serving response for random no')
        log(`@@${response.data + ' '}@@`)
        let randomNo = response.data.toString()
        callback(finalResponse, randomNo)
    }).catch(error => {
        log(error)
    })
}

module.exports =
    {
        requestRandomNo: requestRandomNo,
        baseAPIURL: baseAPIURL,
        API_MAX_VALUE: API_MAX_VALUE,
        API_MIN_VALUE: API_MIN_VALUE
    }
