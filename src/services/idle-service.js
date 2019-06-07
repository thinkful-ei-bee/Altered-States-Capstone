
let _timeoutId
let _idleCallback = null
let _notIdleEvents = [
  'mousedown',
  'mousemove',
  'keypress',
  'scroll',
  'touchstart',
]
const _THIRTY_MINUTES_IN_MS = 30 * 60 * 1000

const IdleService = {
  setIdleCallback(idleCallback) {
    _idleCallback = idleCallback
  },
  resetIdleTimer(ev) {
    clearTimeout(_timeoutId)
    _timeoutId = setTimeout(_idleCallback, _THIRTY_MINUTES_IN_MS)
  },
  regiserIdleTimerResets() {
    _notIdleEvents.forEach(event =>
      document.addEventListener(
        event,
        IdleService.resetIdleTimer,
        true,
      )
    )
  },
  unRegisterIdleResets() {
    clearTimeout(_timeoutId)
    _notIdleEvents.forEach(event =>
      document.removeEventListener(
        event,
        IdleService.resetIdleTimer,
        true,
      )
    )
  },
}

export default IdleService
