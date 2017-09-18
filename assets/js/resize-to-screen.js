(function() {
  var resizer = function() {
    var width   = $(window).width();
    var height  = $(window).height();
    if (width < 1080 || height < 1920) {
      var aspect = 1080/1920;
      if (height/width > aspect) {
        // too high ... zoom to width
        $('body').css('zoom',width/1920);
      } else {
        // too wide ... set to height
        $('body').css('zoom',height/1080);
      }
    }
  }
  setTimeout(resizer,300);
  $(window).bind('resize',resizer);

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
})();
