export function throttle(fn, waitMs) {
    let lastTime = 0;
    let timerId = null;
    let lastArgs = null;
  
    return function (...args) {
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
          fn(...lastArgs);
        }, remaining);
      }
    };
  }
  