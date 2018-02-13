;(function($) {
  "use strict"

  $.fn.bildtext = function (options) {
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
	  var bildtext = $(this).attr('alt');
	  //if (settings.attr(
      if (settings.verticalAlign == 'center') {
        // hits => HTMLNodeElement von EventListener
        $(this).css({'transform': 'scale(-1,1)'});
      };
      if (settings.verticalAlign == 'top') {
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
