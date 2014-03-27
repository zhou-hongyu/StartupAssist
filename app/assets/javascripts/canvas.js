$(document).ready(function(){
  $.ajax({
    async: false,
    url: '/canvas',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(response) {
    StartupAssist.showAllCanvas(response);

  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
});

var StartupAssist = StartupAssist || {};

StartupAssist.showAllCanvas = function(callback){
  var $content_div = $("#canvas"),
      $all_canvas_div = $('<div class="all-canvas">'),
      $create_canva_div = $('<div class="new-canvas">'),
      $new_canva_button = $('<button class="btn btn-primary btn-lg">Create New Canva</button>');
  $content_div.text("");

  for(i = 0; i < callback.length; i++){
    canva_button_id = 'id="canva-' + callback[i].id + '"';
    $canva_show_button = $('<button class ="btn btn-primary btn-lg show-canva"' + canva_button_id + '>Start up</button>');
    $all_canvas_div.append($canva_show_button);
  }

  $create_canva_div.append($new_canva_button);
  $content_div.append($all_canvas_div, $create_canva_div);
  $new_canva_button.click(function(event){
    StartupAssist.saveCanva();
  });
  var $show_the_canva_button = $('.show-canva');
  $show_the_canva_button.click(function(event){
    StartupAssist.getCanva(parseInt(event.target.id.split('-')[1]));
  });
};
