import config from '../config'
import TokenService from '../services/token-service';

const EntryService = {
  postEntryToWatson(entry) {
    const encodedKey = new Buffer(`apikey:${config.TONE_ANALYZER_KEY}`).toString('base64');

    return fetch(config.TONE_ANALYZER_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Basic ${encodedKey}`
      },
      body: JSON.stringify({text: entry})
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },

  postSelfieToAzure(url) {

    return fetch(config.FACE_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Ocp-Apim-Subscription-Key': config.FACE_KEY
      },
      body: JSON.stringify({ url })
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },

  postEntry(newEntry) {

    return fetch(`${config.API_ENDPOINT}/entry`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newEntry)
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getUserEntries() {
    return fetch(`${config.API_ENDPOINT}/entry/list`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getEntryById(id) {
    return fetch(`${config.API_ENDPOINT}/entry/id/${id}`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default EntryService;