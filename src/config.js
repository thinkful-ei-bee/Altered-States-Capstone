export default {
  API_ENDPOINT: "https://salty-falls-98776.herokuapp.com/api", //"http://localhost:8000/api",
  TOKEN_KEY: process.env.REACT_APP_API_KEY || "anyOtherToken", // process.env.REACT_APP_API_KEY
  TONE_ANALYZER_ENDPOINT: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21', // process.env.REACT_APP_API_KEY
  TONE_ANALYZER_KEY: 'iuBn-mTorlcGgfLdUn4ct2Y91Rs-5ZFPqSmHzqadTaQ0',
  FACE_ENDPOINT: 'https://centralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion',
  FACE_KEY: '4a74743af5574c139bf618409ba8aef3'
};
