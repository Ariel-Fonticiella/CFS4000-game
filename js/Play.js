$(document).ready(function ($) {
    $(window).load(function () {
        setTimeout(function(){
            $('#preloader').fadeOut('slow', function () {
            });
        },50000);

    });
});

var playNow = function() {
  var audio = new Audio('./Audio/DebbieDebLookoutCut.mp3', 'Audio/DebbieDebLookoutCut.ogg');
  audio.play();
};

setTimeout(function() {
  playNow();
}, 2100);
