// Champagne.js, a jQuery plugin to randomize the display of objects in a grid
// by Sarah Canieso for Fresh Tilled Soil, http://freshtilledsoil.com
//
// Version 0.1.0
// Full source at https://github.com/freshtilledsoil/champagne
// Copyright (c) 2013 Fresh Tilled Soil http://freshtilledsoil.com

// MIT License, http://www.opensource.org/licenses/mit-license.php
(function($) {
  $.fn.champagne = function(options) {
    var settings = $.extend({
      beginningDelay: 300,
      childrenSelector: undefined,
      delayBetween: 50,
      duration: 500,
      effect: 'fadeIn',
      onFinish: function() {}
    }, options),

    array,
    isValidEffect,
    showRandom;

    isValidEffect = function(effect) {
      var validEffects = ['fadeIn', 'slideDown', 'addClass'];
      return $.inArray(effect, validEffects) > -1;
    };

    showRandom = function (array) {
      var random = Math.floor(Math.random() * array.length);
      // Show random element
      if (settings.effect !== 'addClass' && isValidEffect(settings.effect)) {
        $(array[random])[settings.effect](settings.duration);
      } else {
        $(array[random]).addClass('visible');
      }

      array.splice(random, 1);
      if (array.length > 0) {
        // Continue animating elements until array is empty
        setTimeout(function() {
          showRandom(array);
        }, settings.delayBetween);
      } else {
        // onFinish callback
        setTimeout(function() {
          settings.onFinish.call(this);
        }, settings.duration);
      }
    };

    return this.each(function() {
      var $self = $(this);

      // Wrap each li's contents in a <div class="hidden"></div>
      if (settings.childrenSelector === undefined) {
        $self.children().contents().wrap('<div class="hidden"></div>');
      } else {
        $self.find(settings.childrenSelector).wrap('<div class="hidden"></div>');
      }

      array = $self.children().children('div.hidden');
      // Begin animation
      setTimeout(function() {
        showRandom(array);
      }, settings.beginningDelay);
    });
  };
})(jQuery);
