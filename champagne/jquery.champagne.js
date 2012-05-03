// Champagne.js, a jQuery plugin to randomize the display of objects in a grid
// by Sarah Canieso for Fresh Tilled Soil, http://freshtilledsoil.com
//
// Version 0.0.5
// Full source at https://github.com/freshtilledsoil/champagne
// Copyright (c) 2012 Fresh Tilled Soil http://freshtilledsoil.com

// MIT License, http://www.opensource.org/licenses/mit-license.php
(function($) {
    $.fn.champagne = function(options) {
        var settings = $.extend({
            beginning_delay: 300,
            delay_between: 50,
            duration: 500,
            onFinish: function() {}
        }, options);

        return this.each(function() {
            // Wrap each li's contents in a <div class="hidden"></div>
            $(this).children().each(function() {
                $(this).contents().wrap("<div class='hidden'></div>");
            });

            var array = $(this).children().children("div.hidden");

            // Begin animation
            setTimeout(function() {
                showRandom();
            }, settings.beginning_delay);

            function showRandom() {
                var random = Math.floor(Math.random() * array.length);

                // Fade in random element
                $(array[random]).fadeIn(settings.duration);
                array.splice(random, 1);

                if (array.length > 0) {
                    // Continue animating elements until array is empty
                    setTimeout(function() {
                        showRandom();
                    }, settings.delay_between);
                } else {
                    // onFinish callback
                    setTimeout(function() {
                        settings.onFinish.call(this);
                    }, settings.duration);
                }
            }
        });
    };
})(jQuery);