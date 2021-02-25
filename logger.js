let MODE_Debug = true

isDebug = () => { return MODE_Debug}
isProduction = () => { return !MODE_Debug}
setAsDebug = () => { MODE_Debug = true}
setAsProduction = () => { MODE_Debug = false}

log = (text) => { if (isDebug()) console.log(text) }

module.exports = {
    log : log,
    isDebug : isDebug,
    isProduction : isProduction,
    setAsDebug : setAsDebug,
    setAsProduction : setAsProduction
}