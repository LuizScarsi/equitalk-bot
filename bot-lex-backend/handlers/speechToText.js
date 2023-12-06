const axios = require("axios")
const { isAudio } = require("../helper/helper")
const { SPEECH_FORMAT_EXPECTED, OBJECT_URL, SPEECH_TO_TEXT_API } = require("../core/config")

const speechToText = async (message) => {
    try {
        let response = SPEECH_FORMAT_EXPECTED
        
        if (isAudio(message)) {
            const bucketKey = new URLSearchParams(message).get("bucketKey")
            const url = `${OBJECT_URL}/${bucketKey}`
            
            const apiResponse = await axios.post(SPEECH_TO_TEXT_API, { body: url })
            
            response = apiResponse["data"]["response"]
        }
        
        return response
    } catch (error) {
        throw new Error("An error ocurred in speechToText")
    }
}
module.exports = { speechToText }