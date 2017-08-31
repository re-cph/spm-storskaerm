$('.hexagon .card:first-of-type').addClass('active');
$('.hexagon:last-of-type').addClass('active');

// Every 15 seconds go through one hexagon and flip it.
setInterval(function() {
  $('.hexagon.active')
    .removeClass('active')
      .next()
      .addClass('active');

  if(!$('.hexagon.active').length > 0) {
    $('.hexagon:first-of-type').addClass('active');
  }

  $('.hexagon.active').addClass('rotate');

  setTimeout(function() {
    $('.hexagon.active .card.active')
      .removeClass('active')
      .next()
        .addClass('active');

      if (!$('.hexagon.active .card.active').length > 0) {
        $('.hexagon.active .card:first-of-type').addClass('active');
      }

    $('.hexagon.rotate').removeClass('rotate');

  },250);

},15000);
