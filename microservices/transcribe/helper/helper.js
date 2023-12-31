const crypto = require("crypto");
const axios = require("axios");

function createHash(str) {
  const hash = crypto.createHash("sha256");
  hash.update(str);
  return hash.digest("hex");
}

async function getTranscriptionJob(url) {
  let transcript = "";

await axios
  .get(url)
  .then((response) => {
    const jsonData = response.data;
    transcript = jsonData.results.transcripts[0].transcript;
  })
  .catch((error) => {
    console.error("Erro ao obter dados JSON:", error);
  });
  console.log("Transcript retorno:", transcript);
  return transcript;
}

module.exports = { createHash, getTranscriptionJob };