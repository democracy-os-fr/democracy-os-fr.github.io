/* jshint devel:true, jquery:true */
/*! jQuery shuffle plugin forked from : https://css-tricks.com/snippets/jquery/shuffle-dom-elements/  */
(function($){

  $.fn.shuffle = function() {

      var allElems = this.get(),
          getRandom = function(max) {
              return Math.floor(Math.random() * max);
          },
          shuffled = $.map(allElems, function(){
              var random = getRandom(allElems.length),
                  randEl = $(allElems[random]).clone(true)[0];
              allElems.splice(random, 1);
              return randEl;
         });

      this.each(function(i){
          $(this).replaceWith($(shuffled[i]));
      });

      return $(shuffled);

  };

})(jQuery);

$(document).ready(function(){

  console.log('document ready') ;

  $('.team li').shuffle() ;

	//$('.text-slab').slabText() ;
	//$('.text-balance').balanceText() ;

});
