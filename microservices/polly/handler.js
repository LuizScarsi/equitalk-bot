const PollyService = require("./services/PollyService")

async function handler(event) {
    const texto = JSON.parse(event.body).body
    const pollyService = new PollyService()
    const url = await pollyService.textToSpeech(texto)
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            response: url,
        }),
    }
    return response
}

module.exports = { handler }