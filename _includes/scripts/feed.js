$(document).ready(function() {

  var JSON2HTML = function(storskaerm) {

    // var monthNames = ['januar','februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

    var news = '<div class="crown fr"></div>\n';

    for (i = 0; i < storskaerm.length; i++) {
      var item = storskaerm[i]['node'];
      var pubDate     = item['date'];
      var title       = item['title'];
      var description = item['text'];
      var link        = item['link'];
      var nid        = item['nid'];
      var floatDirection = 'fl cl';

      if (i % 2 === 1){ floatDirection = 'fr'; }

      news += '<div class="news-item faq-item node_'+nid+' '+floatDirection+'">\n';
      news += '  <div class="pub-date">'+pubDate+'</div>';
      news += '  <h3>'+title+'</h3>\n';
      news += '  <p>'+description+'</p>\n';
      news += '</div>\n\n';
    }

    $('#news-bg').show();
    $('#news.faq').html(news);
    $('#news.faq .news-item a').attr('href', 'https://spillemyndigheden.dk'+$('#news.faq .news-item a').attr('href')) 

  }

  newsFeedAnimation();

  setInterval(newsFeedAnimation, 10 * 60 * 1000);

  var lastInterval;
  function newsFeedAnimation() {
    clearInterval(lastInterval);
    crossDomainAjax('https://spillemyndigheden.dk/json/storskaerm', function (data) {
      // success logic
      JSON2HTML(data['storskaerm']);

      var newsItem = $('#news div.news-item');
      $(newsItem[0]).addClass('active');

      lastInterval = setInterval(function() {
        $('#news div.news-item.active')
          .removeClass('active')
            .next()
            .addClass('active');

        if(!$('#news .news-item.active').length > 0) {
          $(newsItem[0]).addClass('active');
        }
      }, 10127);

    });
  }

function crossDomainAjax (url, successCallback) {

    // IE8 & 9 only Cross domain JSON GET request
    if ('XDomainRequest' in window && window.XDomainRequest !== null) {

      var xdr = new XDomainRequest(); // Use Microsoft XDR
      xdr.open('get', url);
      xdr.onload = function () {
        var dom  = new ActiveXObject('Microsoft.XMLDOM'),
            JSON = $.parseJSON(xdr.responseText);

        dom.async = false;

        if (JSON == null || typeof (JSON) == 'undefined') {
          JSON = $.parseJSON(data.firstChild.textContent);
        }

        successCallback(JSON); // internal function
      };

      xdr.onerror = function() {
        _result = false;  
      };

      xdr.send();
    } 

    // IE7 and lower can't do cross domain
    else if (navigator.userAgent.indexOf('MSIE') != -1 &&
             parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
      return false;
    }    

    // Do normal jQuery AJAX for everything else          
    else {
      $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        type: 'GET',
        async: false, // must be set to false
        success: function (data, success) {
          successCallback(data);
        }
      });
    }
  }

});

