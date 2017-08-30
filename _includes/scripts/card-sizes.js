(function() {
  var primeCards = function() {

    // Make invisible and reset heights:
    $('.card-col > p').css('opacity',0).height('');

    // Save new heights in each element
    $('.card-col > p').each(function() {
      $(this)
        .attr('data-height',$(this).height())
        .height('1.5em')
        .css('opacity',1);
    });
  }

  var setAspect = function() {
    var horizontalAspect = parseFloat($('.card-col-wrapper').attr('data-horizontal-aspect'));
    var verticalAspect = parseFloat($('.card-col-wrapper').attr('data-vertical-aspect'));
    var aspect = verticalAspect / horizontalAspect;

    $('.card-col').height($('.card-col').width() * aspect);
  }

  $('.card-col').hover(
    function() {
      var paragraph = $(this).find('p');
      var height = parseInt(paragraph.attr('data-height'));
      paragraph.height(height);
    },
    function() {
      var paragraph = $(this).find('p');
      paragraph.height('1.5em');
    }
  );

  var resizeCards = function() {
    primeCards();
    setAspect();
  }

  resizeCards();
  $(window).resize(resizeCards);
})();
