import config from '../config'

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
  }
}

export default EntryService;