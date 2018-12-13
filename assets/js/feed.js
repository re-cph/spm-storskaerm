$(document).ready(function() {

  var JSON2HTML = function(obj) {

    // var monthNames = ['januar','februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

    var news = '<div class="crown fr"></div>\n';

    for (i = 0; i < obj.length; i++) {
      var item = obj[i];

      var pubDate     = item['date'];
      var title       = item['title'];
      var description = item['text'];
      var link        = item['link'];
      var nid         = item['nid'];

      var floatDirection = 'fl cl';

      if (i % 2 === 1) { floatDirection = 'fr'; }

      news += '<div class="news-item faq-item node_'+nid+' '+floatDirection+'">\n';
      news += '  <div class="pub-date">'+pubDate+'</div>\n';
      news += '  <h3>'+title+'</h3>\n';
      news += '  <p>'+description+'</p>\n';
      news += '</div>\n\n';
    }

    $('#news-bg').show();
    $('#news.faq').html(news);
    $('#news.faq .news-item a').each(function(index) {
      $(this).attr('href', $(this).attr('href')).attr('target', '_blank');
    });

  }

  var JSON2HTML_WELCOME = function(obj) {
    var welcome = '';
    var showWelcome = false;

    for (i = 0; i < obj.length; i++) {
      var item = obj[i];

      var nid         = item['nid'];
      var image       = 'https://www.spillemyndigheden.dk' + item['image'];
      var name        = item['name'];
      var department  = item['department'];
      //var start       = item['from'];
      //var end         = item['to'];
      var all_date    = item['date'];
      var today = new Date();
      today.setHours(0,0,0,0); // Set time today to midnight.

      var splitted = all_date.split(' - ');
      start = new Date(splitted[0]);
      end = new Date(splitted[1]);

      if (splitted[0] ===splitted[1]) {
        // End date hasn't been set, so set end date to three weeks after start.
        end.setDate(end.getDate() + 27);
      }

      if (today <= end) {

        showWelcome = true;
        welcome += '<div class="card node_' + nid + '">\n';
        welcome += '  <div class="image" style="background-image: url(' + image + ');"></div>\n';
        welcome += '  <h2>Velkommen</h2>\n';
        welcome += '  <div class="text">' + name + '</div>\n';
        welcome += '  <div class="line"> &mdash; </div>\n';
        welcome += '  <div class="text">' + department + '</div>\n';
        welcome += '</div>\n';
      }
    }

    if (showWelcome === true) {
      $('#welcome').show();
      $('body').addClass('welcome-active');
      $('#welcome').append($(welcome)).removeClass('hidden');
    }
  }

  var lastInterval;
  newsFeedAnimation();
  setInterval(newsFeedAnimation, 10 * 60 * 1000);

  function newsFeedAnimation() {
    clearInterval(lastInterval);
    crossDomainAjax('https://www.spillemyndigheden.dk/json/storskaerm?_format=json', function (data) {
      // success logic
      JSON2HTML(data);

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

  var lastEmployeeInterval;
  employeeAnimation();

  function employeeAnimation() {
      crossDomainAjax('https://www.spillemyndigheden.dk/json/storskaerm/medarbejder?_format=json', function (data) {
      // success logic
      JSON2HTML_WELCOME(data);

      var newsItem = $('#welcome div.card');
      $(newsItem[0]).addClass('active');

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

