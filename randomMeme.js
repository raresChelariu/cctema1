const axios = require('axios')
const APIrandomNo = require('./randomNoAPI')
const FormData = require('form-data');

const APIbaseURL = 'https://api.imgflip.com'
const APIpath = '/caption_image'
const APIURL = APIbaseURL + APIpath

function getConfig(jokeObj) {
    const data = new FormData();
    data.append('template_id', '8072285');
    data.append('username', 'rareschelariu')
    data.append('password', 'abcdefghi')
    if (jokeObj.type === 'single') {
        data.append('text0', jokeObj.single)
        data.append('text1', '')
    } else {
        data.append('text0', jokeObj.setup)
        data.append('text1', jokeObj.delivery)
    }


    return {
        method: 'post',
        url: APIURL,
        headers: {
            'Cookie': '__cfduid=dd9046437ae861fd4d086b2e4108d0e0e1614336866; claim_key=NxdQ3xrCe6oZWOd1DlWfcRKBNPcug5qZ',
            ...data.getHeaders()
        },
        data: data
    }
}

const getMeme = (jokeObj, onResponseCallback, finalResponse) => {
    if (jokeObj === undefined || !('type' in jokeObj))
        return 'bad joke obj';
    const config = getConfig(jokeObj)
    axios(config).then((res) => onResponseCallback(finalResponse, JSON.stringify(res.data)))
}


module.exports = {
    getMeme: getMeme
}