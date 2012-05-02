// Champagne.js, a jQuery plugin to randomize the display of objects in a grid
// by Sarah Canieso for Fresh Tilled Soil, http://freshtilledsoil.com
// 
// Version 0.0.5
// Full source at https://github.com/freshtilledsoil/champagne
// Copyright (c) 2012 Fresh Tilled Soil http://freshtilledsoil.com

// MIT License, http://www.opensource.org/licenses/mit-license.php
(function($) {
    $.fn.champagne = function(options) {

        var defaults = {
            beginning_delay: 300,
            delay_between: 50,
            duration: 500,
            onFinish: function() {}
        };
        options = $.extend(defaults, options);

        return this.each(function() {
            var $container = $(this);

            $container.children().each(function() {
                $(this).contents().wrap("<div class='hidden'></div>");
            });
            
            var array = $container.children().children("div.hidden");

            setTimeout(function(){
                showRandom($container);
            }, options.beginning_delay);

            function showRandom($container) {
                var random = Math.floor(Math.random() * array.length);

                $(array[random]).fadeIn(options.duration);
                array.splice(random, 1);

                if (array.length > 0) {
                    setTimeout(function() {
                        showRandom($container);
                    }, options.delay_between);
                } else {
                    setTimeout(function() {
                        options.onFinish.call(this);
                    }, options.duration);
                }
            }
        });
    };
})(jQuery);