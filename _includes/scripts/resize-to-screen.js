(function() {
  var resizer = function() {
    var width   = $(window).width();
    var height  = $(window).height();
    if (width < 1080 || height < 1920) {
      console.log('screen is too small');

    }
  }
  
  $(window).bind('resize',resizer);
})();
