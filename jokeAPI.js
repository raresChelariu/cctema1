const axios = require('axios')
const log = require('./logger.js').log
const APIrandomNo = require('./randomNoAPI')

const baseAPIURL = 'https://v2.jokeapi.dev'


// Ex req: /joke/Any?idRange=70
function requestJoke(callback, finalResponse, id) {
    const requestPath = `/joke/Any?idRange=${id}`
    const requestURL = baseAPIURL + requestPath

    axios.get(requestURL).then(response => {
        log('Serving response for random joke')
        log(requestURL)
        //log(`@@${JSON.stringify(response.data) + ' '}@@`)
        callback(finalResponse, JSON.stringify(extractJoke(response.data)))
    }).catch(error => {
        log(error)
    })
}

function extractJoke(obj) {
    if (obj.type === 'single' && 'joke' in obj) {
        return {
            type: obj.type,
            single: obj.joke
        }
    }
    return {
        type: obj.type,
        setup: obj.setup,
        delivery: obj.delivery
    }
}

function requestRandomJoke(outputCallback, finalResponse) {
    let requestJokeRandomNoCallback = (finalResponse, randomNo) => {
        requestJoke(outputCallback, finalResponse, randomNo)
    }
    APIrandomNo.requestRandomNo(requestJokeRandomNoCallback, finalResponse)
}

module.exports = {
    requestRandomJoke: requestRandomJoke
}