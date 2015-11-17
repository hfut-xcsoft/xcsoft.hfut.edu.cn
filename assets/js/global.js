$(function () {
  $('#left-nav-button').click(function () {
    var nav = $('#left-nav');
    var dark = $('#dark');
    if (nav.hasClass('show')) {
      nav.removeClass('show');
      dark.removeClass('show');
    } else {
      nav.addClass('show');
      dark.addClass('show');
    }
  })

  $('#dark').click(function () {
    $('#left-nav').removeClass('show');
    $('#dark').removeClass('show');
  })
});