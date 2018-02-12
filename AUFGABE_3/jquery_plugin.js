;(function($) {
  "use strict"

  $.fn.flip = function (options) {
    var settings = $.extend({
      // z.b. position=center
      dir: 'horizontal'
    }, options);

  // nehme selektierte werte, mit return ist es transparent = verketten ist möglichkeit
  // z.b. $().css().html()
  // im folgenden ist this immer etwas anderes

  // this => jquery objekt von dem flip ausgeführt wird
  return this.each(function () {
    // this => HTMLNode Element, Schleife each
    $(this).on('mouseenter', function () {
      if (settings.dir == 'horizontal') {
        // hits => HTMLNodeElement von EventListener
        $(this).css({'transform': 'scale(-1,1)'});
      };
      if (settings.dir == 'vertical') {
        // hits => HTMLNodeElement von EventListener
        $(this).css({'transform': 'scale(1,-1)'});
      };
    });
    $(this).on('mouseleave', function () {
      $(this).css({'transform': 'scale(1,1)'});
    });
  })

  }
})(jQuery);
