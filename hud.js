var overlay = false;
var currentToolTimer;
var theHUD = document.getElementByID('overlay');

function toolIndicatorTimer() {
  currentToolTimer = (
    setTimeout(
      function() {
        $('.overlay').removeClass('visible');
        $('.overlay').addClass('hidden');
      },800)
  );
}
function stopToolIndicatorTimer() {
  clearTimeout(currentToolTimer);
}
  
// Call the tool indicator
function toolIndicator(obj) {
  theHUD.setAttribute("class", 'visible '+obj.id);
/*
  $(".overlay span.icomatic").html(currentTool);
  $('.overlay').removeClass('hidden');
  $('.overlay').addClass('visible');
*/
  toolIndicatorTimer();
}