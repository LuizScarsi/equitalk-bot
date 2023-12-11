const {
    PollyClient,
    StartSpeechSynthesisTaskCommand,
    GetSpeechSynthesisTaskCommand,
} = require("@aws-sdk/client-polly")
const { BUCKET_NAME } = require("../core/config")

class PollyService {
    constructor() {
        this.polly = new PollyClient()
    }
    
    async textToSpeech(text) {
        const speechParams = {
            Text: text,
            TextType: "text",
            OutputFormat: "mp3",
            VoiceId: "Camila",
            LanguageCode: "pt-br",
            OutputS3BucketName: BUCKET_NAME,
        }
    }
}