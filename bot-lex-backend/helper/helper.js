const isFormData = (dataString) => {
    return /^media=[a-zA-Z\d]{0,}&extension=[a-zA-Z\d]{0,}&bucketKey=[a-zA-Z\d]+\.[a-zA-Z\d]{0,}$/.test(dataString)
}

module.exports = { isFormData }