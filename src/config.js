export default {
  // ttps://alt-states-mimood.now.sh/login
  API_ENDPOINT: "http://localhost:8000/api",
  TONE_ANALYZER_ENDPOINT: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21',
  TOKEN_KEY: "anyOtherToken", // process.env.REACT_APP_API_KEY
  TONE_ANALYZER_KEY: 'iuBn-mTorlcGgfLdUn4ct2Y91Rs-5ZFPqSmHzqadTaQ0',
  FACE_ENDPOINT: 'https://centralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion',
  FACE_KEY: '4a74743af5574c139bf618409ba8aef3',

  // SELFIE_ENDPOINT: 'https://833751676689166:hXnTe8q-dLDFJo9CL4c5ttqQltI@api.cloudinary.com/v1_1/mood-flux/resources/image/upload?public_ids=selfies/',
  SELFIE_ENDPOINT: 'https://api.cloudinary.com/v1_1/mood-flux/resources/image/upload?public_ids=selfies/',

  SELFIE_KEY: '833751676689166',
  SELFIE_SECRET: 'hXnTe8q-dLDFJo9CL4c5ttqQltI'
};
