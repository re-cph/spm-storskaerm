(function() {
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    var userLanguage = getCookie("userLanguage");
    // console.log(userLanguage);
    
    if (userLanguage != "") {
      if (userLanguage === 'en') {
        redirectEN();
      } else {
        redirectDA();
      }
    } else {
      var language = navigator.language || navigator.browserLanguage; //for IE
      // console.log(language);

      if (language.indexOf('en') > -1) {
        setCookie('userLanguage', 'en', 500)
        redirectEN();
      } else {
        setCookie('userLanguage', 'da', 500)
        redirectDA()
      }
    }
  }

  function redirectEN() {
    if (document.documentElement.lang !== 'en') {
      document.location.href = '/spm-storskaerm/en';
    }
  }

  function redirectDA() {
    if (document.documentElement.lang !== 'da') {
      document.location.href = '/spm-storskaerm/';
    }
  }

  checkCookie();
})();
