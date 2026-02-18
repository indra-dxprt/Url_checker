export function throttle(fn, waitMs) {
  let lastTime = 0;
  let timerId = null;
  let lastArgs = null;

  function throttled(...args) {
    const now = Date.now();
    const remaining = waitMs - (now - lastTime);
    lastArgs = args;

    if (remaining <= 0) {
      lastTime = now;
      fn(...args);
      return;
    }

    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = null;
        lastTime = Date.now();
        if (lastArgs) fn(...lastArgs);
      }, remaining);
    }
  }

  throttled.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    lastArgs = null;
  };

  return throttled;
}
