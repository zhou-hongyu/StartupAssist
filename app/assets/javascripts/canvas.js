$(document).ready(function(){
  StartupAssist.showAllCanvas();
});

var StartupAssist = StartupAssist || {};

StartupAssist.showAllCanvas = function(){
  var $content_div = $("#canvas"),
      $all_canvas_div = $('<div class="all-canvas">'),
      $create_canva_div = $('<div class="new-canvas">'),
      $new_canva_button = $('<button class="btn btn-primary btn-lg">Create New Canva</button>');

  $content_div.text("");
  $create_canva_div.append($new_canva_button);
  $content_div.append($all_canvas_div, $create_canva_div);
  $new_canva_button.click(function(event){
    StartupAssist.newCanva();
    StartupAssist.saveCanva();
  });
};
