// Inspired by: https://fribly.com/2015/05/20/tab-menu-overlay/

var Stack = (function() {

  var toggler = $('.views-toggle');
  var stack = $('li.card-stack__item');
  var toggled = false;
  var footer = $('footer');

  var transform = function(el, value) {
    el.css('transform', value);
    el.css('-webkit-transform', value);
    el.css('-ms-transform', value);
  };
  var transition = function(el, value) {
    el.css('transition', value);
    el.css('-webkit-transition', value);
    el.css('-ms-transition', value);
  };

  var moveContent = function() {
    if (!toggled) {
      toggled = true;
    } else {
      toggled = false;
    }

    moveStack(toggled);

    return false;
  };

  var moveStack = function(a) {
    var transY, scale;

    if (a) {
      stack.css({
        'opacity': '1',
        'box-shadow': 'rgba(0, 0, 0, 0.4) 0px 4px 60px',
        'cursor': 'pointer'
      });

      stack.each(function(index) {
        transY = index * 10;
        scale = 0.5 + index / 25;

        transform($(this), 'translate3d(0,' + transY + 'vh, 0) scale(' + scale + ')');
      });

      toggler.addClass('views-toggle--hidden');
      footer.removeClass('hide-footer');

    } else {
      transform(stack, 'translate3d(0,0,0) scale(1)');
    }
  };

  var switchStack = function() {
    var selected = $(this);
    var others = selected.siblings('li');

    if (toggled) {
      transition(others, 'transform 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06)');
      transform(others, 'translate3d(0, 100%, 0) scale(1)');
      transform(selected, 'translate3d(0,0,0) scale(1)');
      stack.css({
        'box-shadow': 'rgba(0, 0, 0, 0.4) 0px 4px 60px',
        'cursor': 'default'
      });
      toggled = false;


      selected.on('transitionend webkitTransitionend', function() {
        toggler.removeClass('views-toggle--hidden');
        footer.addClass('hide-footer');


        others.css({
          'opacity': '0'
        });
        transform(others, 'translate3d(0, 100%, 0) scale(0)');
        transition(others, 'transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)');
        selected.off('transitionend webkitTransitionend');
      });
    }
  };

  var setup = function() {
    toggled = true;
    moveStack(toggled);
  };

  var init = function() {
    $(document).on('ready', setup);
    toggler.on('click touchstart', moveContent);
    stack.on('click touchstart', switchStack);
  };

  return {
    init: init
  };

}());

Stack.init();
