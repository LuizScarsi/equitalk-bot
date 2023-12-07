const isAudio = (dataString) => {
    return /^media=[a-z]{5}&extension=(mp3)&bucketKey=[a-z\d]+\.(mp3){1}$/.test(dataString)
}

const isFormData = (dataString) => {
    return /^media=[a-zA-Z\d]{0,}&extension=[a-zA-Z\d]{0,}&bucketKey=[a-zA-Z\d]+\.[a-zA-Z\d]{0,}$/.test(dataString)
}

const isImage = (dataString) => {
    return /^media=[a-z]{5}&extension=(jpeg)&bucketKey=[a-z\d]+\.(jpeg){1}$/.test(dataString)
}

function prepareResponse(event, msgText) {
    
    const response = {
        "sessionState": {
            "dialogAction": {
                "type": "Close"
            },
            "intent": {
                "name": event['sessionState']['intent']['name'],
                "slots": event['sessionState']['intent']['slots'],
                "state": "Fulfilled"
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": msgText
            }
        ]
    }
    return response
}
module.exports = { isFormData, prepareResponse, isAudio, isImage }