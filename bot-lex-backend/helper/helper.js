const isFormData = (dataString) => {
    return /^media=[a-zA-Z\d]{0,}&extension=[a-zA-Z\d]{0,}&bucketKey=[a-zA-Z\d]+\.[a-zA-Z\d]{0,}$/.test(dataString)
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
module.exports = { isFormData, prepareResponse }