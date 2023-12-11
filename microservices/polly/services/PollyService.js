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
        
        try {
            const command = new StartSpeechSynthesisTaskCommand(speechParams)
            const data = await this.polly.send(command)
            const taskId = data.SynthesisTask.TaskId
            console.log(("Task ID:", taskId))
            while (true) {
                const getSpeechSynthesisTaskParams = {
                    TaskId: taskId,
                }
                const getSpeechSynthesisTaskCommand = new GetSpeechSynthesisTaskCommand(getSpeechSynthesisTaskParams)
                const dataTask = await this.polly.send(getSpeechSynthesisTaskCommand)
                const taskStatus = dataTask.SynthesisTask.taskStatus
                
                if (taskStatus == "completed") {
                    const url = dataTask.SynthesisTask.OutputUri
                    return url
                } else if (taskStatus == "failed") {
                    const response = "O trabalho de transcrição falhou ou foi cancelado."
                    return response
                } else {
                    console.log("Ainda em andamento. Status:", taskStatus)
                    await new Promise(resolve => setTimeout(resolve, 2000))
                }
            }
        } catch (error) {
            console.error("Erro inesperado", error)
            return "Erro inesperado"
        }
    }
}

module.exports = PollyService