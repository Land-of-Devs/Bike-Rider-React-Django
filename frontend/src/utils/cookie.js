export const getCookie = name => {
  return (document.cookie.split(';')
      .map(c => c.trim().split('=').map(v => decodeURIComponent(v)))
      .find(c => c[0] === name) || [])[1];
};

export const getCookieJson = name => {
  try {
    return JSON.parse(getCookie(name));
  } catch (e) {
    return null;
  }
};

export const watchCookies = (cb) => {
  var interval = null;
  try {
    if ('cookieStore' in window) {
      window.cookieStore.addEventListener('change', cb);
    } else {
      var checkCookie = function () {
        var lastCookie = document.cookie;
        return function () {
          var currentCookie = document.cookie;

          if (currentCookie != lastCookie) {
            lastCookie = currentCookie;
            cb();
          }
        };
      }();

      interval = window.setInterval(checkCookie, 250);
    }
  } catch (e) {
    console.error(e);
  }

  return () => {
    clearInterval(interval);
    if ('cookieStore' in window) {
      window.cookieStore.removeEventListener('change', cb);
    }
  };
};
