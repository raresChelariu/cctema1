const baseAPIURL = 'https://www.random.org/integers';
const axios = require('axios')

const API_MAX_VALUE = 300;
const API_MIN_VALUE = 0

// Ex req: /integers/?num=1&min=0&max=300&col=1&base=10&format=plain&rnd=new

function getRandomNo(minVal = API_MIN_VALUE, maxVal = API_MAX_VALUE, count = 1) {
    minVal = minVal < API_MIN_VALUE ? API_MIN_VALUE : minVal;
    maxVal = maxVal > API_MAX_VALUE ? API_MAX_VALUE : maxVal;
    const requestPath = `/integers/?num=${count}&min=${minVal}&max=${maxVal}&col=1&base=10&format=plain&rnd=new`
    const requestURL = baseAPIURL + requestPath;
    console.log('Preparing random no req!')
    axios.get(requestURL).then(response => {
        console.log('Serving response for random no')
        console.log(`@@${response.data.url}@@`)
        console.log(`##${response.data.explanationString}##`)
    }).catch(error => {
        console.log(error);
    });
}

module.exports =
    {
        getRandomNo: getRandomNo,
        baseAPIURL: baseAPIURL,
        API_MAX_VALUE: API_MAX_VALUE,
        API_MIN_VALUE: API_MIN_VALUE
    }
