require('dotenv').config()

export default {
  // https://alt-states-mimood.now.sh/login
  API_ENDPOINT: "http://localhost:8000/api",
  // API_ENDPOINT: "https://salty-falls-98776.herokuapp.com/api",
  TONE_ANALYZER_ENDPOINT: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21',
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY,
  TONE_ANALYZER_KEY: process.env.REACT_APP_TONE_ANALYZER_KEY,
  FACE_ENDPOINT: 'https://centralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion',
  FACE_KEY: process.env.REACT_APP_FACE_KEY
};