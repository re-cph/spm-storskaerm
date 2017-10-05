$(document).ready(function() {

// Make the clock tick...!
setInterval(display_ct, 1000);

// Clock - and also: Get/Update data
function display_ct() {
  var nameOfDay = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag','Søndag']
  var nameOfMonth = ['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December']

  var d = new Date();
  var seconds = prependZero(d.getSeconds());
  var minutes = prependZero(d.getMinutes());
  var hours = d.getHours();
  var date = d.getDate();
  var month = nameOfMonth[d.getMonth()];
  var day = nameOfDay[parseInt(d.getDay())];

  // reload page every hour
  if (parseInt(minutes) === 59 && parseInt(seconds) === 59) {
    document.location = "/";
  }

  $('.day').text(day + ' d. ');
  // $('.date-time').text(hours + '.' + minutes + '.' + seconds);
  $('.date-month').text(date + '. ' + month);
  $('.date-time').text(hours + '.' + minutes);

  function prependZero(number) {
    var string = '';
    number < 10 ? string = '0' + number : string = '' + number;
    return string;
  }
}

});

