// Hexagons
(function() {
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
      var hexagonActive = $('.hexagon.active')
      hexagonActive.find('.card.active')
        .removeClass('active')
        .next()
          .addClass('active');

        // Set first card active if no active cards left
        if (!hexagonActive.find('.card.active').length > 0) {
          hexagonActive.find('.card:first-of-type').addClass('active');
        }

        // Set percentage if games card is active
        if (hexagonActive.hasClass('dk-games')) {
          var card = hexagonActive.find('.card.active');
          var percentage = parseInt(card.attr('data-percent'));
          var degree = 'rotate(' + ((percentage * 3.6) + 90) + 'deg)';
          card.find('.slice.one')
            .css({
              'transform': 'rotate(90)',
              'transition': 'none',
            });
          setTimeout(function() {
            card.find('.slice.one')
              .css({
                'transform': degree,
                'transition': 'transform .5s ease-in',
              });
          },10);
        }

      $('.hexagon.rotate').removeClass('rotate');

    },250);

  },5983);
})();
