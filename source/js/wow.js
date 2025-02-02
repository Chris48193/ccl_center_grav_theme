import 'wowjs/css/libs/animate.css'

$(function() {

  const WOW = require('wowjs');

  window.wow = new WOW.WOW({
      live: false
  });

  window.wow.init();

})