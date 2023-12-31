const { INVALID_FORMAT } = require("./core/config")
const { textToSpeech } = require("./handlers/textToSpeech")
const { speechToText } = require("./handlers/speechToText")
const { imageToText } = require("./handlers/imageToText")
const { imageToSpeech } = require("./handlers/imageToSpeech")
const { prepareResponse } = require("./helper/helper")

const intentHandlers = {
    "Text-to-Speech": textToSpeech,
    "Speech-to-Text": speechToText,
    "Image-to-Text": imageToText,
    "Image-to-Speech": imageToSpeech
}

const handler = async (event, context) => {
    try {
        const body = event["sessionState"]["intent"]
        const intentName = body["name"]
        const messageFromUser = body["slots"]["texto"]["value"]["originalValue"]
        
        // Validate user input
        if (!messageFromUser || messageFromUser == "") {
            throw new Error(INVALID_FORMAT)
        }
        
        // Execute intent handler based on the intent name
        const messageToUser = await intentHandlers[intentName](messageFromUser)
        
        return prepareResponse(event, messageToUser)
    } catch {
        return prepareResponse(event, "An error ocurred in amazon Lex")
    }
}

module.exports = { handler }